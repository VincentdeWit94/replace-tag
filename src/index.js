#!/usr/bin/env node
"use strict"
/* ************************************************************************

    Licence : LGPLv3
    Version: 0.0.1
    Authors: Vincent de Wit
    Date: 2017-03-04
    Date of last modification: 2017-03-04
    Description: NodeJS file replacer

************************************************************************ */
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var program = require('commander');

program
  .version('0.0.1')
  .option('-f, --folder <folder>', 'Folder to look at')
  .option('-t, --tag <tag>', 'Tag that need to be replaced')
  .parse(process.argv);

  console.log(program.folder);

if(program.folder){
  fs.readdir(program.folder, (err, files) => {
    files.forEach(file => {

      var file = program.folder + "/" + file;
      console.log('Trying to open file:', file);
      fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        var regex = new RegExp("(?:^|\s):("+program.tag+"):(.*?)(?:\s|$)/gm");
        var parsedPath = path.parse(file);
        if (parsedPath) {
          var result = data.replace(regex, "$1"+parsedPath.name);
          fs.writeFile(file, result, 'utf8', function (err) {
             if (err) return console.log(err);
          });
        }
      });
    });
  });
}
else{
	console.log("Nothing to do!");
}
