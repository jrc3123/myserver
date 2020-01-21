// heyWorld(); - you can do this up here
// helloWorld(); - you cannot do this up here

const myData = require("./myData.js"); // you dont have to name the variable the same as the file but it's more readable that way
const Polygon = require("./Polygon.js");
const _ = require("underscore");
const http = require('http');

const helloWorld = () =>{
    console.log("Hello World");
};

function heyWorld(){

}

helloWorld();

myData.getMessage();

const myPoly = new Polygon(10,15);
console.log("Poly width is " + myPoly.width + " and height is " + myPoly.height);

const myArray = [1,2,3,4,5];
const found = _.contains(myArray, 3);
console.log(found);

//First thing we need is a port in which our server can run. A port is essentially a mailbox where
//a program can send and recieve internet traffic. The following line will first check to see if
//the PORT or NODE_PORT environment variables have been set. If they have not, we will instead use
//port 3000. The PORT and NODE_PORT environment variables will be filled out by heroku if we deploy
//our server there. Port 3000 is the standard "development" port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//At it's core, node is an event driven system. A main process runs, waiting for events to fire. When
//an event fires, it will use a thread pool to handle that event. For our basic server, we need a
//function that will get called any time a request comes in to our server. This function, called
//onRequest, will act as our "event handler" for those requests. The node http library defines a
//request handler as accepting a request and response object. These are prebuilt objects given to us
//by the http library. The request contains all the data from the users request to our server. The
//response object is our "interface" for sending data back to the user. Once response.end() has been
//called we can no longer write to or use this response object. The http standard enforces that only
//one response can ever be sent for a single request.
const onRequest = (request, response) => {
  
  //Once we have a request, we can investigate what the user is asking for. This basic demo just shows
  //that we can check the url to see what the user wants. In this case, we are checking for the favicon
  //request. The favicon is the small icon that goes in the web browser tab on a website. Most browsers
  //automatically make this request when you open a page.
  if(request.url === '/favicon.ico') {
    console.log('favicon request');
  }
  
    console.log('request.url='+request.url);
    console.log('request.headers='+JSON.stringify(request.headers));
    
  //For any response that comes into my server, I simply want to send back plain text. Normally this
  //would not be the case (most web servers send back html, css, javascript, media files, etc) but
  //for simplicity, no matter what url our user goes to, we will send them plain text.
  
  //The first thing I have to do to my response is set up the "meta data". This is data the browser
  //will use, but that the user will not see. The writeHead function takes two parameters. The first
  //is the http status code. There are a number of these (200 = success, 404 = not found, etc). The
  //second parameter is an object of all "headers" we want to set. Headers are just specifically
  //formatted meta data. In this case, we are setting the "content-type" header (which tells the
  //browser how to interpret the data it recieves from us) to "text/plain" which is the MIME type for
  //plain text.
  response.writeHead(200, {'Content-Type': 'text/plain'});
  
  //We told the browser that we would send it plain text, so we want to write some text to the response
  //body. In this case, we can write the text "Hey there". This is the text that the browser will then
  //display to the user.
  response.write("Hey there " + Math.random());
  
  //Finally when we are finished filling out our response, we can tell node that we are done with it,
  //and that it can send it back to the user. Once we call response.end(), we can no longer edit or
  //send responses to the user for this request. We are done.
  response.end();
}

//Once we have that onrequest function setup, and we have a port for our server to run on, we can
//have the http library create an http server that uses that information. This line will start up
//an http server that checks the port number defined in the port variable for requests. When a request
//shows up (ie someone goes to localhost:3000, or connects to our heroku app), it will get sent into
//the onRequest function to be handled.
http.createServer(onRequest).listen(port);