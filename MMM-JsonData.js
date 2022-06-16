/* global Module */


/* Magic Mirror
 * Module: MMM-JsonData
 *
 * By 
 * MIT Licensed.
 */
Module.register("MMM-JsonData", {
	jsonData: [],
	defaults: {
		updateInterval: 1000,//every second
		fileName: "modules/MMM-JsonData/data.json",//.json file
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function () {
		this.getJson();
		this.scheduleUpdate();
	},

	scheduleUpdate(){
		setInterval(() => { this.getJson(); }, this.config.updateInterval);
	},

	getJson(){
		this.sendSocketNotification("MMM-JsonData_GET_JSON",this.config.fileName);
	},

	getDom: function () {

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		//wrapper.innerHTML = "Helloooo";

		if(this.jsonData.length == 0){
			wrapper.innerHTML = "Waiting for Health data";
			return wrapper;
		}
		
		//table header
		var tbl = document.createElement("table");
		var tHead = document.createElement("thead");
		var hrow = document.createElement("tr");
		var mainCell = document.createElement("th");
		var mainText = document.createTextNode("BP/O2");
		mainCell.appendChild(mainText);
		mainCell.setAttribute("colspan","2");
		hrow.appendChild(mainCell);
		tHead.appendChild(hrow);
		tbl.appendChild(tHead);
		tbl.setAttribute("cellpadding","6");
		tbl.setAttribute("cellspacing","6");

		//table body after fetch
		var tBody = this.tBodyCall();
		tbl.appendChild(tBody);

		wrapper.appendChild(tbl);
		return wrapper;
	},

	tBodyCall: function(){
		var tBody = document.createElement("tbody");
		
		//Finding columns
		var cols = [];
		var list = this.jsonData[0];
		for(var i in list){
			if(cols.indexOf(i) === -1){
				cols.push(i);
			}
		}
		console.log("Columns: ",cols);

		for(var j=0; j<cols.length; j++){
			console.log(cols[j],":",list[cols[j]]);
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var txt1 = document.createTextNode(cols[j]+"");
			td1.appendChild(txt1);
			tr.appendChild(td1);
			var td2 = document.createElement("td");
			var txt2 = document.createTextNode(list[cols[j]]+"");
			td2.appendChild(txt2);
			tr.appendChild(td2);
			tBody.appendChild(tr);
		}

		return tBody;
	},

	getScripts: function () {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-JsonData.css",
		];
	},

	// Load translations files
	getTranslations: function () {
		return false;
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-JsonData_RESULT") {
			// set dataNotification
			this.jsonData = payload;
			//console.log("Payload: ",this.jsonData);
			this.updateDom(this.config.animationSpeed);
		}
	},
});
