import WidgetHelpers = require("TFS/Dashboards/WidgetHelpers");
import Main = require("./main");
import AverageVelocityWidget = require("./average-velocity-widget");

var getData = (context) => {
    return {
        load: function (widgetSettings: any) {
            WidgetHelpers.IncludeWidgetStyles();
            var m = new Main(widgetSettings);
            m.getData().then((data: any) => {
                console.log(data);
                
                // update UI
                AverageVelocityWidget.AverageVelocity.html(data.average.toFixed(1));
                AverageVelocityWidget.WorkItemCount.html(data.count.toFixed(0));
            });
            
            return WidgetHelpers.WidgetStatusHelper.Success();
        },
        reload: function (widgetSettings) {
            WidgetHelpers.IncludeWidgetStyles();
            var m = new Main(widgetSettings);
            m.getData().then((data: any) => {
                console.log(data);
                
                // update UI
                AverageVelocityWidget.AverageVelocity.html(data.average.toFixed(1));
                AverageVelocityWidget.WorkItemCount.html(data.count.toFixed(0));
            });
            
            return WidgetHelpers.WidgetStatusHelper.Success();
        }
    }
}

let extensionContext = VSS.getExtensionContext();
// this format is needed for VSTS and VS2017
VSS.register(`${extensionContext.publisherId}.${extensionContext.extensionId}.AverageVelocityWidget`, getData);
// this format is needed for VS2015
VSS.register("AverageVelocityWidget", getData);