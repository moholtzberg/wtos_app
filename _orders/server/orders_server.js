Meteor.methods({
	
	getOrders: function () {
		var v = HTTP.get("http://127.0.0.1:3000/orders.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getOrder: function (order_id) {
		var v = HTTP.get("http://127.0.0.1:3000/orders/" + order_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newOrder: function (order_data) {
		v = HTTP.post("http://127.0.0.1:3000/orders.json", {data: order_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateOrder: function(order_id, order_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/orders/" + order_id + ".json", {data: order_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Orders", function() {
	return Orders.find();
});

// Meteor.startup(function(){
// 	o = Orders.find();
// 	o.forEach(function(ord){
// 		Orders.remove({_id: ord._id})
// 	})
// });

// Meteor.startup(function(){
// 	v = Meteor.call("getCustomers");
// 	v = JSON.parse(v);
// 	if (v.length > Customers.find().count() ) {
// 		for (var i=0; i < Things.length; i++) {
// 			Customers.insert(Things[i])
// 		};
// 	};
// });