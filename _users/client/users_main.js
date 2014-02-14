
Meteor.subscribe("users");

Template.users.selected = function() {
	return Session.get("currentModule") === "Users";
}

Template.users_list.records = function() {
	return Users.find({});
}

Template.users_form.record = function() {
	return Users.findOne({_id: Session.get("recordId")});
}