var dao = require('./dao.js')
var util = require('./util.js')
var readline = require('readline-sync');
var fs = require('fs');

var promote = function(employeeId, promotingEmployeeId, upperDesignationId, callBack){
  dao.isEmployeeExist(promotingEmployeeId,function(bool){
    if(bool){
      //callBack('employee Found');
      dao.getDesignationId(employeeId,function(employeeDesignationId){
        dao.getDesignationId(promotingEmployeeId,function(promotingEmployeeDesignationId){
          //console.log(employeeDesignationId +" - "+ promotingEmployeeDesignationId );

          if(employeeDesignationId == 5){
            callBack('You Are a newbie. You can not Promote Any Employee\n');
          }
          else if(employeeDesignationId == 4){
            if(promotingEmployeeDesignationId == 5)
            {
              promoteNewJoiner(promotingEmployeeId, upperDesignationId, function(msg){
                callBack(msg);
              });
            }
            else
            {
              callBack('You are not Authorized to promote a ' + dao.getDesignationName(promotingEmployeeDesignationId) + '\n');
            }
          }
          else if(employeeDesignationId == 3 || employeeDesignationId == 2)
          {
            if(promotingEmployeeDesignationId == 5)
            {
              promoteNewJoiner(promotingEmployeeId, upperDesignationId, function(msg){
                callBack(msg);
              });
            }
            else if(promotingEmployeeDesignationId == 4)
            {
              promoteNewManager(promotingEmployeeId, upperDesignationId, function(msg){
                callBack(msg);
              });
            }
            else
            {
              callBack('You are not Authorized to promote a ' + dao.getDesignationName(promotingEmployeeDesignationId) + '\n');
            }
          }
          else if(employeeDesignationId == 1)
          {
            if(promotingEmployeeDesignationId == 5)
            {
              promoteNewJoiner(promotingEmployeeId, upperDesignationId, function(msg){
                callBack(msg);
              });
            }
            else if(promotingEmployeeDesignationId == 4)
            {
              promoteNewManager(promotingEmployeeId, upperDesignationId, function(msg){
                callBack(msg);
              });
            }
            else if(promotingEmployeeDesignationId == 2)
            {
              callBack(dao.getFirstName(promotingEmployeeId) + ' ' + dao.getLastName(promotingEmployeeId) + ' is HR of The Company. And HR can Not be promoted.\n');
            }
            else if(promotingEmployeeDesignationId == 3)
            {
              callBack(dao.getFirstName(promotingEmployeeId) + ' ' + dao.getLastName(promotingEmployeeId) + ' is Director of The Company. And Director can Not be promoted.\n');
            }
            else
            {
              callBack(dao.getFirstName(promotingEmployeeId) + ' ' + dao.getLastName(promotingEmployeeId) + ' is CEO of The Company. And CEO can Not be promoted.\n');
            }
          }
          //callBack('employee Found');
        });
      });
    }
    else
    {
      callBack('No Employee Exist With Given Employee Id\n');
    }
  });
};


var promoteNewJoiner = function(promotingEmployeeId, upperDesignationId, callBack){
  if(upperDesignationId == 4)
  {
    dao.promoteEmployee(promotingEmployeeId, upperDesignationId, function(){
      callBack('You have Successfully Promoted ' + dao.getFirstName(promotingEmployeeId) + ' ' + dao.getLastName(promotingEmployeeId) + ' ' + 'as Manager\n');
    });
  }
  else
  {
    callBack('You can not promote a new joiner as a ' + dao.getDesignationName(upperDesignationId) + '\n');
  }
};



var promoteNewManager = function(promotingEmployeeId, upperDesignationId, callBack){
  if(upperDesignationId == 3)
  {
    dao.promoteEmployee(promotingEmployeeId, upperDesignationId, function(){
      callBack('You have Successfully Promoted ' + dao.getFirstName(promotingEmployeeId) + ' ' + dao.getLastName(promotingEmployeeId) + ' ' + 'as Director\n');
    });
  }
  else
  {
    callBack('You can not promote a Manager as a ' + dao.getDesignationName(upperDesignationId) + '\n');
  }
}



var displayUnderEmployee = function(employeeId,callBack){
  dao.displayUnderEmployee(employeeId,function(msg){
    callBack(msg);
  });
}



var displayMentor = function(employeeId,callBack) {
  dao.displayMentor(employeeId,function(msg){
    callBack(msg);
  });
};


var addMentor = function(employeeId, mentorId,callBack){
  dao.isEmployeeExist(mentorId,function(bool){
    if(bool)
    {
      dao.getDesignationId(employeeId,function(employeeDesignationId){
        dao.getDesignationId(mentorId, function(mentorDesignationId){
          if((employeeDesignationId == 5 && mentorDesignationId != 5) ||
            (employeeDesignationId == 4 && mentorDesignationId != 4 && mentorDesignationId != 5) ||
            (employeeDesignationId == 3 && mentorDesignationId != 3 && mentorDesignationId != 4 && mentorDesignationId != 5) ||
            (employeeDesignationId == 2 && mentorDesignationId != 2 && mentorDesignationId != 4 && mentorDesignationId != 5) ||
            (employeeDesignationId == 1 && mentorDesignationId != 1 && mentorDesignationId != 2 && mentorDesignationId != 3 && mentorDesignationId != 4 && mentorDesignationId != 5))
          {
            dao.updateMentor(employeeId,mentorId,function(){
              callBack('You have Successfully Added ' + dao.getFirstName(mentorId) + ' ' + dao.getLastName(mentorId) + ' as your mentor\n');
            });

          }
          else
          {
            callBack('you can not add your colleague, Junior or Yourself as your Mentor.\n'+'Employee Id ' + mentorId + ' ' + dao.getFirstName(mentorId) + ' ' + dao.getLastName(mentorId) + ' is the ' + dao.getDesignationName(mentorDesignationId) + ' of the Company\n');
          }

        });

      });
    }
    else
    {
      callBack('No Employee Exist With Given Mentor Id\n');
    }
  });
}


var addUnderEmployee = function(employeeId, underEmployeeId,callBack)
{
  dao.isEmployeeExist(underEmployeeId,function(bool){
    if(bool)
    {
      dao.getDesignationId(employeeId,function(employeeDesignationId){
        dao.getDesignationId(underEmployeeId,function(underEmployeeDesignationId){
          if((employeeDesignationId == 1 && underEmployeeDesignationId != 1) ||
            (employeeDesignationId == 2 && underEmployeeDesignationId != 1 && underEmployeeDesignationId != 2 && underEmployeeDesignationId != 3) ||
            (employeeDesignationId == 3 && underEmployeeDesignationId != 1 && underEmployeeDesignationId != 2 && underEmployeeDesignationId != 3) ||
            (employeeDesignationId == 4 && underEmployeeDesignationId != 1 && underEmployeeDesignationId != 2 && underEmployeeDesignationId != 3 && underEmployeeDesignationId != 4) ||
            (employeeDesignationId == 5 && underEmployeeDesignationId != 1 && underEmployeeDesignationId != 2 && underEmployeeDesignationId != 3 && underEmployeeDesignationId != 4 && underEmployeeDesignationId != 5))
          {
            dao.updateMentor(underEmployeeId, employeeId,function(){
              callBack('You have Successfully Added ' + dao.getFirstName(underEmployeeId) + ' ' + dao.getLastName(underEmployeeId) + ' as Employee Who Works Under You\n');
            });

          }
          else
          {
            callBack('you can not add your colleague, Senior or Yourself as Employee who works Under you.\n'+'Employee Id ' + underEmployeeId + ' ' + dao.getFirstName(underEmployeeId) + ' ' + dao.getLastName(underEmployeeId) + ' is the ' + dao.getDesignationName(underEmployeeDesignationId) + ' of the Company\n');
          }
        });
      });

    }
    else
    {
      callBack('No Employee Exist With Given Employee Id\n');
    }
  });
}


var showDetails = function(employeeId,callBack)
{
  dao.showDetails(employeeId,function(msg){
    callBack(msg);
  })
}


var getUserDetails = function(callBack){
  var correctInput = true;
  var firstName = '';
  var lastName = '';
  var designationId = 0;
  var pin = 0;
  while(correctInput)
  {
    firstName = readline.question('Please Enter your First name\n');
    if(util.validateString(firstName))
    {
      correctInput = false;
    }
    else
    {
      console.log('First Name can not have any spaces, numbers or any other special Character\n');
    }
  }
  correctInput = true;
  while(correctInput)
  {
    lastName = readline.question('Please Enter your Last name\n');
    if(util.validateString(lastName))
    {
      correctInput = false;
    }
    else
    {
      console.log('Last Name can not have any spaces, numbers or any other special Character\n');
    }
  }
  correctInput = true;
  while(correctInput)
  {
    designationId = readline.question('Please Choose Designation\n1 - CEO\n2 - HR\n3 - Director\n4 - Manager\n5 - New Joiner\n');
    if(designationId <= 5 && designationId >=1 )
    {
      correctInput = false;
    }
    else
    {
      console.log('Please Choose Only Given Option\n');
    }
  }
  correctInput = true;
  while(correctInput)
  {
    pin = readline.question('Please Enter Your Pin\n');
    if(!util.validateInteger(pin))
    {
      console.log('pin Contains Only Integer\n');
    }
    else
    {
      if(pin.length == 4)
      {
        callBack(firstName, lastName, designationId, pin );
        correctInput = false;
      }
      else
      {
        console.log('Pin Should Be exact 4 digit length\n');
      }
    }
  }
}



var pushNewEmployee = function(firstName, lastName, designationId, pin, data, callBack){
  var obj = {
    emp_id: data.employee.length + 1,
    first_name: firstName,
    last_name: lastName,
    des_id: designationId,
    pin: pin,
    mentor_id: 0
  }
  data.employee.push(obj);
  callBack(data);
}


var signup = function(callBack){
  getUserDetails(function(firstName, lastName, designationId, pin){
    console.log(firstName + ' ' + lastName + ' ' + designationId + ' ' + pin);
    dao.readjson(function(data){
      pushNewEmployee(firstName, lastName, designationId, pin, data,function(data){
        //console.log(data);
        dao.writejson(data,function(){
          var dataToAppend = (parseInt(data.employee.length) + '|' + pin + '\n');
          fs.appendFileSync('./login.txt', dataToAppend);
          callBack('You Have Successfully Signed Up, Your Auto Generated Id Is : ' + parseInt(data.employee.length));
        });
      });


    });
  });
}


module.exports.promote = promote;
module.exports.displayUnderEmployee = displayUnderEmployee;
module.exports.displayMentor = displayMentor;
module.exports.addMentor = addMentor;
module.exports.addUnderEmployee = addUnderEmployee;
module.exports.showDetails = showDetails;
module.exports.signup = signup;
