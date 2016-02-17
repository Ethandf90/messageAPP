var Message = require('./models/message');

module.exports = function (app) {

//find
app.get('/messages', function(req, res){
	console.log("I recieve a GET request");

	Message.find(function (err, messages) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // console.log(messages);
        res.json(messages); 
    });
});

//add
app.post('/messages', function(req, res){
	//should 'npm install body-parser' to make server be able to parser
	console.log(req.body);

	Message.create(req.body, function (err, messages) {
            if (err)
                res.send(err);
            console.log(messages);
        res.json(messages);
        });
});

//remove
app.delete('/messages/:id', function(req,res){
	var id = req.params.id;
	console.log("delete id: " + id);

	Message.remove({
            _id: id
        }, function (err, messages) {
            if (err)
                res.send(err);
            res.json(messages);
        });
});

//retrieve
app.get('/messages/:id', function(req, res){
	var id = req.params.id;
	console.log("retrieve id: " + id);

	Message.find({_id: id}, function (err, messages) {
        if (err) {
            res.send(err);
        }
        //here we send back the first object, otherwise res.json(message) dont send right data
        res.json(messages[0]); 
    });
});

}