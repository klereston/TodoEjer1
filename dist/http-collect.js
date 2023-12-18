"use strict";
function httpCollect() {
    const http = require('node:http');
    const concatStream = require('concat-stream');
    const url = process.argv[2];
    http.get(url, (response) => {
        // Use 'bl' package to collect entire stream of data
        response.pipe(concatStream((data) => {
            console.log(data.toString().length);
            console.log(data.toString());
        }));
    });
}
httpCollect();
