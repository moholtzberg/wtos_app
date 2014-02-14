Customer = function (doc) {
  _.extend(this, doc);
};

Customer.prototype = {
  constructor: Customer,
	
  owner: function () {
		user = Meteor.users.findOne({_id: this.user_id});
		// console.log(user);
		if(user) {
			return user.full_name();
		}
  }, 
	
	contacts: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		console.log(Contacts.find({customer_id: self._id}).fetch());
		return Contacts.find({customer_id: self._id}).fetch();
	},
	
	notContacted: function () {
		var contacts = this.contacts();
		for (var i=0; i < contacts.length; i++) {
			console.log(contacts[i].neverContacted());
		};
	},
	
	leases: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		// return Leases.find({customer_id: self._id}).fetch();
		return Modules.find().fetch()
	},
	
	equipments: function () {
		if (this.record) {
			var self = this.record;
		} else {
			var self = this; 
		};
		return Equipments.find({customer_id: self._id}).fetch();
	},
	
	name: function() {
		var self = this;
		return !self.dg_info ? self.customer_name: self.dg_info.CustomerName
	},
	
	address: function() {
		var self = this;
		return !self.dg_info ? self.customer_address : self.dg_info.Address
	},

	city: function() {
		var self = this;
		return !self.dg_info ? self.customer_city : self.dg_info.City
	},

	state: function() {
		var self = this;
		return !self.dg_info ? self.customer_state : self.dg_info.State
	},
	
	zip: function() {
		var self = this;
		return !self.dg_info ? self.customer_zip : self.dg_info.Zip
	},
	
	phone: function() {
		var self = this;
		return !self.dg_info ? self.customer_phone : self.dg_info.Phone1
	},
	
	fax: function() {
		var self = this;
		return !self.dg_info ? self.customer_fax : self.dg_info.Fax
	},
	
	active: function() {
		var self = this;
		return !self.dg_info ? false : self.dg_info.Active
	},
	
	geoLocation: function() {
		var self = this;
		self.updateGeoLocation();
		
		if (self.loc) {
			return self.loc
		} else {
			return {lat: 0.0, lng: 0.0}
		};
	},
	
	updateGeoLocation: function() {
		var self = this;
		var url = "http://maps.googleapis.com/maps/api/geocode/json?address=+";
		url = url + self.address()+"+"+self.city()+"+"+self.state()+"+"+self.zip()+"+"+"&sensor=false";
		HTTP.call("GET", url, function (e, r) {
			if (r.statusCode === 200) {
				var loc = {lat: r.data.results[0].geometry.location.lat, lng: r.data.results[0].geometry.location.lng}
				Customers.update({_id: self._id}, {$set: {loc: loc}});
				return loc;
			}
		});
	}
	
};

Customers = new Meteor.Collection("customers", {
	transform: function (doc) {
		return new Customer(doc);
	}
});

Customers.prototype = {
	
	page: function(page, per_page) {
		if (!page || page === undefined || page === null) {
			page = 1;
			Session.set("page", page)
		};
		if (!per_page) {
			per_page = 10;
			Session.set("per_page", per_page)
		};
		return Customers.find({vendor: null}, {sort: {name: 1}, skip: (page - 1) * per_page, limit: per_page})
	},
	
	pages: function() {
		per_page = Session.get("per_page");
		result = Customers.find().count();
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

Customers.allow({
	insert: function() {
		return true;
	},
	
	update: function() {
		return true;
	}
});

Meteor.startup( function(){
	// c = Customers.find();
	// for (var i=0; i < c.length; i++) {
	// 	Customers.remove(c[i]._id);
	// };
	Meteor.call("getCustomers", function(e, r){
		if (!e) {
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Customers.findOne( {"dg_info.CustomerID": a[i].CustomerID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Customers.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					};
				} else {
					Customers.insert( {dg_info: a[i]} )};
				};
			};
		
	});
});