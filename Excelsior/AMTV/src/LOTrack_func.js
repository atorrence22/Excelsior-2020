// this is where the learning outcome tracking functions are made

function removeLOData(lOnumber) {
  for (var i = 0; i < learnData.length; i++) {

    if (learnData[i]) {
      if (String(learnData[i].number) == String(lOnumber)) {
        learnData.splice(i, 1);
        
        localStorage.setItem("MyLearningOutcomes", JSON.stringify(learnData));
        window.location.reload(false);
        alert("Learning outcome has been removed.")
        break;
      }
    }
  }
}


function removeCourseData(course) {
  var tempData = localStorage.getItem("MyCourses");
  var parsedData = JSON.parse(tempData);
  for (var i = 0; i < parsedData.length; i++) {
    
    if (parsedData[i].courses == course) {
      parsedData.splice(i, 1);

      localStorage.setItem("MyCourses", JSON.stringify(parsedData));
      window.location.reload(false);
      alert("Course has been removed.");
      break;
    }
  }
  
}


function collapseBar(number){
  var location = document.getElementById('locationBox');
  var button = document.createElement('button');

  button.type = 'button';
  button.className = 'collapsible';
  button.textContent = "Learning Outcome " + number;
  location.appendChild(button);
  var divContent = document.createElement('div');
  divContent.className = 'content';
  var divTable = document.createElement('div');
  divTable.className = 'table is-narrow is-hoverable is-fullwidth';
  var tableTag = document.createElement('table');
  tableTag.className = 'table';
  tableTag.id = 'outputTable';
  location.appendChild(divContent);
  divContent.appendChild(divTable);
  divTable.appendChild(tableTag);

  var collBa = button.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
      });

      return tableTag;
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if(key == "course" || key == "semester" ||  key == "passed" || key == "complete"){
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
}

function generateTable(table, data, number) {
  for (let element of data) {
    let row = table.insertRow();
    for (const key in element) {
          if(key == "course" || key == "semester" || key == "passed" || key == "complete"){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
  }
  var graphButton = document.createElement('button');
  var removeLOButton = document.createElement('button');

  removeLOButton.type = 'button';
  removeLOButton.textContent = 'Remove LO';
  removeLOButton.onclick = function(){removeLOData(number)}

  graphButton.type = 'button';
  graphButton.textContent = 'Graph';
  graphButton.onclick = function(){doGraph(number)}

  let lastRow = table.insertRow();
  let lastCell = lastRow.insertCell();
  lastCell.appendChild(graphButton);
  lastCell.appendChild(removeLOButton);
}

function generateTableCourse(table, data, course) {
  for (let element of data) {
    let row = table.insertRow();
    for (const key in element) {
          if(key == "course" || key == "semester" || key == "passed" || key == "complete"){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
  }
  var removeLOButton = document.createElement('button');

  removeLOButton.type = 'button';
  removeLOButton.textContent = 'Remove Course';
  removeLOButton.onclick = function(){removeCourseData(course)}

  let lastRow = table.insertRow();
  let lastCell = lastRow.insertCell();
  lastCell.appendChild(removeLOButton);
}

function learnOutcomeTrack() {
  var opStr;
  var lO;
  var numb;
  var inpCourseList = [];
  var userInput = document.getElementById("LOinput").value;

  for (var i = 0; i < learningOutcomes.length; i++) {
    if (userInput == learningOutcomes[i].number) {
      lO = learningOutcomes[i];
      numb = i;
      break;
    } else {
      continue;
    }
  }

  var frequencyList;
  var tempObj;
  var outputStr = "";
  var lOcourses = lO.courses.split(",");

  for (var i = 0; i < lO.courses.length; i++) { // goes through all the courses from the user created learning outcome
    for (var j = 0; j < courses.length; j++) { // for each of those courses go through the user created courses
      if (lOcourses[i] == courses[j].name) { // if the learning objective course matches one of the user created courses
        frequencyList = courses[j].frequency.split(", "); // make a list of the offerings of the user created course
        for (var k = 0; k < frequencyList.length; k++) { //for each offering in this list
          tempObj = new CourseOffering(courses[j].name)
          tempObj.semester = frequencyList[k];
          inpCourseList.push(tempObj); // create a new user created courseOffering with coursename and a semester
        }
      }
    }
  }

//let table = document.getElementById("outputTable");
for (var l = 0; l < inpCourseList.length; l++) { // goes through all the user created courseOfferings
    for (var m = 0; m < offeringArray.length; m++) { // for each of the offerings in offeringArray
      if (inpCourseList[l].semester == offeringArray[m].semester && inpCourseList[l].course == offeringArray[m].course) { // if sem and coursename matches
        inpCourseList[l] = offeringArray[m]; //replace it in the array with the courseOffering from offeringArray
        inpCourseList[l].complete = 1;
      }
    }
  }

    for (var i = 0; i < inpCourseList.length; i++) {
      var passed;
      var complete;
      var tempTotal = 0;
      var totalData = 0;
      if (inpCourseList[i].percentPassing != undefined) {
        for (var k = 0; k < inpCourseList[i].percentPassing.length; k++) {
          tempTotal += inpCourseList[i].percentPassing[k];
          totalData++;
      }


      var avg = tempTotal / totalData;

    if (avg >= .70) {
      passed = "yes (" + String(Math.round(avg * 100) / 100) + ")";
    } else {
      passed = "no (" + String(Math.round(avg * 100) / 100) + ")";
    }
    inpCourseList[i].passed = passed;
  }

  if (inpCourseList[i].complete == 0) {
        complete = "No";
      } else if (learningOutcomes[i].complete == 1) {
        complete = "Yes";
      }

      if (complete == "Yes") {
        opStr += inpCourseList[i].course + " " + inpCourseList[i].semester + " Passed: " + passed + ", Complete Data: " + complete + "\n";
      } else if (complete == "No") {
        opStr += inpCourseList[i].course + " " + inpCourseList[i].semester + " Incomplete Data" + "\n";
      }

    }
    document.getElementById("trackLO").innerText = opStr;
    return opStr;

}

function generateColl(table, list, number){
  let data = Object.keys(list[0]);
  generateTable(table, list, number);
  generateTableHead(table, data);
}

function showData(number){
  var list  = inputFilesData(number);
  var table  = collapseBar(number);
  generateColl(table,list, number);
}
function showDataAdd(number){
  var list  = inputFilesData(number); //inputFilesData is specifically for learning outcomes not courses
  var table  = collapseBar(number);
  generateColl(table,list,number);
}
