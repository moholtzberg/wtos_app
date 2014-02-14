Meteor.methods({
	
	getCustomers: function () {
		var v = HTTP.get("http://127.0.0.1:3000/customers.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getCustomer: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/customers/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newCustomer: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/customers.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateCustomer: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/customers/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
	
	
});

Meteor.publish("Customers", function() {
	return Customers.find();
});



// Meteor.startup(function(){
// 	v = Meteor.call("getCustomers");
// 	v = JSON.parse(v);
// 	if (v.length > Customers.find().count() ) {
// 		for (var i=0; i < Things.length; i++) {
// 			Customers.insert(Things[i])
// 		};
// 	};
// });