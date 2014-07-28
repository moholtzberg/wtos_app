Meteor.methods({
	
	getEquipments: function () {
		var v = HTTP.get("http://127.0.0.1:3000/equipments.json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.stausCode});
		};
	},
	
	getEquipment: function (customer_id) {
		var v = HTTP.get("http://127.0.0.1:3000/equipments/" + customer_id + ".json");
		if (v.statusCode === 200) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	newEquipment: function (customer_data) {
		v = HTTP.post("http://127.0.0.1:3000/equipment.json", {data: customer_data});
		if (v.statusCode === 201) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	},
	
	updateEquipment: function(customer_id, customer_data) {
		console.log(customer_data)
		v = HTTP.put("http://127.0.0.1:3000/equipment/" + customer_id + ".json", {data: customer_data});
		if (v.statusCode === 202) {
			return v.content;
		} else {
			throw new Meteor.Error({code: v.statusCode});
		};
	}
	
});

Meteor.publish("Equipments", function() {
	return Equipments.find();
});

Meteor.startup( function(){

	Meteor.call("getEquipments", function(e, r){
		if (!e) {
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Equipments.findOne( {"dg_info.EquipmentID": a[i].EquipmentID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Equipments.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					Equipments.insert( {dg_info: a[i]} )
				}
			};
		};
	});
});