"use strict";
/*Write a TCP time server!
   
  Your server should listen to TCP connections on the port provided by the
  first argument to your program. For each connection you must write the
  current date & 24 hour time in the format:
   
     "YYYY-MM-DD hh:mm"
*/
//use the net module from Node core which has all the basic networking functions.
/**
 * {
  _createServerHandle: [Function: createServerHandle],
  _normalizeArgs: [Function: normalizeArgs],
  _setSimultaneousAccepts: [Function: _setSimultaneousAccepts],
  BlockList: [Getter],
  SocketAddress: [Getter],
  connect: [Function: connect],
  createConnection: [Function: connect],
  1º - createServer: [Function: createServer],
  isIP: [Function: isIP],
  isIPv4: [Function: isIPv4],
  isIPv6: [Function: isIPv6],
  Server: [Function: Server],
  Socket: [Function: Socket],
  Stream: [Function: Socket],
  getDefaultAutoSelectFamily: [Function: getDefaultAutoSelectFamily],
  setDefaultAutoSelectFamily: [Function: setDefaultAutoSelectFamily],
  getDefaultAutoSelectFamilyAttemptTimeout: [Function: getDefaultAutoSelectFamilyAttemptTimeout],
  setDefaultAutoSelectFamilyAttemptTimeout: [Function: setDefaultAutoSelectFamilyAttemptTimeout]
} */
const net = require("node:net");
const portNumber = process.argv[2];
const addZero = (d) => {
    if (d < 10) {
        return "0" + d;
    }
    return d + "";
};
const server = net.createServer((socket) => {
    // socket handling logic
    //only need to write data and then close the socket.  
    const d = new Date();
    const YYYY = d.getFullYear(); //Get year as a four digit number (yyyy)
    const MM = addZero(d.getMonth() + 1); //Get month as a number (0-11)
    const DD = addZero(d.getDate()); //Get day as a number (1-31)
    const hh = addZero(d.getHours()); //Get hour (0-23)
    const mm = addZero(d.getMinutes()); //Get minute (0-59)
    const date = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
    socket.write(date + '\n');
    //end socket
    socket.end();
});
server.listen(portNumber);
