Meteor.subscribe("Customers");

Template.customers_list.record = function () {
	return Customers.find({}, {sort: {name: 1}});
}

Template.customers_form.record = function () {
	return Customers.findOne({_id: Session.get("recordId")});
}

Template.customers_infoWindow.record = function() {
	return Customers.findOne({_id: Session.get("recordId")});
}