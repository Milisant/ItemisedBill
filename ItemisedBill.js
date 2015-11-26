var fs = require('fs');

module.exports = function() {
	this.phoneBills = function(filepath){
		var listOfobjects = fs.readFileSync(filepath, 'utf8');

		var rows = listOfobjects.split('\r');
		var listOfPhoneBills = [];
		var lineNumber = 0;

		rows.forEach(function(row) {

			var phone = row.split(',');

			if(lineNumber != 0){

				var columns = row.split(',');
				var date = columns[0];
				var currentPhone = columns[1];
				var number = columns[2];
				var duration = columns[3];
				//number = number.replace(",", "."); 

				var phoneObj = {
					date : date,
					phoneItem: currentPhone,
					number: number,
					duration : duration
				};

				listOfPhoneBills.push(phoneObj);
			}
			lineNumber = lineNumber +1;
		});
		return listOfPhoneBills;
	}
	this.callProvider = function(listOfPhoneBills, provider){
		var specificProvider = [];
		for(var i = 0; i < listOfPhoneBills.length; i++){
			var value = listOfPhoneBills[i];
			if(value.phoneItem === provider){
				specificProvider.push(value);
			}
		}
		return specificProvider;
	};

	this.totalCalls = function(listOfPhoneBills) {
		var phoneCallsMap = {};
		for(var index in listOfPhoneBills){
			var total = listOfPhoneBills[index];
			if(phoneCallsMap[total.phoneItem] === undefined){
				phoneCallsMap[total.phoneItem] = 0;
			}
			phoneCallsMap[total.phoneItem] = phoneCallsMap[total.phoneItem]+1;
		}

		return phoneCallsMap;
	}

	this.callDuration  = function(callDuration){
    var duration = callDuration.Duration;
      var hours = Number(duration.slice(0,2));
      var minutes = Number(duration.slice(3,5));
      var seconds = Number(duration.slice(6,8));
        // console.log(hours + " " + "hours");
        // console.log(minutes + " " + "minutes");
        // console.log(seconds + " " + "seconds");
      var converted = hours * 60 * 60 + minutes * 60 + seconds; 
        return converted;
  };
};