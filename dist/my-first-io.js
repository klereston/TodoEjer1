"use strict";
/*Write a program that uses a single synchronous filesystem operation to
  read a file and print the number of newlines (\n) it contains to the
  console (stdout)
*/
function numberOfNewlines() {
    const fs = require('node:fs');
    //const path = './firstIOtext.txt'
    const path = process.argv[2];
    //readFile return a Buffer object
    const buf = fs.readFileSync(path);
    //Buffer objects can be converted to strings by simply calling the toString()
    const str = buf.toString();
    const lines = str.split('\n');
    return lines.length - 1;
}
console.log(numberOfNewlines());
/*const contents = fs.readFileSync(process.argv[2])
    const lines = contents.toString().split('\n').length - 1
    console.log(lines)
    
    // note you can avoid the .toString() by passing 'utf8' as the
    // second argument to readFileSync, then you'll get a String!
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
*/
