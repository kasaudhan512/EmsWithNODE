var readline = require('readline-sync');
var fs = require('fs');
var jsonObj = require('./employee.json');


var readjson = function(callBack){
  fs.readFile('employee.json','utf8',function(err,data){
    callBack(JSON.parse(data));
  });
};

var getTotalSize = function(callBack){
  readjson(function(data){
    callBack(data.employee.length);
  });
}

var writejson = function(data,callBack){
  fs.writeFile("./employee.json", JSON.stringify(data,undefined,6), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    callBack();
});
}

var isEmployeeExist = function(employeeId, callBack){
  //var jsonObj = require('./employee.json');
  readjson(function(data){
    //console.log(data);
    var ans = false;
    for(index in data.employee)
    {
      //console.log(employeeId + ' ' + data.employee[index].emp_id);
      if(data.employee[index].emp_id == employeeId)
      {
        ans = true;
        break;
      }
      else {
        ans = false;
      }
    }
    callBack(ans);
  });
}

var getDesignationName = function(designationId){
  if(designationId == 1)
  {
    return 'CEO';
  }
  else if(designationId == 2)
  {
    return 'HR';
  }
  else if(designationId == 3)
  {
    return 'Director';
  }
  else if(designationId == 4)
  {
    return 'Manager';
  }
  else if(designationId == 5)
  {
    return 'New Joiner';
  }
}

var getFirstName = function(employeeId){
  var jsonObj = require('./employee.json');
  for(index in jsonObj.employee){
    if(jsonObj.employee[index].emp_id == employeeId)
    {
      return jsonObj.employee[index].first_name;
    }
  }
}

var getLastName = function(employeeId){
  var jsonObj = require('./employee.json');
  for(index in jsonObj.employee){
    if(jsonObj.employee[index].emp_id == employeeId)
    {
      return jsonObj.employee[index].last_name;
    }
  }
}

var getDesignationId = function(employeeId, callBack){
  readjson(function(data){
    for(index in data.employee)
    {
      //console.log(employeeId + ' ' + data.employee[index].emp_id);
      if(data.employee[index].emp_id == employeeId)
      {
        callBack(data.employee[index].des_id);
        break;
      }
    }
  });
  //callBack(1);
}

var setDesignationId = function(promotingEmployeeId, upperDesignationId, data, callBack)
{
  for(index in data.employee)
  {
    if(data.employee[index].emp_id == promotingEmployeeId)
    {
      data.employee[index].des_id = upperDesignationId;
      callBack(data);
      break;
    }
  }
}

var setMentorId = function(employeeId, mentorId, data, callBack)
{
  for(index in data.employee)
  {
    if(data.employee[index].emp_id == employeeId)
    {
      data.employee[index].mentor_id = mentorId;
      callBack(data);
      break;
    }
  }
}

var promoteEmployee = function(promotingEmployeeId, upperDesignationId, callBack)
{
  readjson(function(data){
    setDesignationId(promotingEmployeeId, upperDesignationId, data, function(data){
      writejson(data,function(){
        callBack();
      });
    });
  });
}

var collectUnderEmployee = function(employeeId, data, callBack){
  var employees = 'UnsderEmployeeId FirstName LastName Designation\n';
  for(index in data.employee)
  {
    if(data.employee[index].mentor_id == employeeId)
    {
      employees += (data.employee[index].emp_id + ' ' + data.employee[index].first_name + ' '  + data.employee[index].last_name + ' ' + getDesignationName(data.employee[index].des_id) + '\n');
    }
  }
  callBack(employees);
}

var collectMentorEmployee = function(employeeId, data, callBack){
  var employees = 'MentorId FirstName LastName Designation\n';
  for(index in data.employee)
  {
    if(data.employee[index].emp_id == employeeId)
    {
      if(data.employee[index].mentor_id != 0)
      {
        //+ ' ' + getDesignationName(getDesignationId(data.employee[index].mentor_id))
        //+ ' '  + getLastName(data.employee[index].mentor_id)
        employees += (data.employee[index].mentor_id + ' ' + getFirstName(data.employee[index].mentor_id)   + '\n');
      }
      else
      {
        employees = "Sorry you don't have any Mentor Yet\n";
      }
    }
  }
  callBack(employees);
}

var collectUserDetails = function(employeeId, data, callBack){
  var employees = 'EmployeeId FirstName LastName Designation MentorId\n';
  for(index in data.employee)
  {
    if(data.employee[index].emp_id == employeeId)
    {
      employees += (data.employee[index].emp_id + ' ' + data.employee[index].first_name + ' '  + data.employee[index].last_name + ' ' + getDesignationName(data.employee[index].des_id) + ' ' + data.employee[index].mentor_id + '\n');
    }
  }
  callBack(employees);
}

var displayUnderEmployee = function(employeeId, callBack){
  readjson(function(data){
    collectUnderEmployee(employeeId, data,function(employees){
      callBack(employees);
    });
  });
}

var displayMentor = function(employeeId, callBack){
  readjson(function(data){
    collectMentorEmployee(employeeId, data,function(employees){
      callBack(employees);
    });
  });
}

var showDetails = function(employeeId, callBack){
  readjson(function(data){
    collectUserDetails(employeeId, data, function(employees){
      callBack(employees);
    });
  });
}

var updateMentor = function(employeeId,mentorId, callBack){
  readjson(function(data){
    setMentorId(employeeId, mentorId, data, function(data){
      writejson(data,function(){
        callBack();
      });
    });
  });
}

module.exports.isEmployeeExist = isEmployeeExist;
module.exports.getDesignationName = getDesignationName;
module.exports.getDesignationId = getDesignationId;
module.exports.getLastName = getLastName;
module.exports.getFirstName = getFirstName;
module.exports.promoteEmployee = promoteEmployee;
module.exports.displayUnderEmployee = displayUnderEmployee;
module.exports.displayMentor = displayMentor;
module.exports.updateMentor = updateMentor;
module.exports.showDetails = showDetails;
module.exports.getTotalSize = getTotalSize;
module.exports.readjson = readjson;
module.exports.writejson = writejson;
