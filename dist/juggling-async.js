"use strict";
function jugglingAsync() {
    const http = require('node:http');
    const concatStream = require('concat-stream');
    const urls = process.argv.slice(2);
    for (let i = 0; i < urls.length; i++) {
        http.get(urls[i], (response) => {
            response.pipe(concatStream((data) => {
                console.log(data.toString());
            }));
        });
    }
}
jugglingAsync();
