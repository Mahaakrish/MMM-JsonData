/* Magic Mirror
 * Node Helper: MMM-JsonData
 *
 * By 
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var fs = require("fs");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-JsonData_GET_JSON") {
			var data = [];
			fs.readFile(payload, 'utf-8', (err, jString) => {
				if (err) {
					console.log("Cannot read the file", err);
				} else {
					data = JSON.parse(jString);
					//console.log("Data:", data);
					this.sendSocketNotification("MMM-JsonData_RESULT", data);
				}
			});
		}
	},
});
