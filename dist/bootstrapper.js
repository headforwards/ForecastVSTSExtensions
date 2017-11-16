define(["require", "exports", "TFS/Dashboards/WidgetHelpers", "./main", "./average-velocity-widget"], function (require, exports, WidgetHelpers, Main, AverageVelocityWidget) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getData = function (context) {
        return {
            load: function (widgetSettings) {
                WidgetHelpers.IncludeWidgetStyles();
                var m = new Main(widgetSettings);
                m.getData().then(function (data) {
                    console.log(data);
                    AverageVelocityWidget.AverageVelocity.html(data.average.toFixed(1));
                    AverageVelocityWidget.WorkItemCount.html(data.count.toFixed(0));
                });
                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            reload: function (widgetSettings) {
                WidgetHelpers.IncludeWidgetStyles();
                var m = new Main(widgetSettings);
                m.getData().then(function (data) {
                    console.log(data);
                    AverageVelocityWidget.AverageVelocity.html(data.average.toFixed(1));
                    AverageVelocityWidget.WorkItemCount.html(data.count.toFixed(0));
                });
                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        };
    };
    var extensionContext = VSS.getExtensionContext();
    VSS.register(extensionContext.publisherId + "." + extensionContext.extensionId + ".AverageVelocityWidget", getData);
    VSS.register("AverageVelocityWidget", getData);
});
//# sourceMappingURL=bootstrapper.js.map