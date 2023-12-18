"use strict";
/*Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.
   
  For example:
   
  /api/parsetime?iso=2013-08-10T12:10:15.474Z
   
  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:
   
     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }
    
  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:
   
     { "unixtime": 1376136615474 }


url object:
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?iso=2023-12-11T09:07:18.082Z',
  query: [Object: null prototype] { iso: '2023-12-11T09:07:18.082Z' },
  pathname: '/api/unixtime',
  path: '/api/unixtime?iso=2023-12-11T09:07:18.082Z',
  href: '/api/unixtime?iso=2023-12-11T09:07:18.082Z'
}
*/
function jsonapi() {
    const http = require('node:http');
    const url = require('node:url');
    const server = http.createServer((req, res) => {
        //set the Content-Type properly
        res.writeHead(200, { 'Content-Type': 'application/json' });
        //Instance 'node:url'
        //find the request object from an HTTP server from url property
        //and parse to object. new URL(request.url)
        const reqURLObj = url.parse(req.url, true);
        //Expect the request to contain a (QUERY!!) string with a key ('ISO'!!) and an ISO-format time as the value
        const date = new Date(reqURLObj.query.iso);
        //Get the posibles path -> '/api/parsetime' or '/api/unixtime'
        const path = reqURLObj.pathname;
        if (path == '/api/parsetime') {
            res.end(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
        }
        else if (path == '/api/unixtime') {
            res.end(JSON.stringify({
                unixtime: date.getTime()
            }));
        }
    });
    server.listen(Number(process.argv[2]));
}
jsonapi();
