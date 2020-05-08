class CourseOffering {
  constructor(courseName, lObjs, sem, at1, at2, at3, at4m, perPass, compl = 0) {
    this.course = courseName; //self explanatory
    this.lObjList = lObjs; //array of learning objectives for this offering
    this.semester = sem; //the semester this is offered
    this.studLev1 = at1; //array of # of students with score 1
    this.studLev2 = at2; //array of # of students with score 2
    this.studLev3 = at3; //array of # of students with score 3
    this.studLev4m = at4m; //array of # of students with score 4 or 5
    this.percentPassing = perPass; //array of %'s of students who passed
    this.complete = compl; //this is if the data is complete or not (0 is incomplete, 1 is complete)
  }
}

function semesterCode(code) {
  var outputStr = "";
  var yearStr = "";
  var yearEndStr = code[6] + code[7];
  if (code[5] == "0") {
    yearStr += ("19");
  } else if (code[5] == "1") {
    yearStr += ("20");
  }
  yearStr += yearEndStr;
  if (code[8] == "1") {
    outputStr += ("Spring ");
  } else if (code[8] == "4") {
    outputStr += ("Summer ");
  } else if (code[8] == "7") {
    outputStr += ("Fall ");
  } else if (code[8] == "8") {
    outputStr += ("Winter ");
  }
  outputStr += (yearStr);

  return outputStr;
}
