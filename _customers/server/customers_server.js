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

Meteor.startup( function(){
	console.log("=======> stating up")
	Meteor.call("getCustomers", function(e, r){
		console.log("=======> getting customers")
		if (!e) {
			console.log("=======> no errors getting customers")
			a = JSON.parse(r);
			console.log("=======> " + a.length + " customers found")
			for (var i=0; i < a.length; i++) {
				cust = Customers.findOne( {"dg_info.CustomerID": a[i].CustomerID} )
				if (cust) {
					console.log("=======> " + cust.dg_info.CustomerID + " found in db, with _id of " + cust._id)
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Customers.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					console.log("=======> " + a[i].CustomerID + " not found in db")
					Customers.insert( {dg_info: a[i]} )};
				};
			};
		
	});
});