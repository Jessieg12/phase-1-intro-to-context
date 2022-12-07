// Your code here

const createEmployeeRecord = (employee) => {
  let empObj = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return empObj
}

const createEmployeeRecords = (eRecordArrays) => {
  return eRecordArrays.map(records => createEmployeeRecord(records))
}

const createTimeInEvent = (empObj, timeIn) => {
  let split = timeIn.split(' ')
  let dateSplit = split[0]
  let timeSplit = split[1]
  empObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeSplit),
    date: dateSplit
  })
  return empObj
  
}

const createTimeOutEvent = (empObj, timeOut) => {
  let split = timeOut.split(' ')
  let dateSplit = split[0]
  let timeSplit = split[1]
  empObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeSplit),
    date: dateSplit
  })
  return empObj
  
}

const hoursWorkedOnDate = (empObj, date) => {
  let data = date
  let timeIn = empObj.timeInEvents.find(function (e){
    return e.date === data
  })
  let timeOut = empObj.timeOutEvents.find(function (e){
    return e.date === data
  })
  let accumHours = (timeOut.hour - timeIn.hour) /100
  return accumHours
}

const wagesEarnedOnDate = (empObj, date) => {
  let payOwed = hoursWorkedOnDate(empObj, date)
  return payOwed * empObj.payPerHour
}

const allWagesFor = (empObj) => {
  let dates = empObj.timeInEvents.map(function(e) {
    return e.date
  })
  let payOwed = dates.reduce(function(e, date) {
    return e + wagesEarnedOnDate(empObj, date)
  },0 )
  return payOwed
}

const calculatePayroll = (empObjs) => {
  let payroll = empObjs.reduce(function(e, empObj){
    return e + allWagesFor(empObj)
  }, 0)
  return payroll
}