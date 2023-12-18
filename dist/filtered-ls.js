"use strict";
/**
 * Create a program that prints a list of files in a given directory,
  filtered by the extension of the files. You will be provided a directory
  name as the first argument to your program (e.g. '/path/to/dir/') and a
  file extension to filter by as the second argument.
   
  For example, if you get 'txt' as the second argument then you will need to
  filter the list to only files that end with .txt. Note that the second
  argument will not come prefixed with a '.'.
   
  Keep in mind that the first arguments of your program are not the first
  values of the process.argv array, as the first two values are reserved for
  system info by Node.
   
  The list of files should be printed to the console, one file per line. You
  must use asynchronous I/O.
 */
//path.extname('index.html');
// Returns: '.html'
function printListFiles() {
    const fs = require('node:fs');
    fs.readdir(process.argv[2], 'utf8', function callback(err, fileContent) {
        if (err) {
            console.log(err);
        }
        else if (fileContent) {
            //const firstElement = fileContent[0]
            let index = fileContent[0].lastIndexOf('.');
            let extname = fileContent[0].substr(index);
            //console.log(extname) .md
            fileContent.filter((element) => {
                let ie = element.lastIndexOf('.');
                let e = element.substr(ie);
                if (e === extname) {
                    return console.log(element);
                }
            });
        }
    });
}
printListFiles();
/** const fs = require('fs')
    const path = require('path')
    
    const folder = process.argv[2]
    const ext = '.' + process.argv[3]
    
    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    })
*/
