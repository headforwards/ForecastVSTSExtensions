import Q = require("q");
import VSTS = require("./vsts-api");
import WIT_Contracts = require("TFS/WorkItemTracking/Contracts");
import TfsConfig = require("./config");
import MathHelper = require("./math");

class Main
{
    public config: TfsConfig;

    public constructor (widgetSettings: any) {
        this.config = this.loadWidgetSettings(widgetSettings);
    }

    private loadWidgetSettings(widgetSettings: any): TfsConfig {
        console.log(widgetSettings);

        var settings = JSON.parse(widgetSettings.customSettings.data);

        if (settings) {
            return new TfsConfig(settings.unstartedWorkFields,
                settings.committedWorkFields,
                settings.completedWorkFields,
                settings.closedWorkFields,
                settings.effortField,
                settings.stateField
                , "System.Id,System.Title,System.State,System.BoardColumn,Microsoft.VSTS.Scheduling.Effort,Microsoft.VSTS.Scheduling.StoryPoints,System.WorkItemType");
        } else {
            return new TfsConfig("approved,ready for review,1. new,2. ready for review,3. approved"
                , "committed,4. committed"
                , "deployed to staging,ready for release,ready for staging,ready for environments team,5. ready for environments team,6. deployed to staging,ready for uat"
                , "done,released/done,deployed to production,7. released/done"
                , "Microsoft.VSTS.Scheduling.Effort"
                , "System.BoardColumn"
                , "System.Id,System.Title,System.State,System.BoardColumn,Microsoft.VSTS.Scheduling.Effort,Microsoft.VSTS.Scheduling.StoryPoints,System.WorkItemType");
        }
    }

    public getData(): Q.Promise<{}> {
        
        var deferred = Q.defer();

        VSTS.getAllWorkItemIds(this.config.TeamContext().projectId).then((workItemQueryResult: WIT_Contracts.WorkItemQueryResult) => {
            
            // get the ids from the query result and then get the details
            var workItemIds = this.extractIdsFromQueryResult(workItemQueryResult);

            VSTS.getWorkItemDetails(workItemIds, this.config.Fields, new Date()).then((workItems: WIT_Contracts.WorkItem[]) => {
                
                var efforts: number[] = workItems.map((wi: WIT_Contracts.WorkItem) => {
                    if (wi.fields[this.config.EffortField] !== undefined) {
                        // there is an effort estimate so return the effort
                        return wi.fields[this.config.EffortField];
                    }
                }).filter((item) => {
                    return item != undefined;
                });
                
                deferred.resolve({
                    "average": MathHelper.average(efforts),
                    "count": efforts.length
                });
            });
        });

        return deferred.promise;
    }

    /**
     * Extracts the id field from a work item query result and returns it as a number[]
     * @param queryResult the results to process
     */
    private extractIdsFromQueryResult(queryResult: WIT_Contracts.WorkItemQueryResult): number[] {
        return queryResult.workItems.map((wi) => {
            return wi.id;
        });
    };;
}
export = Main;