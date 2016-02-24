//messageAPI

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

        //here we use the first object messages[0], otherwise res.json(message) dont send right data
        var response = {message: messages[0].message, isPalindrome: isPalindrome(messages[0].message)};
        console.log(response);

        res.json(response); 
    });
});

var isPalindrome = function(s) {
    if(s === null){
        return false;
    }
        
    if(s.length === 0){
        return true;
    }
        
    s = s.replace("[^a-zA-Z0-9]","").toLowerCase();
        
    for(var i = 0; i < s.length; i++){
         if(s.charAt(i) != s.charAt(s.length - 1 - i)){
             return false;
        }
    }
        
    return true;
};

}