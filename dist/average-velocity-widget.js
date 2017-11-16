define(["require", "exports"], function (require, exports) {
    "use strict";
    var AverageVelocityWidget = (function () {
        function AverageVelocityWidget() {
        }
        AverageVelocityWidget.Title = $("#widget-title");
        AverageVelocityWidget.AverageVelocity = $("#average-velocity");
        AverageVelocityWidget.WorkItemCount = $("#work-item-count");
        return AverageVelocityWidget;
    }());
    return AverageVelocityWidget;
});
//# sourceMappingURL=average-velocity-widget.js.map