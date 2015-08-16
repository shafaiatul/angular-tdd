var express= require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var contacts = [{
	name: 'James'
}, {
	name: 'Karim'
}];

app.get('/contacts', function (req, res) {
	res.status(200).json(contacts);
});

app.listen(9001);
