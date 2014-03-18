Template.customers_map.rendered = function() {
	
			if (!this.rendered) {
			$("#map-canvas").height("400px");

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(p) {
					Session.set("myLat", p.coords.latitude);
					Session.set("myLng", p.coords.longitude);
				});
			}
			Deps.autorun(function(){
			var mapOptions = {
				center: new google.maps.LatLng(Session.get("myLat"), Session.get("myLng")),
				zoom: 13,
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

			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

			marker.setMap(map);

				Deps.autorun(function(){
					
					Customers.find().forEach(function(customer) {

						// if (customer.loc != null) {
							var geo = customer.geoLocation();
							console.log(customer.name() + "  >>>  " + geo.lat + ":" + geo.lng)
							var marker = new google.maps.Marker({
								position: new google.maps.LatLng(geo.lat, geo.lng),
								title: customer.name(),
								icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
							});

							marker.setMap(map);

							google.maps.event.addListener(marker, 'click', function() {
								Session.set("recordId", customer._id);
								// Meteor.Router.to("/customers/" + customer._id);
								// infowindow.open(map,marker);
							});

						// } 

					});

			})
			

			
		});
		
			this.rendered = true;
		};
	
};