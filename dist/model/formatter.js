sap.ui.define([], function() {
	"use strict";
	var status;
	return {
		statusText: function(sStatus) {
			if (sStatus > 25) {

				status = "Error";

			} else {
				status = "Success";
			}
			return status;
		}

	};
});