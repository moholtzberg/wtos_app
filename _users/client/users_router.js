Meteor.Router.add({
	
	'/set-password/:token' : function (token) {
		// Template.set_password.token = function() {
		// 	return Session.get("token");
		// };
		console.log(token);
		Session.set("token", token);
		return "set_password";
	},
	
	'/enroll-account/:token' : function(token) {
		Accounts.verifyEmail(token, function(err) {
			if (err) {
				console.log(err)
			} else {
				// Session.set("token", token);
				window.location.pathname = "/set-password/" + token;
			};
		})
	},
	
	'/users/new': function() {
		var selectedModule = Modules.findOne({slug: "users"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", "new");
			Session.set("recordId", null);
			return selectedModule.slug
		};
	},
	
	'/users/:id': function(id) {
		var selectedModule = Modules.findOne({slug: "users"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			if (!Session.get("currentAction") || Session.equals("currentAction", "new")) {
				Session.set("currentAction", "view");
			};
			// Session.set( _.singularize(selectedModule.slug) + "Id", id);
			Session.set("recordId", id);
			return selectedModule.slug
		};
	},
	
	'/users': function() {
		var selectedModule = Modules.findOne({slug: "users"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", null);
			return selectedModule.slug
		};
	}
	
});

