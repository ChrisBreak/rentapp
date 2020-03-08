let genBtn, genList, under13, zeros, theRest, genListDiv;
let mainCount = {
  '1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0,
  '11':0, '12':0, '13':0, '14':0, '15':0, '16':0, '17':0, '18':0, '19':0, '20':0,
  '21':0, '22':0, '23':0, '24':0, '25':0, '26':0, '27':0, '28':0, '29':0, '30':0,
  '31':0, '32':0, '33':0, '34':0, '35':0, '36':0, '37':0, '38':0, '39':0, '40':0,
  '41':0, '42':0, '43':0, '44':0, '45':0, '46':0, '47':0, '48':0, '49':0, '50':0
}
let mainFreq = JSON.parse(JSON.stringify(mainCount)); //this makes a deep copy

window.onload = function() {

  genBtn = document.getElementById('genButton');
  genListDiv = document.getElementById('genList');
  //checkBtn = document.getElementById('checkButton');

  maxHistory.reverse();
  //console.log(maxHistory);

  //calculate number overdue status
  for (var i = 0; i < maxHistory.length; i++) {
    //main numbers
    var seq = maxHistory[i].main.split(" ");
    for (var el in mainCount) {
      mainCount[el]++;
    }
    for (var j=0; j < seq.length; j++) {
      mainCount[seq[j]] = 0;
      mainFreq[seq[j]]++;
    }
  }
  //print number overdue status
  console.log("main number overdue status: ");
  console.log(mainCount);
  console.log("main numbers frequencies: ");
  console.log(mainFreq);

  zeros = [];
  under13 = [];
  theRest = [];

  for (var el in mainCount) {
    if (mainCount[el] === 0) zeros.push(el);
    else if (mainCount[el] < 13) under13.push(el);
    else theRest.push(el);
  }

  console.log("numbers with overdue of 0: ");
  console.log(zeros);
  console.log(("numbers with overdue of under 13: "));
  console.log(under13);
  console.log("numbers with overdue of 13 and above: ");
  console.log(theRest);


  genBtn.onclick = function() {
    genList = [];

    while (genList.length < 40) {
      //console.log("genList length: " + genList.length);
      var newSeq = [];
      //add number with overdue status of 0
      newSeq.push(+zeros[Math.floor(Math.random() * zeros.length)])

      //add number with overdue status of 13 and above
      newSeq.push(+theRest[Math.floor(Math.random() * theRest.length)])

      //add numbers with overdue status under 13
      while (newSeq.length < 7) {
        var newNum = +under13[Math.floor(Math.random() * under13.length)]
        if (!newSeq.includes(newNum)) newSeq.push(newNum);
      }

      //check odd-even ratio in newSeq
      var even = 0;
      var goodRatio = false;
      for (var numVal in newSeq) {
        //console.log(newSeq[numVal]);
        if (newSeq[numVal]%2 === 0) even++;
      }
      //console.log(even);
      if ((even > 2) && (even < 5)) goodRatio = true;

      //check consecutive numbers in newSeq
      var noCons = true;
      if ((newSeq[3] - newSeq[2] === 1) && (newSeq[2] - newSeq[1] === 1) && (newSeq[1] - newSeq[0] === 1)) noCons = false;
      else if ((newSeq[4] - newSeq[3] === 1) && (newSeq[3] - newSeq[2] === 1) && (newSeq[2] - newSeq[1] === 1)) noCons = false;
      else if ((newSeq[5] - newSeq[4] === 1) && (newSeq[4] - newSeq[3] === 1) && (newSeq[3] - newSeq[2] === 1)) noCons = false;
      else if ((newSeq[6] - newSeq[5] === 1) && (newSeq[5] - newSeq[4] === 1) && (newSeq[4] - newSeq[3] === 1)) noCons = false;

      newSeq.sort(function(a, b){return a-b});

      //check if more than 3 numbers in newSeq have shown up before
      var goodRep = true;
      for (var i = 0; i < maxHistory.length; i++) {
        var oldSeq = maxHistory[i].main.split(" ");
        var repCount = 0;
        for (var j=0; j < oldSeq.length; j++) {
          var seqNum = +oldSeq[j];
          if (newSeq.includes(seqNum)) repCount++;
        }
        if (repCount > 3) {
          goodRep = false;
          break;
        }
      }

      //add newSeq to genList
      if (goodRatio && noCons && goodRep && !genList.includes(newSeq)) genList.push(newSeq);
    }
    console.log("number sequences generated: ");
    console.log(genList);

    //display generated list
    genListDiv.innerHTML = "";
    for (var el in genList) {
      var seq = genList[el];

      for (var num in seq) {
        genListDiv.innerHTML += (" " + seq[num]);
      }
      genListDiv.innerHTML += '<br>';
    }
  }

  /*
  checkBtn.onclick = function() {
    for (var a = 1; a < 51; a++) {
      console.log(a);
      for (var b = a+1; b < 51; b++) {
        for (var c = b+1; c < 51; c++) {
          for (var d = c+1; d < 51; d++) {
            for (var e = d+1; e < 51; e++) {
              for (var f = e+1; f < 51; f++) {

                  for (var i = 0; i < maxHistory.length; i++) {
                    //main numbers
                    var seq = maxHistory[i].main.split(" ");
                    var count = 0;
                    for (var j=0; j < seq.length; j++) {
                      var num = +seq[j];
                      if ((num === a) || (num === b) || (num === c) || (num === d) || (num === e) || (num === f)) count++;
                    }
                    if (count > 2) break;
                    else if (i === (maxHistory.length-1)) console.log("seq not shown before: " + a + " " + b + " " + c + " " + d + " " + e + " " + f);
                  }

              }
            }
          }
        }
      }
    }
  } */
};
