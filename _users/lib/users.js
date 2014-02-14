User = function (doc) {
  _.extend(this, doc);
};

User.prototype = {
	constructor: User,
	
	is_admin: function() {
		var self = this;
		if (!self.is_admin && !self.profile.is_admin) {
			return false;
		} else {
			return true;
		};
	},
	
	full_name: function() {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return self.profile.first_name + " " + self.profile.last_name;
	}
};

Meteor.users._transform = function(doc) {
	return new User(doc);
}

Users = Meteor.users