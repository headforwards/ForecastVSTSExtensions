define(["require", "exports", "q", "./vsts-api", "./config", "./math"], function (require, exports, Q, VSTS, TfsConfig, MathHelper) {
    "use strict";
    var Main = (function () {
        function Main(widgetSettings) {
            this.config = this.loadWidgetSettings(widgetSettings);
        }
        Main.prototype.loadWidgetSettings = function (widgetSettings) {
            console.log(widgetSettings);
            var settings = JSON.parse(widgetSettings.customSettings.data);
            if (settings) {
                return new TfsConfig(settings.unstartedWorkFields, settings.committedWorkFields, settings.completedWorkFields, settings.closedWorkFields, settings.effortField, settings.stateField, "System.Id,System.Title,System.State,System.BoardColumn,Microsoft.VSTS.Scheduling.Effort,Microsoft.VSTS.Scheduling.StoryPoints,System.WorkItemType");
            }
            else {
                return new TfsConfig("approved,ready for review,1. new,2. ready for review,3. approved", "committed,4. committed", "deployed to staging,ready for release,ready for staging,ready for environments team,5. ready for environments team,6. deployed to staging,ready for uat", "done,released/done,deployed to production,7. released/done", "Microsoft.VSTS.Scheduling.Effort", "System.BoardColumn", "System.Id,System.Title,System.State,System.BoardColumn,Microsoft.VSTS.Scheduling.Effort,Microsoft.VSTS.Scheduling.StoryPoints,System.WorkItemType");
            }
        };
        Main.prototype.getData = function () {
            var _this = this;
            var deferred = Q.defer();
            VSTS.getAllWorkItemIds(this.config.TeamContext().projectId).then(function (workItemQueryResult) {
                var workItemIds = _this.extractIdsFromQueryResult(workItemQueryResult);
                VSTS.getWorkItemDetails(workItemIds, _this.config.Fields, new Date()).then(function (workItems) {
                    var efforts = workItems.map(function (wi) {
                        if (wi.fields[_this.config.EffortField] !== undefined) {
                            return wi.fields[_this.config.EffortField];
                        }
                    }).filter(function (item) {
                        return item != undefined;
                    });
                    deferred.resolve({
                        "average": MathHelper.average(efforts),
                        "count": efforts.length
                    });
                });
            });
            return deferred.promise;
        };
        Main.prototype.extractIdsFromQueryResult = function (queryResult) {
            return queryResult.workItems.map(function (wi) {
                return wi.id;
            });
        };
        ;
        ;
        return Main;
    }());
    return Main;
});
//# sourceMappingURL=main.js.map