var Games = require('./gameModel.js');
var Q = require('q');
var gameHelperFn = require('./gameHelperFunctions.js');
var gameBoardData = require('../data/gameBoardData.js');

var findGame = Q.nbind(Games.findOne, Games);
var findGames = Q.nbind(Games.find, Games);

module.exports = {
  addPokemon: function(req, res, next) {
    var gameId = req.body.gameId;
    var userId = req.body.userId;
    var pokemon = req.body.pokemon;

    findGame({ gameId: gameId })
      .then(function(game) {
        game.users[userId].party.push(pokemon);
        game.markModified('users');
        game.save();
        res.send(game.users[userId].party);
      })
      .fail(function(error) {
        next(error);
      });
  },


  getPlayerOptions: function(req, res, next) {
    var gameId = req.query.gameId;
    var userPosition = Number(req.query.userPosition);
    var roll = Number(req.query.roll);
    var userId = req.query.userId;
    // var backwardOptionEndPoint = userPosition - roll;
    var forwardOptionEndPoint = (userPosition + roll > 73) ? 73 : userPosition + roll;
    var backwardOptionEndPoint = (userPosition - roll < 1) ? 1 : userPosition - roll;
    var playerOptions = {
      forwardOptions: [],
      backwardOptions: []
    };

    console.log('here is the roll', roll);
    console.log('player is at position', userPosition);
    findGame({ gameId: gameId })
      .then(function(game) {
        for (var i = userPosition + 1; i < forwardOptionEndPoint; i++) {
          var spot = game.gameBoard[i];
          gameHelperFn.checkOption(spot, playerOptions.forwardOptions, i, 'forward');
        }
        var rolledForwardSpot = game.gameBoard[forwardOptionEndPoint];
        playerOptions.forwardOptions.push(gameHelperFn.addOptionDescription(rolledForwardSpot, roll, 'forward'));

        var counter = 0;
        for (var j = userPosition - 1; j > backwardOptionEndPoint; j--) {
          counter ++;
          var spot = game.gameBoard[j];
          gameHelperFn.checkOption(spot, playerOptions.backwardOptions, counter, 'backward');
        }
        var rolledBackwardSpot = game.gameBoard[backwardOptionEndPoint];
        playerOptions.backwardOptions.push(gameHelperFn.addOptionDescription(rolledBackwardSpot, roll, 'backward'));

        console.log('this is the options', playerOptions);
        res.send(playerOptions);
      });
  },

  findName: function (req, res, next) {
    var gameId = req.query.gameId;

    findGame({gameId: gameId})
    .then(function (game) {
      res.send(game.name);
    })
    .fail(function (error) {
      next(error);
    });
  },

  addUser: function (req, res, next) {
    var gameId = req.body.gameId;
    var users = req.body.users;
    console.log("inside addUser function in gameController!", gameId, users);

    findGame({gameId: gameId})
    .then(function (game) {
      console.log("response from database for adduser function ", game);
    })
    .fail(function (error) {
      next(error);
    });
  },

  // quick test function to get board data
  // to play with
  getBoard: function(req, res, next) {
    var gameId = req.query.gameId;
    findGame({ gameId: gameId })
      .then(function(game) {
        res.send(game.gameBoard);
      })
      .fail(function(error) {
        next(error);
      });
  },
  addGame: function(req, res, next) {
    var gameName = req.body.gameName;
    var facebookId = req.body.facebookId;
      var createGame = function() {
        var newGame = new Games({ 
          name: gameName,
          users: {
            facebookId: facebookId, 
            playerIndex: 0,
            badges: [],
            party: [],
            box: [],
            itemCards: [],
            positionOnBoard: 0,
            citiesVisited: [0],
            lastCity: 0
          },
          gameBoard: gameBoardData,
          AvailablePokemon: {},
          AvailableItemCards: [],
          gameCreator: 1,
          gameTurn: 'Alex',
          gameStarted: true
        });
        newGame.save(function(err) {
          if (!err) {
            console.log('CREATEGAME WORKS')
          } else {
            console.error(err);
          }
      });
    };
  createGame();
  },

  getGames: function(req, res, next) {
    findGames({})
      .then(function(games){
        var results = [];
        for(var i = 0; i < games.length; i++) {
          var resObj = {
            gameId: games[i]._id, 
            gameName: games[i].name
          };
          results.push(resObj);
          console.log('get games from database', resObj);
        }
          res.send(results);
      })
      .fail(function(error){
        next(error);  
      });
  }
};
