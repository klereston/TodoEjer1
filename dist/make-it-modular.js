"use strict";
const filteredLista = require('./mymodule');
const folder = process.argv[2];
//const ext = '.' + process.argv[3]
//const dir = process.argv[2]
const filterStr = process.argv[3];
/*filterFn(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})*/
function myDisplayer(err, data) {
    if (err) {
        return console.error('There was an error:', err);
    }
    for (let index = 0; index < data.length; index++) {
        console.log(data[index]);
    }
    //console.log(data)
}
filteredLista(folder, filterStr, myDisplayer);
