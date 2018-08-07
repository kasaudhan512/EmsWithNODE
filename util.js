var readline = require('readline-sync');
var fs = require('fs');

var validateUser = function(employeeId, pin, callBack){
  var lineNumber = 0;
  fs.readFile('login.txt','utf8',function(err,data){
    if(err){
      console.log(err);
    }
    var flag = false;
    var flag1 = false;
    var validPin = '';
    data.toString().split(/\n/).forEach(function(line){
      lineNumber++;
      //console.log(line);
      var store = '';

      for(var index=0; index<line.length; index++){
        if(line.charAt(index) == '|')
        {
          if(store == employeeId)
          {
            flag = true;
            flag1 = true;
          }
          store = '';

        }
        else if(index == line.length-1)
        {
          store += line.charAt(index);
          if(flag)
          {
            validPin = store;
            flag = false;
            break;
          }
        }
        else
        {
          store += line.charAt(index);
        }

      }

    });
    if(flag1)
    {
      if(pin == validPin)
      {
        console.log('You have successfully logged in');
        callBack(true);
      }
      else {
        console.log("You Entered Wrong pin");
        callBack(false);
      }
    }
    else {
      console.log('No Employee Exist WIth given Employee ID');
      callBack(false);
    }
  });

};

var validateString = function(name){
  var letters = /^[A-Za-z]+$/;
  if(letters.test(name))
  {
    return true;
  }
  return false;
};

var validateInteger = function(number){
  var numbers = /^[0-9]+$/;
  if(numbers.test(number))
  {
    return true;
  }
  return false;
};


module.exports.validateUser = validateUser;
module.exports.validateString = validateString;
module.exports.validateInteger = validateInteger;
