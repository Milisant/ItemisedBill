var assert = require('assert');
var itemisedBill = require('../ItemisedBill');

describe('itemisedBill', function(){
	it('should create a list of map', function(){
		var phone = new itemisedBill();
		var list = phone.phoneBills('./ItemisedBill.csv');
		//console.log(list[1]);
		assert.equal(35, list.length);
		assert.equal("MTN", list[1].phoneItem);
	});

	it('should return phone calls for the specified provider', function(){
       var phone = new itemisedBill();
       var listOfPhoneBills = phone.phoneBills('./ItemisedBill.csv');
       var specificProvider = phone.callProvider(listOfPhoneBills, "MTN");
       //console.log(listOfPhoneBills)
       assert.equal(specificProvider.length, 16);
	});

	
	it('should calculate the total number of calls', function(){
       var phone = new itemisedBill();
       var list = phone.phoneBills('./ItemisedBill.csv');
       var total = phone.totalCalls(list);
		assert.deepEqual(total, {
          "MTN":16,
          "Vodacom":8,
          "CellC":11
    });
	})

	it('should calculate the duration in seconds of a call', function(){
       var phone = new itemisedBill();
       var list = phone.phoneBills('./ItemisedBill.csv');
       var callDuration = {
       	duration: '00h05m34s'
       }
       var results = phone.callDuration(callDuration)
       //console.log(results);
		assert.equal(callDuration, results);
	})
 });
