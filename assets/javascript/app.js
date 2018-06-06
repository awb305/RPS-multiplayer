// variables


var player = {
    playerName: "",
    choice: "",
    losses: 0,
    wins: 0
  }


// functions

$(document).ready(function() {
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

  /*  // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());
  
        // Log the value of the various properties
        console.log(snapshot.val().name);
        console.log(snapshot.val().age);
        console.log(snapshot.val().phone);
  
        // Change the HTML
        $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);
  
        // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
 */

  $("body")
    .on("click", "#player-button", function(event) {
      event.preventDefault();

      database.ref().on("value", function(snapshot) {
        console.log("snapshot", snapshot);

        console.log(snapshot.val().one);

        
          player.one = $("#player-input")
            .val()
            .trim();
          console.log("playerName:", player.one);

          database.ref().push(player);

      })

    });

     /*      //uses jQuery to create HTML

          var playerInfo = $("#player-info");
          console.log(playerInfo);
          playerInfo.empty();

          var playerName = $("<h3>");
          playerName.text(
            "Ready  " + player.one + "? You're Player One"
          );
          playerInfo.append(playerName);

          // you will have to change this to accomodate for both players
          var playerBox = $("#player-1-box");
          console.log("player-1-box: ", playerBox);
          playerBox.empty();

          playerName.text(player.one);
          playerBox.append(playerName);

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

          playerBox.append(rock, paper, scissors);
       

          // player two 
            
          players.two.playerName = $(".player-input")
            .val()
            .trim();
          console.log("playerName:", players.two.playerName);

          database.ref().set(players);

          var playerInfo = $("#player-info");
          console.log(playerInfo);
          playerInfo.empty();

          var playerName = $("<h3>");
          playerName.text(
            "Ready  " + players.two.playerName + "? You're Player One"
          );
          playerInfo.append(playerName);

          // you will have to change this to accomodate for both players
          var playerBox = $("#player-2-box");
          console.log("player-2-box: ", playerBox);
          playerBox.empty();

          playerName.text(players.two.playerName);
          playerBox.append(playerName);

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

          playerBox.append(rock, paper, scissors);
        });

    }).on("click", ".content-btn", function(event) {
      event.preventDefault();

      var target = event.target;

      console.log("target id: ", target.id);
 /* // player two 
            
          players.two.playerName = $(".player-input")
            .val()
            .trim();
          console.log("playerName:", players.two.playerName);

          database.ref().set(players);

          var playerInfo = $("#player-info");
          console.log(playerInfo);
          playerInfo.empty();

          var playerName = $("<h3>");
          playerName.text(
            "Ready  " + players.two.playerName + "? You're Player One"
          );
          playerInfo.append(playerName);

          // you will have to change this to accomodate for both players
          var playerBox = $("#player-2-box");
          console.log("player-2-box: ", playerBox);
          playerBox.empty();

          playerName.text(players.two.playerName);
          playerBox.append(playerName);

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

          playerBox.append(rock, paper, scissors);
        }); 

    }).on("click", ".content-btn", function(event) {
      event.preventDefault();

      var target = event.target;

      console.log("target id: ", target.id);

      players.one.choice = target.id;

      database.ref().set(players);
    });
});
 */