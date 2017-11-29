var mongoose = require('mongoose');
var FormSchema = new mongoose.Schema({
	name: String,
	surname: String,
	email: String,
	mungesat: String,
	programimIorientuar: String,
	java: String,
	arkitekture: String	
});
var UserSchema = new mongoose.Schema({
		email:String,
		username:String,
		password:String
	});

var Form = mongoose.model('Form', FormSchema);
var User = mongoose.model('User', FormSchema);
module.exports = Form;
module.exports = User;

