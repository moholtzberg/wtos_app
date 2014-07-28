// Modules = new Meteor.Collection("modules");

Meteor.startup(function(){
	if (!Modules.findOne({slug: "modules"})) {
		Modules.insert({name: "Modules", slug: "modules", icon: "fa-cog", admin_only: true, active: true});
	};
});

Meteor.publish("Modules", function () {
	if (Meteor.users.findOne(this.userId).profile.is_admin) {
		return Modules.find();
	} else {
		return Modules.find({admin_only: false, active: true})
	};
});

Modules.allow({
	insert: function (userId, doc) {
		return userId === doc.user_id;
	},
	update: function (userId, doc) {
		if (Users.findOne(userId).profile.is_admin) {
			return true;
		} else {
			return false;
		}
	}
});