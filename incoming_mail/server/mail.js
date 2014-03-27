Meteor.Router.add('/messages/incoming', 'POST', function() {
	console.log("======================ROUTER - REC");
	var params = this.request.body;
	var a = JSON.stringify(params["stripped-text"]);
	// var b = JSON.parse(params)
	console.log(a)
	// Messages.update({_id: params.message_id}, {$set: {delivered: {status: true, time_stamp: new Date()}}});
	console.log("============================");
});

Meteor.Router.add('/messages/jabber', 'GET', function() {
	console.log("======================ROUTER - JABBER");
	console.log(this.request);
	var params = this.request.body;
	// var a = JSON.stringify(params["stripped-text"]);
	// var b = JSON.parse(params)
	// console.log(a)
	// Messages.update({_id: params.message_id}, {$set: {delivered: {status: true, time_stamp: new Date()}}});
	console.log("============================");
});

// Meteor.Router.add('/messages/open', 'POST', function() {
// 	console.log("======================ROUTER - OPN");
// 	var params = this.request.body;
// 	console.log(params);
// 	Messages.update({_id: params.message_id}, {$set: {opened: {status: true, time_stamp: new Date(), ip_address: params["ip"], city: params["city"], client_name: params["client-name"], client_os: params["client-os"], device_type: params["device-type"]}}});
// 	console.log("============================");
// });
// 
// Meteor.Router.add('/messages/fail', 'POST', function() {
// 	console.log("======================ROUTER - BNC");
// 	var params = this.request.body;
// 	console.log(params);
// 	Messages.update({_id: params.message_id}, {$set: {bounced: {status: true, code: params["code"], time_stamp: new Date(), }}});
// 	console.log("============================");
// });
// 
// Meteor.Router.add('/messages/spam', 'POST', function() {
// 	console.log("======================ROUTER - SPM");
// 	var params = this.request.body;
// 	console.log(params);
// 	Messages.update({_id: params.message_id}, {$set: {spam: {status: true, time_stamp: new Date(), }}});
// 	console.log("============================");
// });