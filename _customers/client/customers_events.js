Template.customers.events({
	
	'click button#toggleView' : function(event) {
		console.log("Clicked Toggle");
		event.preventDefault();
		if (Session.get("mapView") !== true) {
			Session.set("mapView", true);
		} else {
			Session.set("mapView", false);
		};
	},
	
	'click button#new_customer' : function(event) {
		event.preventDefault();
		Session.set("recordId", null);
		Meteor.Router.to("/customers/new/");
	},
	
	// 'submit form#save_customer' : function (event) {
	// 		console.log("clicked save customer");
	// 		if (Session.get("currentAction") === "new") {
	// 			result = createRecord("Customers", Session.get("currentAction"), event);
	// 			
	// 			if (result) {
	// 				Session.set("currentAction", false);
	// 			};
	// 			
	// 		} else if (Session.get("currentAction") === "view") {
	// 			
	// 			result = createRecord(capitalize(Session.get("currentModule")), Session.get("currentAction"), event, Session.get("recordId"));
	// 			
	// 			if (result) {
	// 				// Session.set("currentAction", false);
	// 				// var custId = Session.get("recordId");
	// 				// Session.set("recordId", null);
	// 				// Meteor.Router.to("/customers/" + custId);
	// 			};
	// 		} else if (Session.get("currentAction") === "delete") {
	// 			
	// 			result = createRecord(capitalize(Session.get("currentModule")), Session.get("currentAction"), event, Session.get("recordId"));
	// 			
	// 			if (result) {
	// 				Session.set("currentAction", false);
	// 				Session.set("recordId", null);
	// 				Meteor.Router.to("/customers/");
	// 			};
	// 			
	// 		}
	// 	},

	'submit form#save_customer' : function (event) {
		event.preventDefault();
		
		push_to_dg = $("input#push_to_dg").attr("checked");
		form = extractFromValues();
		console.log(form)
		dg = buildDGValues(form);
		console.log(dg)
		customer = Session.get("recordId") == null ? Customers.insert({}) : Customers.findOne(Session.get("recordId"))._id;
		console.log(customer)
		if (push_to_dg) {
			var newCustomer = !Customers.findOne(customer).dg_info ? true : false
			
			if (newCustomer) {
				
				Meteor.call("newCustomer", dg, function(e, r) {
					if (!e && r) {
						Customers.update(customer, {$set: {dg_info: JSON.parse(r)}});
					};
				});
				
			} else {
				
				var customer_id = Customers.findOne(customer).dg_info.CustomerID
				Meteor.call("updateCustomer", customer_id, dg, function(e, r){
					if (!e && r) {
						Customers.update(customer, {$set: {dg_info: JSON.parse(r)}});
					};
				});
			};
			
		} else {
			Customers.update({_id: customer}, {$set: form})
		};
	},

	'click a.subModule' : function(event) {
		var subModule = $("#" + event.currentTarget.id.toString()).attr("id");
		Session.set("currentAction", subModule);
	},
	
	'click a#cancel' : function(event) {
		Meteor.Router.to("/customers/");
	},
	
	'click a.page': function(event) {
		event.preventDefault();
		Session.set("page", event.currentTarget.id);
	},

	'click .record': function(event, template) {
		customer_id = $("#" + event.currentTarget.id.toString()).attr("record_id");
		Meteor.Router.to("/customers/" + customer_id);
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