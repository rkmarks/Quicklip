var fs = require('fs');

module.exports = function(qk){
  var schema = [{
    regex: /regexp/,                    // the regex to run against the string to match the associated things
    match: 'string',                    // the matched string - to be sent back with object
    things: [{                          // the array of things
      name: 'string',                   // a user provided name for the thing - to show when selecting
      url: 'www.google.com?q={replace}' // the url with a special {flagged} area for inputting the string.
    }]
  }];
  var toolPath = global.root+'/DynSearch.json';

  if(!fs.existsSync(toolPath)){
    fs.writeFileSync(toolPath,'{}');
  };

  var tools = require(toolPath);


  this.scanString = function(str){
    // take in a string: the recent clip - and scan for various tool matches
    var matched = [];
    for(var i in tools){
      var check = str.match(tools[i].regex);
      if(check) {
        tools[i].match = check[1];
        matched.push(tools[i]);
        check = null;
      }
    }
    return matched;
  };



};