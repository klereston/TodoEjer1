"use strict";
/*Write an HTTP server that serves the same text file for each request it
receives.
 
Your server should listen on the port provided by the first argument to
your program.
 
You will be provided with the location of the file to serve as the second
command-line argument. You must use the fs.createReadStream() method to
stream the file contents to the response.*/
const httpServer = () => {
    //get the port 
    const portNumber = process.argv[2];
    //get the files
    const files = process.argv[3];
    const http = require("node:http");
    const fs = require("node:fs");
    //create an HTTP server
    const server = http.createServer((_req, res) => {
        const src = fs.createReadStream(files);
        src.pipe(res);
    });
    server.listen(portNumber);
};
httpServer();
