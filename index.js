function createEmployeeRecord(employeeData) {
  if (Array.isArray(employeeData) && employeeData.length >= 4) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  } else {
    throw new Error('Invalid employee data');
  }
}

function createEmployeeRecords(employeeDataArray) {
  return employeeDataArray.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timeStamp) {
  if (Array.isArray(employee.timeInEvents) && typeof timeStamp === 'string' && timeStamp.trim() !== '') {
    const [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employee;
  } else {
    throw new Error('Invalid timeInEvent data');
  }
}

function createTimeOutEvent(employee, timeStamp) {
  if (Array.isArray(employee.timeOutEvents) && typeof timeStamp === 'string' && timeStamp.trim() !== '') {
    const [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employee;
  } else {
    throw new Error('Invalid timeOutEvent data');
  }
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

  if (timeInEvent && timeOutEvent) {
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  } else {
    throw new Error('Invalid date or missing events');
  }
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const wages = hoursWorked * employee.payPerHour;
  return Math.round(wages * 100) / 100; // Round to two decimal places
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// export {
//   createEmployeeRecord,
//   createEmployeeRecords,
//   createTimeInEvent,
//   createTimeOutEvent,
//   hoursWorkedOnDate,
//   wagesEarnedOnDate,
//   allWagesFor,
//   findEmployeeByFirstName,
//   calculatePayroll,
// };
