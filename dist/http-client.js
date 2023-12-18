"use strict";
/*Write a program that performs an HTTP GET request to a URL provided to you
  as the first command-line argument. Write the String contents of each
  "data" event from the response to a new line on the console (stdout).*/
/**HTTP requests contains three elements:
 * The request method which is the components.
 * The target, where the request is going to. This is usually the URL.
 * The protocol name and its version. */
const http = require('node:http');
const url = process.argv[2];
/*http.get(process.argv[2], function (response:any) {
    response.setEncoding('utf8')
    response.on('data', console.log())
    response.on('error', console.error())
  }).on('error', console.error())*/
http.get(url, (resp) => {
    let data = "";
    // A chunk of data has been recieved.
    resp.on("data", (chunk) => {
        data += chunk;
        console.log(chunk.toString());
    });
    // The whole response has been received. Print out the result.
    resp.on("end", () => {
        let url = JSON.parse(data).message;
        console.log(url);
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
