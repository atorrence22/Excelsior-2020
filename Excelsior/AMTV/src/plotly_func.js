function doGraph(lOnumber) {
  var userInput = lOnumber;
  for (var i = 0; i < learnData.length; i++) {
    if (userInput == learnData[i].number) {
      graphLOutcome(learnData[i]);
    } else {
      continue;
    }
  }  
}


function graphLOutcome(learnOutObject) { 
  var list = [];
  var finalList = [];
  var courses = learnOutObject.courses.split(",");
  for (var i = 0; i < offeringArray.length; i++){
    for (var j = 0; j < courses.length; j++){
      if (offeringArray[i].course == courses[j] && offeringArray[i].complete != 1) {
        for (var h = 0; h < offeringArray[i].lObjList.length; h++){
          if (offeringArray[i].lObjList[h][6] == learnOutObject.number) {
            list.push(offeringArray[i]);
            break;
          }
        }
      } else {
        continue;
      }
    }
  }
  for (var k = 0; k < list.length; k++) {
    var tempArr = [list[k]];
    for (var l = 0; l < list.length; l++) {
      if ((l != k) && (list[k].semester == list[l].semester)) {
        tempArr.push(list[l]);
        list.splice(l);
      }
    }
    finalList.push(tempArr);
  }
  
  //here we loop through and create the graphs we need
  for (var m = 0; m < finalList.length; m++) {    
    createGraph(finalList[m], learnOutObject.number, divArr[m]);
  }

}


function createGraph(courseOfferingList, learnOutcome, div) {
  var coursesArr = courseOfferingList;
  var xArr = [];
  var yArr = [];
  var t1Arr = [];
  var t2Arr = [];
  var t3Arr = [];
  var t4Arr = [];

  for (var p = 0; p < coursesArr.length; p++){
    var i;
    for (i = 0; i < coursesArr[p].lObjList.length; i++) {
      if (coursesArr[p].lObjList[i][6] == learnOutcome) {
          xArr.push(coursesArr[p].lObjList[i]);
          yArr.push(i);
      } else {
        continue;
      }
    }
    for (var j = 0; j < yArr.length; j++) {
      t1Arr.push(coursesArr[p].studLev1[yArr[j]]);
      t2Arr.push(coursesArr[p].studLev2[yArr[j]]);
      t3Arr.push(coursesArr[p].studLev3[yArr[j]]);
      t4Arr.push(coursesArr[p].studLev4m[yArr[j]]);
    }
  }

  var trace1 = {
    x: xArr,
    y: t1Arr,
    name: '>= 4',
    type: 'bar',
    marker: {
      color: 'rgb(64,64,64)'
    }
  };

  var trace2 = {
    x: xArr,
    y: t2Arr,
    name: '>= 3',
    type: 'bar',
    marker: {
      color: 'rgb(186,186,186)'
    }
  };

  var trace3 = {
    x: xArr,
    y: t3Arr,
    name: '>= 2',
    type: 'bar',
    marker: {
      color: 'rgb(244,165,130)'
    }
  };

  var trace4 = {
    x: xArr,
    y: t4Arr,
    name: '>= 1',
    type: 'bar',
    marker: {
      color: 'rgb(202,0,32)'
    }
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: 'Distribution of Scores for '.concat(coursesArr[0].semester),
    font:{ family: 'Raleway, sans-serif' },
    barmode: 'stack'
  };

    Plotly.newPlot(div, data, layout);

  }
