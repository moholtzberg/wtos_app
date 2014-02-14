Meteor.subscribe("Modules");

Template.modules_list.record = function () {
	return Modules.find({}, {sort: {name: 1}});
}

Template.modules_form.record = function () {
	return Modules.findOne({_id: Session.get("recordId")});
}