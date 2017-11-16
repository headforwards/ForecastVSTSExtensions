import Work_Contracts = require("TFS/Work/Contracts");
import WIT_Contracts = require("TFS/WorkItemTracking/Contracts");
import WIT_Client = require("TFS/WorkItemTracking/RestClient");
import Core_Contracts = require("TFS/Core/Contracts");

class VSTSApi {

    /**
     * Returns a promise that retrieves all the work item ids in the project
     */
    public static getAllWorkItemIds(projectId: string): IPromise<WIT_Contracts.WorkItemQueryResult> {

        var query: WIT_Contracts.Wiql = { query: "" };
        query.query = "SELECT [System.Id] From WorkItems WHERE ([System.WorkItemType] = 'User Story' OR [System.WorkItemType] = 'Product Backlog Item' OR [System.WorkItemType] = 'Defect' OR [System.WorkItemType] = 'Bug')";

        // Get a WIT client to make REST calls to VSTS
        return WIT_Client.getClient().queryByWiql(query, projectId);
    };

    /**
     * Returns a promise that retrieves the details of the specified work items
     */
    public static getWorkItemDetails(ids: number[], returnFields: string[], date?: Date): IPromise<WIT_Contracts.WorkItem[]> {
        if (ids.length === 0) {
            return;
        }
        var client = WIT_Client.getClient();
        var expand = WIT_Contracts.WorkItemExpand.None;
        var errorPolicy = WIT_Contracts.WorkItemErrorPolicy.Omit;
        return client.getWorkItems(ids, returnFields, date, expand, errorPolicy);
    };

    /**
     * Returns the context that the widget is running under
     */
    public static TeamContext(): Core_Contracts.TeamContext {
        var ctx = VSS.getWebContext();
        return {
            projectId: ctx.project.id,
            teamId: ctx.team.id,
            project: ctx.project.name,
            team: ctx.team.name
        };
    };

}
export = VSTSApi;