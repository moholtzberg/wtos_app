Template.equipments.events({
	
	'click button#new_equipment' : function(event) {
		event.preventDefault();
		Session.set("recordId", null);
		Meteor.Router.to("/equipments/new/");
	},
	
	'submit form#save_equipment' : function (event) {
		event.preventDefault();
		
		push_to_dg = $("input#push_to_dg").attr("checked");
		form = extractFromValues();
		dg = buildDGValues(form);
		equipment = Session.get("recordId") == null ? Equipments.insert({}) : Equipments.findOne(Session.get("recordId"))._id;
		
		if (push_to_dg) {
			var newEquipment = !Equipments.findOne(equipment).dg_info ? true : false
			
			if (newCustomer) {
				
				Meteor.call("newEquipment", dg, function(e, r) {
					if (!e && r) {
						Equipments.update(equipment, {$set: {dg_info: JSON.parse(r)}});
					};
				});
				
			} else {
				
				var equipment_id = Equipments.findOne(equipments).dg_info.EquipmentID
				Meteor.call("updateEquipment", equipment_id, dg, function(e, r){
					if (!e && r) {
						Equipments.update(equipment, {$set: {dg_info: JSON.parse(r)}});
					};
				});
			};
			
		} else {
			Equipments.update({_id: equipment}, {$set: form})
		};
	},

	'click a.subModule' : function(event) {
		var subModule = $("#" + event.currentTarget.id.toString()).attr("id");
		Session.set("currentAction", subModule);
	},
	
	'click a#cancel' : function(event) {
		Meteor.Router.to("/equipments/");
	},
	
	'click a.page': function(event) {
		event.preventDefault();
		Session.set("page", event.currentTarget.id);
	},

	'click tr.record': function(event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("record_id");
		Meteor.Router.to("/equipments/" + customer_id);
		Session.set("currentAction", "view");
  }

});

extractFromValues = function() {
	var form = {};
	form.customer_name = $("input#customer_name").val();
	form.customer_address = $("input#customer_address").val();
	form.customer_city = $("input#customer_city").val();
	form.customer_state = $("input#customer_state").val();
	form.customer_zip = $("input#customer_zip").val();
	form.customer_phone = $("input#customer_phone").val();
	form.customer_fax = $("input#customer_fax").val();
	form.customer_zip = $("input#customer_zip").val();
	form.customer_user_id = $("input#customer_user_id").val();
	return form;
}

buildDGValues = function(form) {
	var obj = {}
	obj.CustomerName = form.customer_name
	obj.Address = form.customer_address
	obj.City = form.customer_city
	obj.State = form.customer_state
	obj.Zip = form.customer_zip
	obj.Phone1 = form.customer_phone
	obj.Fax = form.customer_fax
	return obj;
}