Meteor.Router.add({
	
	'/modules/new': function() {
		var selectedModule = Modules.findOne({slug: "modules"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", "new");
			Session.set("recordId", null);
			return selectedModule.slug
		};
	},
	
	'/modules/:id': function(id) {
		var selectedModule = Modules.findOne({slug: "modules"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			
			if (!Session.get("currentAction") || Session.equals("currentAction", "new")) {
				Session.set("currentAction", "view");
			};
			
			Session.set("recordId", id);
			return selectedModule.slug
		};
	},
	
	'/modules': function() {
		console.log("modules");
		var selectedModule = Modules.findOne({slug: "modules"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", null);
			return selectedModule.slug
		};
	}
	
});

