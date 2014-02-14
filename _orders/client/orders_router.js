Meteor.Router.add({
	
	'/orders/new': function() {
		var selectedModule = Modules.findOne({slug: "orders"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", "new");
			Session.set("recordId", null);
			return selectedModule.slug
		};
	},
	
	'/orders/:id': function(id) {
		var selectedModule = Modules.findOne({slug: "orders"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			
			if (!Session.get("currentAction") || Session.equals("currentAction", "new")) {
				Session.set("currentAction", "view");
			};
			
			Session.set("recordId", id);
			return selectedModule.slug
		};
	},
	
	'/orders': function() {
		console.log("orders");
		var selectedModule = Modules.findOne({slug: "orders"});
		if (selectedModule) {
			Session.set("currentModule", selectedModule.slug);
			Session.set("currentAction", null);
			return selectedModule.slug
		};
	}
	
});