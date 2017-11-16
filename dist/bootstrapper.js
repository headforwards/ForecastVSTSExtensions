define(["require", "exports", "TFS/Dashboards/WidgetHelpers"], function (require, exports, WidgetHelpers) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getData = function (context) {
        return {
            load: function (widgetSettings) {
                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            reload: function (widgetSettings) {
                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        };
    };
    var extensionContext = VSS.getExtensionContext();
    VSS.register(extensionContext.publisherId + "." + extensionContext.extensionId + ".AverageVelocityWidget", getData);
    VSS.register("AverageVelocityWidget", getData);
});
//# sourceMappingURL=bootstrapper.js.map