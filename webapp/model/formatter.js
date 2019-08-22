sap.ui.define([], function () {
	"use strict";
	return {
		setDate: function (Value) {
			// if (value) {
			// 	var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			// 		pattern: "MM-dd-yyyy"
			// 	});
			// 	return oDateFormat.format(new Date(value));
			// } else {
			// 	return value;
			// }
			// console.log(Value);
			if (Value != null) {
				// var s = new Date(parseInt(Value.replace('/Date(', '')));
				return Value.toLocaleDateString();
				// var ad = s.getDate() + '/' + (s.getMonth() + 1) + '/' + s.getFullYear();
			}
			return "";
			// return "23/02/2019";
		},
		setNewDate: function (Value) {
				if (Value != null) {
					var currentDate = new Date();
					var daysToAdd = Value + 1;
					currentDate.setDate(currentDate.getDate() + daysToAdd);
					var dd = currentDate.getDate();
					var mm = currentDate.getMonth() + 1;
					var y = currentDate.getFullYear();

					var formattedDate = mm + '/' + dd + '/' + y;
					return formattedDate;
				}
				return "";
			}
			// setDate: function(date) {
			// 	return new DateFormatter({now: Date.now}).format(date);
			// }
	};
});