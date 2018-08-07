var readline = require('readline-sync');
var fs = require('fs');
var util = require('./util.js');
var service = require('./service.js');


var mainmenu = function(employeeId,callBack){
  var choice = readline.question('Choose Your Option\n1- Promote Employee\n2- Display Under Employee\n3- Display your mentor\n4- Add Your Mentor\n5- Add Employee Under you.\n6 - Show Your Details\n7 - Log out\n');
  choice = parseInt(choice);
  //console.log('choice--' + choice);
  switch(choice){
    case 1:
      var promotingEmployeeId = readline.question('Please Enter Employee Id whom You want to promote\n');
      var upperDesignationId = 6;
      while(upperDesignationId > 5 || upperDesignationId <= 0 )
      {
        console.log('Please Choose What position you want to promote\n');
        upperDesignationId = readline.question('1 - CEO\n2 - HR\n3 - Director\n4 - Manager\n5- New Joiner\n');
      }
      service.promote(employeeId,promotingEmployeeId,upperDesignationId,function(msg){
        console.log(msg);
        callBack();
      });

      break;
    case 2:
      service.displayUnderEmployee(employeeId,function(msg){
        console.log(msg);
        callBack();
      });
      break;
    case 3:
      service.displayMentor(employeeId,function(msg){
        console.log(msg);
        callBack();
      });

      break;
    case 4:
      var mentorId = readline.question("Please Enter Employee Id Whom you want to add Your Mentor\n");
      service.addMentor(employeeId, mentorId, function(msg){
        console.log(msg);
        callBack();
      });
      break;
    case 5:
      var underEmployeeId = readline.question("Please Enter Employee Id Whom Work Under you\n");
      service.addUnderEmployee(employeeId, underEmployeeId, function(msg){
        console.log(msg);
        callBack();
      });
      break;
    case 6:
      service.showDetails(employeeId,function(msg){
        console.log(msg);
        callBack();
      });
      break;
    case 7:
      console.log("successfully Logged out\n");
      break;
    default:
      console.log("Wrong choice..\n");
  }

}


var signin = function(callBack){
  var employeeId = readline.question('Please Enter Your Employee ID\n');
  var pin = readline.question('Please Enter Your Pin\n');
  util.validateUser(employeeId, pin,function(bool){
    if(bool)
    {
      console.log('thanks');
      mainmenu(employeeId,function(){
        callBack('Done');
      });
    }

  });

}


var option = readline.question('1 - SignUp\n2 - SignIn\n3 - Exit\n');
option = parseInt(option);
switch(option){
  case 1:
    service.signup(function(msg){
      console.log(msg);
    });
    break;
  case 2:
    signin(function(msg){
      console.log(msg);
    });
    break;
  case 3:
    correctInput = false;
    break;
  default:
    console.log('Please Choose Correct Option\n');
}
