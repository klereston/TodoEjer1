"use strict";
/**
 * 1. Export a single function that takes exactly the arguments described.
   2. Call the callback exactly once with an error or some data as described.
   3. Don't change anything else, like global variables or stdout.
   4. Handle all the errors that may occur and pass them to the callback.
 */
/*  const fs = require('fs')
  const path = require('path')
  
  module.exports = function (dir, filterStr, callback) {
    fs.readdir(dir, function (err, list) {
      if (err) {
        return callback(err)
      }
  
      list = list.filter(function (file) {
        return path.extname(file) === '.' + filterStr
      })
  
      callback(null, list)
    })
  }
*/
module.exports = function filteredLista(folder, ext, callback) {
    const fs = require('fs');
    const path = require('path');
    fs.readdir(folder, function (err, files) {
        if (err) {
            return callback(err, [""]);
        }
        let data = [];
        data = files.filter((file) => {
            return path.extname(file) === '.' + ext;
        });
        callback("", data);
    });
};
