(function(){

  var colOne = getColumns("column0");
  var colTwo = getColumns("column1");
  var colThree = getColumns("column2");
  var colFour = getColumns("column3");
  var colFive = getColumns("column4");
  var colSix = getColumns("column5");
  var colSeven = getColumns("column6");

  var arrColOne = getRows(colOne);
  var arrColTwo = getRows(colTwo);
  var arrColThree = getRows(colThree);
  var arrColFour = getRows(colFour);
  var arrColFive = getRows(colFive);
  var arrColSix = getRows(colSix);
  var arrColSeven = getRows(colSeven);


  var myHTML = "";
  var bannerDiv = document.getElementById("banner");
  var imageDiv = document.getElementById("pic-arrow");
  var imgArrow = "<img id='mypic' src='C:\\Users\\natascha\\dev\\oregano-code\\week3\\connect_four\\arrow.svg' />"
  imageDiv.innerHTML = "";
  var uiMapArray = [];
  var numMoves = 1;
  var btnReset = document.getElementById("btn-reset");
  var turnSign = document.getElementById("info-turn");
  var btnComputer = document.getElementById("btn-computer"); //this is for player mode
  var btnTwoPlayers = document.getElementById("btn-two-players"); //this is for player mode;
  var dialogBox = document.getElementById("dialog-box");
  var boolPlayerMode = false; //per default it is set to two players


  //add click event to player mode
  btnTwoPlayers.addEventListener("click", function() {
      btnComputer.classList.add("hidden");
      btnTwoPlayers.classList.add("hidden");
      dialogBox.classList.add("hidden");
  });

  btnComputer.addEventListener("click", function() {
      btnComputer.classList.add("hidden");
      btnTwoPlayers.classList.add("hidden");
      dialogBox.classList.add("hidden");
      function modeAgaistUnicorn() {
          return boolPlayerMode = true;
      };
      modeAgaistUnicorn();
  });

  //create an array for all columns and rows and set values to 0
  var chipArray = new Array(7);
      for (var i = 0; i < 7; i++) {
          chipArray[i] = new Array(6);
              for (var j = 0; j < 6; j++) {
                chipArray[i][j] = 0;
              }
       }

  function elementsArray() {
    var divsArray = [];
    divsArray = document.getElementsByClassName("col");
          //for loop for children of col -> rows
          for(var i = 0; i < divsArray.length; i++) {
              uiMapArray.push(divsArray[i].children); //push elements structure to uiMapArray
          }
  }
  elementsArray();

  function resetChipArray() {
    for(var i = 0; i < uiMapArray.length; i++) {
      for(var j = 0; j < uiMapArray[i].length; j++) {
        if(uiMapArray[i][j].classList.contains("empty")) {
          chipArray[i][j] = 0;
        } else if(uiMapArray[i][j].classList.contains("player1")) {
          uiMapArray[i][j].classList.remove("player1");
          uiMapArray[i][j].classList.add("empty");
          chipArray[i][j] = 0;
        } else if(uiMapArray[i][j].classList.contains("player2")) {
          uiMapArray[i][j].classList.remove("player2");
          uiMapArray[i][j].classList.add("empty");
          chipArray[i][j] = 0;
        }
      }
    }

    myCol = document.getElementsByClassName("col")
      for(var i = 0; i < myCol.length; i++) {
        myCol[i].classList.remove("player1");
        myCol[i].classList.remove("player2");
        myCol[i].classList.remove("empty");
        myCol[i].classList.add("empty");
      }

    bannerDiv.innerHTML = "<p>Let's play connect four!</p>";
    imageDiv.innerHTML = "";
    numMoves = 1; //set number of moves back to 1 so that player 1 begins as default
    turnSign.innerHTML = "<li>Your turn, " + getPlayer() + "!</li>";
    imageDiv.style.zIndex ="-1";
  }
  resetChipArray();

  btnReset.addEventListener("click", function(){
    resetChipArray();
  });

  function updateChipArray() {
    for(var i = 0; i < uiMapArray.length; i++) {
      for(var j = 0; j < uiMapArray[i].length; j++) {
        if(uiMapArray[i][j].classList.contains("empty")) {
          chipArray[i][j] = 0;
        } else if(uiMapArray[i][j].classList.contains("player1")) {
          chipArray[i][j] = 1;
        } else if(uiMapArray[i][j].classList.contains("player2")) {
          chipArray[i][j] = 10;
        }
      }
    }
   }
  updateChipArray();

  function getPlayer(num) {
    if(num % 2 === 0) {
      return "player2";
    } else {
      return "player1";
    }
  }

  function getNextPlayer(num) {
    if(num % 2 === 0) {
      return "player1";
    } else {
      return "player2";
    }
  }

  placeChip(getPlayer()); //only the first move

  function placeChip(player) {
    function colAddEventListener(arrayCol) {
      for (var i = 0; i < arrayCol.length; i++) {
        arrayCol[i].addEventListener("click", checkChips)
      }
    }

    colAddEventListener(arrColOne);
    colAddEventListener(arrColTwo);
    colAddEventListener(arrColThree);
    colAddEventListener(arrColFour);
    colAddEventListener(arrColFive);
    colAddEventListener(arrColSix);
    colAddEventListener(arrColSeven);

    function checkChips(e) {
      var myPlayer = getPlayer(numMoves);
      var nextPlayer = getNextPlayer(numMoves);
      turnSign.innerHTML = "<li>Your turn, " + myPlayer + "!</li>";
      var colX = e.target.parentElement;
      var arrCurrent = colX.getElementsByClassName("row");
      for (var j = arrCurrent.length - 1; j > -1; j--) {
        if(arrCurrent[j].classList.contains("empty")) {
          arrCurrent[j].classList.remove("empty");
          arrCurrent[j].classList.add(myPlayer);

          if(boolPlayerMode === false) {
            numMoves += 1;
          } else if(boolPlayerMode === true) {
            var moveUnicorn = Math.floor(Math.random()*6);
            var arrUnicorn = getColumns("column"+ moveUnicorn); //array with column element
            var arrRowUnicorn = getRows(arrUnicorn);
            for(var j = arrRowUnicorn.length - 1; j > -1; j--) {
              if(arrRowUnicorn[j].classList.contains("empty")) {
                arrRowUnicorn[j].classList.remove("empty");
                arrRowUnicorn[j].classList.add("player2");
                updateChipArray();
                checkWinner();
                removeEventListener("click", checkChips);
                numMoves = 1;
                break;
              }
            }
          }
          updateChipArray();

          if(boolPlayerMode === false) {
            turnSign.innerHTML = "<li>Your turn, " + nextPlayer + "!</li>";
          } else if(boolPlayerMode === true) {
            turnSign.innerHTML = "<li>Your turn, " + myPlayer + "!</li>";
          }
          checkWinner();
          removeEventListener("click", checkChips);
          break;
        }
      }
    }
  }


  function checkWinner() {
    function checkWinnerRows() {
      var rowFirst = chipArray.map(function(value, index) { //first row from top
        return value[0];
      });
      var rowSecond = chipArray.map(function(value, index) {
        return value[1]
      })
      var rowThird = chipArray.map(function(value, index) {
        return value[2]
      })
      var rowFourth = chipArray.map(function(value, index) {
        return value[3]
      })
      var rowFifth = chipArray.map(function(value, index) {
        return value[4]
      })
      var rowSixth = chipArray.map(function(value, index) {
        return value[5]
      })
      var rowSeventh = chipArray.map(function(value, index) {
        return value[6]
      })
      rowConnectFour(rowFirst);
      rowConnectFour(rowSecond);
      rowConnectFour(rowThird);
      rowConnectFour(rowFourth);
      rowConnectFour(rowFifth);
      rowConnectFour(rowSixth);
      rowConnectFour(rowSeventh);

      function rowConnectFour(arr) {

        var sum1 = arr[0] + arr[1] + arr[2] + arr[3];
        var sum2 = arr[1] + arr[2] + arr[3] + arr[4];
        var sum3 = arr[2] + arr[3] + arr[4] + arr[5];
        var sum4 = arr[3] + arr[4] + arr[5] + arr[6];
        var messageP1 = "<p>Player 1 wins! 4 in a row!</p>";
        var messageP2 = "<p>Awesome Player 2! 4 in a row!</p>"
        if(sum1 === 4 || sum1 === 40) {
          sum1 == (4) ? myHTML = messageP1 : myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.innerHTML = imgArrow;
          imageDiv.style.zIndex ="100";
          document.getElementById("mypic").style.transform = "rotate(90deg)";
          setTimeout(resetChipArray, 4000);
        } else if (sum2 === 4 || sum2 === 40) {
          sum2 == (4) ? myHTML = messageP1 : myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(90deg)";
          setTimeout(resetChipArray, 4000);
        } else if (sum3 === 4 || sum3 === 40) {
          sum3 == (4) ? myHTML = messageP1 : myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(90deg)";
          setTimeout(resetChipArray, 4000);
        } else if (sum4 === 4 || sum4 === 40) {
          sum4 == (4) ? myHTML = messageP1 : myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(90deg)";
          setTimeout(resetChipArray, 4000);
        }
      }
    }
    checkWinnerRows();


    function checkWinnerColumns() {
      function checkColumns(index) {
        var sum1 = chipArray[index][0] + chipArray[index][1] + chipArray[index][2] + chipArray[index][3];
        var sum2 = chipArray[index][1] + chipArray[index][2] + chipArray[index][3] + chipArray[index][4];
        var sum3 = chipArray[index][2] + chipArray[index][3] + chipArray[index][4] + chipArray[index][5];
        var messageP1 = "<p>Winner is Player 1! 4 in the column!</p>";
        var messageP2 = "<p>Player 2 wins! 4 in the column!</p>"
          if(sum1 === 4 || sum1 === 40) {
            sum1 == (4) ? myHTML = messageP1: myHTML = messageP2;
            bannerDiv.innerHTML = myHTML;
            imageDiv.style.zIndex ="100";
            imageDiv.innerHTML = imgArrow;
            setTimeout(resetChipArray, 4000);
          } else if(sum2 === 4 || sum2 === 40) {
            sum2 == (4) ? myHTML = messageP1: myHTML = messageP2;
            bannerDiv.innerHTML = myHTML;
            imageDiv.style.zIndex ="100";
            imageDiv.innerHTML = imgArrow;
            setTimeout(resetChipArray, 4000);
          } else if(sum3 === 4 || sum3 === 40) {
            sum3 == (4) ? myHTML = messageP1: myHTML = messageP2;
            bannerDiv.innerHTML = myHTML;
            imageDiv.style.zIndex ="100";
            imageDiv.innerHTML = imgArrow;
            setTimeout(resetChipArray, 4000);
          }
       }
     checkColumns(0);
     checkColumns(1);
     checkColumns(2);
     checkColumns(3);
     checkColumns(4);
     checkColumns(5);
     checkColumns(6);

   }
  checkWinnerColumns();

  function checkWinnerDiagonalDown() {
    function checkCells(index) {
      var sum1 = chipArray[index][0] + chipArray[index+1][1] + chipArray[index+2][2] + chipArray[index+3][3];
      var sum2 = chipArray[index][1] + chipArray[index+1][2] + chipArray[index+2][3] + chipArray[index+3][4];
      var sum3 = chipArray[index][2] + chipArray[index+1][3] + chipArray[index+2][4] + chipArray[index+3][5];
      var messageP1 = "<p>4 diagonal down! You win Player 1!</p>";
      var messageP2 = "<p>Player 2 wins! 4 diagonal down!</p>";
        if(sum1 === 4 || sum1 === 40) {
          sum1 == (4) ? myHTML = messageP1 : myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(-45deg)";
          setTimeout(resetChipArray, 4000);
        } else if(sum2 === 4 || sum2 === 40) {
          sum2 == (4) ? myHTML = messageP1: myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(-45deg)";
          setTimeout(resetChipArray, 4000);
        } else if(sum3 === 4 || sum3 === 40) {
          sum3 == (4) ? myHTML = messageP1: myHTML = messageP2;
          bannerDiv.innerHTML = myHTML;
          imageDiv.style.zIndex ="100";
          imageDiv.innerHTML = imgArrow;
          document.getElementById("mypic").style.transform = "rotate(-45deg)";
          setTimeout(resetChipArray, 4000);
        }
     }
     checkCells(0);
     checkCells(1);
     checkCells(2);
     checkCells(3);
  }
checkWinnerDiagonalDown();

function checkWinnerDiagonalUp() {
  function checkCells(index) {
    var sum1 = chipArray[index][3] + chipArray[index+1][2] + chipArray[index+2][1] + chipArray[index+3][0];
    var sum2 = chipArray[index][4] + chipArray[index+1][3] + chipArray[index+2][2] + chipArray[index+3][1];
    var sum3 = chipArray[index][5] + chipArray[index+1][4] + chipArray[index+2][3] + chipArray[index+3][2];
    var messageP1 = "<p>Player 1 wins! 4 diagonal up!</p>";
    var messageP2 = "<p>Awesome Player 2! 4 diagonal down!</p>";
      if(sum1 === 4 || sum1 === 40) {
        sum1 == (4) ? myHTML = messageP1 : myHTML = messageP2;
        bannerDiv.innerHTML = myHTML;
        imageDiv.style.zIndex ="100";
        imageDiv.innerHTML = imgArrow;
        document.getElementById("mypic").style.transform = "rotate(45deg)";
        setTimeout(resetChipArray, 4000);
      } else if(sum2 === 4 || sum2 === 40) {
        sum2 == (4) ? myHTML = messageP1 : myHTML = messageP2;
        bannerDiv.innerHTML = myHTML;
        imageDiv.style.zIndex ="100";
        imageDiv.innerHTML = imgArrow;
        document.getElementById("mypic").style.transform = "rotate(45deg)";
        setTimeout(resetChipArray, 4000);
      } else if(sum3 === 4 || sum3 === 40) {
        sum3 == (4) ? myHTML = messageP1: myHTML = messageP2;
        bannerDiv.innerHTML = myHTML;
        imageDiv.style.zIndex ="100";
        imageDiv.innerHTML = imgArrow;
        document.getElementById("mypic").style.transform = "rotate(45deg)";
        setTimeout(resetChipArray, 4000);
      }
    }
    checkCells(0);
    checkCells(1);
    checkCells(2);
    checkCells(3);
  }
  checkWinnerDiagonalUp();

  }

  function getColumns(colID) {
    return document.getElementById(colID);
  }

  function getRows(col) {
    return col.getElementsByClassName("row");
  }

}) ();
