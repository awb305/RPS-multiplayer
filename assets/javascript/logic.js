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

playerNumber = 1;

// functions

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
  var database = firebase.database();

  // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");


//push obj to database

  database.ref().on("value", function (snapshot) {
    //will set up the data structure if this is player 1
    if (!snapshot.child('players').exists()) {
      database.ref().set(dataStructure);
    }
  })

//player-button click event
  $("body")
    .on("click", "#player-button", function (event) {
      event.preventDefault();

    //Grab the players name and sav it in obj
      player.name = $("#player-input")
        .val()
        .trim();
      console.log("playerName:", player.name);

    //Update HTML for Player name and prepare buttons
      var playerInfo = $("#player-info");
      playerInfo.empty();

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

        var turn = snapshot.val().turn;
        
      //Player 1 has the following executed  
        if (!(turn%2 === 0)) {
          var playerRef = database.ref().child("players");
          playerRef.child(playerNumber).set(player);

        //sets HTML RPS choices
          var playerBox = $("#player-1-box");
          playerBox.empty();
          playerName.text(player.name);
          playerBox.append(playerName);
          playerBox.append(rock, paper, scissors);

        //updates turn and Player number
          database.ref().once('value', function (snapshot) {
            turn++;
            database.ref('turn').set(turn);
            playerNumber++;
          });

      //Player 2 has the following executed
        } else {
          //updates appropriate player
          database.ref().once('value', function (snapshot) {
            var turnRef = snapshot.val().turn;
            var playerRef = database.ref().child("players");  
            playerRef.child(turnRef).set(player);
          });
          //changes appropriate HTML
          var playerBox = $("#player-2-box");
          console.log("player-2-box: ", playerBox);
          playerBox.empty();
          playerName.text(player.name);
          playerBox.append(playerName);
          playerBox.append(rock, paper, scissors);
        }
      });
    })
    .on("click", ".content-btn", function (event) {
      event.preventDefault();
      var target = event.target;
      var child = database.ref("players/" + playerNumber);
      child.child("choice").set(target.id);
    });
});

