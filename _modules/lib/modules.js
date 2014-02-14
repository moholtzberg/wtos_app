Module = function (doc) {
  _.extend(this, doc);
};

//============================ Model propery definition 
Module.prototype = {
	constructor: Module,
	
	size: function () {
		var c = eval(this.name);
		c = c.find().count();
		return c;
	},
	
	filters: function () {
		if (this.fields) {
			console.log("gonna return true");
			return this.fields;
		};
	}
	
};

//============================ Transform the collection
Modules = new Meteor.Collection("modules", {
	transform: function (doc) {
		return new Module(doc);
	}
});