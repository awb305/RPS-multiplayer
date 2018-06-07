// variables

var dataStructure = {
  players: "",
  turn: 1
};

var player = {
  name: "",
  losses: 0,
  wins: 0
};

var playerNumber = 1;
var database = {};
var turn = 1;


/* ------------------------------------------------------------------------------------
FUNCTOINS
--------------------------------------------------------------------------------------- */

function buttons(playerInfo) {

  var playerName = $("<h3>");
  playerName.text("Ready  " + player.name + "? You're Player One");
  playerInfo.append(playerName);

  var rock = $("<button>", {
    class: "btn btn-primary content-btn",
    id: "rock"
  });
  var paper = $("<button>", {
    class: "btn btn-primary content-btn",
    id: "paper"
  });
  var scissors = $("<button>", {
    class: "btn btn-primary content-btn",
    id: "scissors"
  });

  rock.text("Rock");
  paper.text("Paper");
  scissors.text("Scissors");

  //Call the datbase and get a snapshot with just the template 
  database.ref().once("value", function (snapshot) {
    turn = snapshot.val().turn;

    console.log("turn-2", turn);
    console.log('player number', playerNumber);
    //Player 1 has the following executed  
    if (playerNumber ===1 ) {

      // if the game has just started
      if (playerNumber === 1) {
        var playerRef = database.ref().child("players");
        playerRef.child(playerNumber).set(player);
      }

      //sets HTML RPS choices
      var playerBox = $("#player-1-box");
      playerBox.empty();
      playerName.text(player.name);
      playerBox.append(playerName);
      playerBox.append(rock, paper, scissors);

      //Player 2 has the following executed
    } else {

      // if the game has just started
      

      var start = database.ref('players/2').once('value', function(snapshot){
        var start = snapshot.val()
        console.log('start', !start);
      })

      if (turn < 2) {
        //updates appropriate player
        database.ref().once('value', function (snapshot) {
          var playerRef = database.ref().child("players");
          playerRef.child(playerNumber).set(player);
        });
      }
      //sets HTML RPS choices
      var playerBox = $("#player-2-box");
      playerBox.empty();
      playerName.text(player.name);
      playerBox.append(playerName);
      playerBox.append(rock, paper, scissors);
    }
  });
}

// This is called when both players have input their choice: when turn%2 === 0 [insert line reference]
function checkWinner() {
  database.ref('players/2/choice').on('value', function (opponetChoice) {
    if (playerNumber === 1) {
      var opponetChoice = opponetChoice.val();
      database.ref('players/1/choice').on('value', function (yourChoice) {
        //        console.log("oppnet", opponetChoice, "your Choice", yourChoice.val());
        var yourChoice = yourChoice.val();
        checkWinnerIfs(opponetChoice, yourChoice);
      });
    };
  });
  database.ref('players/1/choice').on('value', function (opponetChoice) {
    if (playerNumber === 2) {
      var opponetChoice = opponetChoice.val();
      database.ref('players/2/choice').on('value', function (yourChoice) {
        //       console.log("oppnet Choice", opponetChoice, "your Choice", yourChoice.val());
        var yourChoice = yourChoice.val();
        checkWinnerIfs(opponetChoice, yourChoice);
      })
    };
  });
};

//subfunction for CheckWinner
function checkWinnerIfs(opponetChoice, yourChoice) {
  if (yourChoice === opponetChoice) {
    console.log('tie');
  } else if (yourChoice === 'rock' && opponetChoice === 'scissors') {
    console.log('you win');
  } else if (yourChoice === 'rock' && opponetChoice === 'scissors') {
    console.log('you lose');
  } else if (yourChoice === 'paper' && opponetChoice === 'rock') {
    console.log('you win');
  } else if (yourChoice === 'paper' && opponetChoice === 'scissors') {
    console.log('you lose');
  } else if (yourChoice === 'sissors' && opponetChoice === 'paper') {
    console.log('you win');
  } else if (yourChoice === 'sissors' && opponetChoice === 'rock') {
    console.log('you lose');
  };
};


function switchTurn() {

  database.ref('turn').once('value', function (snapshot) {
    turn = snapshot.val();
    turn++;
    database.ref('turn').set(turn);
    console.log("switched turn to", turn);
    updateTurnHtml(turn);
  });

}

function updateTurnHtml(turn){

  console.log('turn html', turn);
  if (!(turn % 2 === 0)) {

    console.log("player 1 html");
    var cardOne = $('#player-1-card');
    cardOne.addClass('card-turn');


    var cardTwo = $('#player-2-card');
    cardTwo.addClass('card-not-turn');

  } else {

    console.log("player 2 html");
    var cardOne = $('#player-1-card');
    console.log("cardOne", cardOne);
    cardOne.addClass('card-not-turn');
  
    var cardTwo = $('#player-2-card');
    console.log("cardTwo", cardTwo);
    cardTwo.addClass('card-turn');
  }

}

$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCi1j8xGVQQ_nAYpur_70PkiaftKT3JL3k",
    authDomain: "rps-multiplayer-6c669.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-6c669.firebaseio.com",
    projectId: "rps-multiplayer-6c669",
    storageBucket: "",
    messagingSenderId: "212701670023"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  database = firebase.database();

  // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");



  //will set up the data structure if this is player 1
  database.ref().once("value").then(function (snapshot) {
    if (!(snapshot.child('players').exists())) {
      database.ref().set(dataStructure);
      console.log('added data structure');
    }else{
      playerNumber++;
    }
   

    
  
  }).then(updateTurnHtml(playerNumber));

  /* database.ref().on('value', function(snapshot){

    var whichPlayer =  snapshot.val().turn;

    console.log('whichPlayer', whichPlayer);
    updateTurnHtml(whichPlayer);
  });
 */

  console.log("player number", playerNumber, "turn", turn);

  //player-button click event
  $("body")
    .on("click", "#player-button", function (event) {
      event.preventDefault();

      console.log("1", "player number", playerNumber, "turn", turn);
      //Grab the players name and sav it in obj
      player.name = $("#player-input")
        .val()
        .trim();
      console.log("playerName:", player.name);

      //Update HTML for Player name and prepare buttons
      var playerInfo = $("#player-info");
      playerInfo.empty();

      database.ref('turn').once('value', function (snapshot) {
        turn = snapshot.val();
      });

      // don't know if this is in right place
      updateTurnHtml(turn);

      buttons(playerInfo);




    })
    .on("click", ".content-btn", function (event) {
      event.preventDefault();
      var target = event.target;

      var child = database.ref("players/" + playerNumber);
      child.child("choice").set(target.id);

      switchTurn();
      updateTurnHtml(turn);

      if (playerNumber === 2) {
        checkWinner();
      }



    });
 

    




});