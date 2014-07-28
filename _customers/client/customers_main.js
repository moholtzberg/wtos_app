Meteor.subscribe("Customers");

Template.customers.record = function () {
	return Customers.findOne({_id: Session.get("recordId")});
}

Template.customers_list.record = function () {
	return Customers.find({}, {sort: {name: 1}});
}

Template.customers_form.record = function () {
	return Customers.findOne({_id: Session.get("recordId")});
}

Template.customers_form.dg_info = function() {
	var self = this;
	alert(self)
	// if (self.dg_info) {};
}

Template.customers_infoWindow.record = function() {
	return Customers.findOne({_id: Session.get("recordId")});
}

Template.customers_page.record = function() {
	return Customers.findOne({_id: Session.get("recordId")});
}

Template.customers_page.rendered = function() {
		$('[rel=tooltip]').tooltip();
		$('[rel=popover]').popover();
		
		if (!this.rendered) {
		$("#customer-view-map").height("200px");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(p) {
				Session.set("myLat", p.coords.latitude);
				Session.set("myLng", p.coords.longitude);
			});
		}
		Deps.autorun(function(){
		var mapOptions = {
			center: new google.maps.LatLng(Session.get("myLat"), Session.get("myLng")),
			zoom: 15,
			zoomControl: true,
			zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
			streetViewControl: false,
			mapTypeControl: false,
			scaleControl: true,
			mapTypeId: google.maps.MapTypeId.SMALL
		}

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(Session.get("myLat"), Session.get("myLng")),
			title:'My Location',
			icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		});

		map = new google.maps.Map(document.getElementById("customer-view-map"), mapOptions);

		marker.setMap(map);

			Deps.autorun(function(){
			
				var customer = Customers.findOne({_id: Session.get("recordId")})

					if (customer.loc != null) {
						var geo = customer.geoLocation();
						console.log(customer.name() + "  >>>  " + geo.lat + ":" + geo.lng)
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(geo.lat, geo.lng),
							title: customer.name(),
							icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
						});

						marker.setMap(map);

					} 

				});
	});

		this.rendered = true;
	};
}