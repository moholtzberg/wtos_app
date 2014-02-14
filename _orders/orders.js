Order = function (doc) {
  _.extend(this, doc);
};

Order.prototype = {
  constructor: Order,
	
  owner: function() {
		user = Meteor.users.findOne({_id: this.user_id});
		// console.log(user);
		if(user) {
			return user.full_name();
		}
  },

	customer: function() {
		var self = this;
		return Customers.findOne({"dg_info.CustomerID": self.dg_info.CustomerID})
	},
	
	order_number: function() {
		var self = this;
		return !self.dg_info ? self.order_number: self.dg_info.SONumber
	},
	
	date: function() {
		var self = this;
		var date =  !self.dg_info ? self.date : self.dg_info.Date
		return moment(date).format('L');
	},
	
	total: function() {
		var self = this;
		var total =  !self.dg_info ? self.total : self.dg_info.Total
		return accounting.formatMoney(total)
	},
	
	backOrdered: function() {
		var self = this;
		if (parseFloat(self.dg_info.QuantityBackOrdered) > 0) {
			return true;
		} else {
			return false;
		};
	},
	
	shipped: function() {
		var self = this;
		if (self.dg_info.QuantityShipped > 0) {
			return true;
		} else {
			return false;
		};
	},
	
	fulFilled: function() {
		var self = this;
		if (self.dg_info.QuantityFulfilled > 0) {
			return true;
		} else {
			return false;
		};
	},
	
	open: function() {
		var self = this;
		if (!self.backOrdered() && !self.shipped() && !self.fulFilled()) {
			return true;
		} else {
			return false
		};
	},
	
	order_status: function() {
		var self = this;
		var bo = self.backOrdered();
		var sh = self.shipped();
		var fu = self.fulFilled();
		var status = 0;
		var obj = {}
		
		status += bo ? 1 : 0
		status += sh ? 2 : 0
		status += fu ? 4 : 0
			
		switch(status) {
			case 0:
				// return "Open";
				obj.icon = "info-circle"
				obj.color = "info"
				return obj;
				break;
			case 1:
				// return "Backordered";
				obj.icon = "minus-circle"
				obj.color = "warning"
				return obj;
				break;
			case 2:
				// return "Shipped";
				obj.icon = "plus-circle"
				obj.color = "info"
				return obj;
				break;
			case 3:
				// return "Backordered +"
				obj.icon = "minus-circle"
				obj.color = "primary"
				return obj;
				break;
			case 4:
				// return "Fullfilled"
				obj.icon = "check-circle"
				obj.color = "success"
				return obj;
				break;
			case 5:
				// return "Backordered +"
				obj.icon = "minus-circle"
				obj.color = "sucess"
				return obj;
				break;
			case 6:
				// return "Shipped + " 
				obj.icon = "plus-circle"
				obj.color = "success"
				return obj;
				break;
			case 7:
				// return "Backordered +"
				obj.icon = "minus-circle"
				obj.color = "primary"
				return obj;
				break;
			}
		
	}
	
};

Orders = new Meteor.Collection("orders", {
	transform: function (doc) {
		return new Order(doc);
	}
});

Orders.prototype = {
	
	page: function(page, per_page) {
		if (!page || page === undefined || page === null) {
			page = 1;
			Session.set("page", page)
		};
		if (!per_page) {
			per_page = 10;
			Session.set("per_page", per_page)
		};
		return Orders.find({vendor: null}, {sort: {name: 1}, skip: (page - 1) * per_page, limit: per_page})
	},
	
	pages: function() {
		per_page = Session.get("per_page");
		result = Orders.find().count();
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
	
	if (!Modules.findOne({slug: "orders"})) {
		Modules.insert({name: "Orders", slug: "orders", icon: "fa-shopping-cart", admin_only: false, active: true});
	};
	
	Meteor.call("getOrders", function(e, r){
		if (!e) {
			a = JSON.parse(r);
			for (var i=0; i < a.length; i++) {
				cust = Orders.findOne( {"dg_info.SOID": a[i].SOID} )
				if (cust) {
					if (cust.dg_info.LastUpdate < a[i].LastUpdate || !cust.dg_info.LastUpdate) {
						Orders.update({_id: cust._id}, {$set: {dg_info: a[i]}})
					}
				} else {
					Orders.insert( {dg_info: a[i]} )
				};
			};
		};
	});
	
});