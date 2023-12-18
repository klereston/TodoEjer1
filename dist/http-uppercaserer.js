"use strict";
function uppercase() {
    const http = require('node:http');
    //const fs   = require('node:fs');
    const map = require('through2-map');
    const portNumber = process.argv[2];
    const server = http.createServer((request, response) => {
        //console.log(request.body);
        request.pipe(map((chunk) => {
            return chunk.toString().toUpperCase();
        })).pipe(response);
    });
    /* inStream.pipe(map(function (chunk) {
       return chunk.toString().split('').reverse().join('')
     })).pipe(outStream) */
    server.listen(portNumber);
}
uppercase();
/** Correcion:
 * const http = require('http')
    const map = require('through2-map')
    
    const server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }
    
      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })
    
    server.listen(Number(process.argv[2])) */ 
