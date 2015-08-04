var express= require('express'),
	app = express();

var contacts = [{
	name: 'James'
}, {
	name: 'Karim'
}];

app.get('/contacts', function (req, res) {
	res.status(200).json(contacts);
});

app.listen(9001);