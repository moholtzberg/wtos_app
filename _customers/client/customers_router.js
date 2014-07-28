Meteor.Router.add({
	
	'/customers/new': function() {
		var selectedModule = Modules.findOne({slug: "customers"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", "new");
			Session.set("recordId", null);
			return selectedModule.slug
		};
	},
	
	'/customers/:id': function(id) {
		var selectedModule = Modules.findOne({slug: "customers"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			
			if (!Session.get("currentAction") || Session.equals("currentAction", "new")) {
				Session.set("currentAction", "view");
			};
			
			Session.set("recordId", id);
			return selectedModule.slug
		};
	},
	
	'/customers': function() {
		console.log("customers");
		var selectedModule = Modules.findOne({slug: "customers"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", null);
			// UI.render(selectedModule.slug);
			return selectedModule.slug
		};
	}
	
});

