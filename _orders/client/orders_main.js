Meteor.subscribe("Orders");

Template.orders_list.record = function () {
	return Orders.find({});
}

Template.orders_form.record = function () {
	return Orders.findOne({_id: Session.get("recordId")});
}