import WidgetHelpers = require("TFS/Dashboards/WidgetHelpers");

var getData = (context) => {
    return {
        load: function (widgetSettings: any) {
            //
            return WidgetHelpers.WidgetStatusHelper.Success();
        },
        reload: function (widgetSettings) {
            //
            return WidgetHelpers.WidgetStatusHelper.Success();
        }
    }
}

let extensionContext = VSS.getExtensionContext();
// this format is needed for VSTS and VS2017
VSS.register(`${extensionContext.publisherId}.${extensionContext.extensionId}.AverageVelocityWidget`, getData);
// this format is needed for VS2015
VSS.register("AverageVelocityWidget", getData);