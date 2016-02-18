# messageAPP

This is my first time using **MEAN Stack**. Basically it's a process of learning by doing.

This is a simple nodeJS APP, where user can create account(username and password) and login. 
Then send messages to others(have to know the target username), and see the recieved messages from others. 

This program runs locally(mongodb connects to 'mongodb://localhost/messageDB', in server.js)

The application on AWS is [http://ec2-107-23-47-197.compute-1.amazonaws.com:3000/](http://ec2-107-23-47-197.compute-1.amazonaws.com:3000/)

**To configure it locally**:  
- Make sure the [nodeJS](nodejs.org) and [mongoDB](mongodb.org) are installed. 
- download the 'messageAPP', 
- cd into the folder and 'npm install' to install the dependencies.
- 'npm start', then you can see 'Server running on port 3000' on the terminal(if using MAC)
- in the broswer, go into http://localhost:3000/

**To use it**:
- open the application [on cloud](http://ec2-107-23-47-197.compute-1.amazonaws.com:3000/) or [locally](http://localhost:3000/)
- register two or more accounts(e.g. test1:test1, test2:test2, which are already there), login as test1, send message to test1 and test2...; then logout, login as test2, send message to test2 and test1. then you can see the sent and recieved messages of each user.
- in the Receive seciton, you can filter messages by title, content and sender
- you can delete a certain message, or retrieve a certain message(to see if it is Palindrome)
            

There are two groups of API - loginAPI and messageAPI

**loginAPI(loginApi.js)**: 
- POST ./register
- POST ./login
- GET ./logout
- (I learnt the user autentication of MEAN from this [blog]( http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VsP29JMrKb9))
          
**messageAPI(api.js)**: 
- GET ./messages  -- description: to find all items; response: allMessages 
- POST ./messages -- description: to insert a new item into database; param: newMessage; response: newMessage
- DELETE ./messages/:id  -- description: remove an item by id; param: id;
- GET ./messages/:id -- description: to retrieve an item by id; param: id;
            
**About the files**:
- code will run from server.js
- 'app' folder: contains server side code
- 'public' folder: contains frontend code. 
- ec2.js is for creating new instance, should run seperately

**To do**: 
- study into nodeJS design patterns, to make it more organized;
- configure docker and ECS container
- use Socket to receive and refresh
       
