"use strict";
/*
  Write a program that uses a single asynchronous filesystem operation to
  read a file and print the number of newlines it contains to the console
  (stdout), similar to running cat file | wc -l.
   
  The full path to the file to read will be provided as the first
  command-line argument.
*/
//asynchronous
function numberOfNewlinesAsync() {
    const fs = require('node:fs');
    //const file = fs.readFile(, 'utf8');
    fs.readFile(process.argv[2], 'utf8', function callback(err, fileContent) {
        if (err) {
            console.log(err);
        }
        else if (fileContent) {
            console.log(fileContent.split('\n').length - 1);
        }
    });
}
numberOfNewlinesAsync();
//console.log(numberOfLines)
