Meteor.Router.add({
	
	'/equipments/new': function() {
		var selectedModule = Modules.findOne({slug: "equipments"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", "new");
			Session.set("recordId", null);
			return selectedModule.slug
		};
	},
	
	'/equipments/:id': function(id) {
		var selectedModule = Modules.findOne({slug: "equipments"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			
			if (!Session.get("currentAction") || Session.equals("currentAction", "new")) {
				Session.set("currentAction", "view");
			};
			
			Session.set("recordId", id);
			return selectedModule.slug
		};
	},
	
	'/equipments': function() {
		console.log("equipments");
		var selectedModule = Modules.findOne({slug: "equipments"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", null);
			return selectedModule.slug
		};
	}
	
});

