Equipment = function (doc) {
  _.extend(this, doc);
};

Equipment.prototype = {
  constructor: Equipment,
	
  owner: function () {
		user = Meteor.users.findOne({_id: this.user_id});
		// console.log(user);
		if(user) {
			return user.full_name();
		}
  }, 
	
	customer: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Customers.findOne({customer_id: self.customer_id});
	},
		
	leases: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Leases.findOne({lease_id: self.lease_id});
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? false : self.dg_info.Active
	}

};

Equipments = new Meteor.Collection("equipments", {
	transform: function (doc) {
		return new Equipment(doc);
	}
});

Equipments.prototype = {
	
	page: function(page, per_page) {
		if (!page || page === undefined || page === null) {
			page = 1;
			Session.set("page", page)
		};
		if (!per_page) {
			per_page = 10;
			Session.set("per_page", per_page)
		};
		return Equipments.find({vendor: null}, {sort: {name: 1}, skip: (page - 1) * per_page, limit: per_page})
	},
	
	pages: function() {
		per_page = Session.get("per_page");
		result = Equipments.find().count();
		tot_pages = Math.ceil(result/per_page);
		return tot_pages;
	},
	
	paginated: function() {
		var pages = parseInt(this.pages());
		var page = parseInt(Session.get("page"));
		var pagination = new Array();
		var range = parseInt(Session.get("range")) || 10;

		if (pages > range) {
			if (page === 1) {
				min = 1;
				max = range;
			} else if(page > 1 && page < pages) {
				min = Math.max(1, page - (Math.floor((range-1) /2)));
				max = Math.min(pages, page + (Math.ceil((range-1) /2)));
				if (range - (max-min) > 0) {
					var off = range - (max-min);
					if (min - off < 1) {
						max = max + off - 1;
					} else if(max + off > pages) {
						min = min - off + 1;
					};
				} 
			} else if(page === pages) { 
				min = ((pages - range) + 1);
				max = pages;
			};
			
		} else {
			min = 1;
			max = pages;
		}	
		
		for (var i = min; i < max+1; i++) {
			if (i >= min && i <= max) {
				pagination.push(i.toString())
			}
		};
		return pagination;	
	}
	
}

Equipments.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});