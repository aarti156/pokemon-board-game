# Pokemon Master Trainer

> A re-creation of the Pokemon Master Trainer Board game

> Status: in development

## Team

  - __Product Owner__: Alex Chou (Choumander)
  - __Scrum Master__: Hitesh Lala (Hiteshmonlee)
  - __Development Team Members__: Arthi Palaniappan (Arthicuno), Linda Zou (Zoubat)

## Table of Contents

1. [Game Play](#game-play)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Project Details](#project-details)
      * [Server Design](#server-design)
      * []
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)


## Game Play

1. Roll the dice
1. Check the number of positions in both direction and offer player options:
  * If spot has a pokemon then try to catch pokemon - implemented
  * If other players on spot, can battle or trade - not implemented yet
  * If spot is city, can exchange pokemon in box, battle gym leader or heal - not implemented yet
  * If spot is event pick an event card and do what it says - not impelemented yet


## Requirements

### Server Side
  - Body-parser  1.15.0
  - Chai  3.5.0
  - Chai-http  2.0.1
  - Express  4.13.4
  - Express-routes  0.0.2
  - Express-session  1.13.0
  - Mocha  2.4.5
  - Mongoose  4.4.6
  - Morgan  1.7.0
  - Passport  0.3.2
  - Passport-facebook  2.1.0
  - Q  1.4.1
  - Socket.io  1.4.5
  - Sinon  1.17.3
  - Sinon-chai  2.8.0

### Client Side
  - Bootstrap  3.3.6
  - Jquery  2.2.2
  - Angular-bootstrap  1.2.4
  - Angular  1.5.1
  - Angular-cookies  1.5.2
  - Angular-animate  1.5.1
  - Angular-route  1.5.1
  - Angular-socket-io  0.7.0
  - Socket.io  1.4.5
  - Socket.io-client  1.4.5
  - Angular-audio  1.7.1

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Project Details

#### Server Design

A RESTful API was built using Node and Express.  A table with the endpoints can be found below and a more detailed description of the routes can be found [here](serverRoutes.md).

|  URL | HTTP Verb |  Controller Function |
|:----:|:---------:|:--------------------:|
| /api/games/addGame | POST | gameController.addGame | 
| /api/games/addPokemon | PUT | gameController.playerInit | 
| /api/games/user/movePlayer | PUT | gameController.movePlayer | 
| /api/games/user | PUT | gameController.addUser | 
| /api/games/user/catchPokemon | PUT | gameController.catchPokemon | 
| /api/games/updateturn | PUT | gameController.updateTurn | 
| /api/games/currentPage | PUT | gameController.updateCurrentPage | 
| /api/games/currentPage | GET | gameController.getCurrentPage | 
| /api/games/gameturn | GET | gameController.findTurn | 
| /api/games/playerOptions | GET | gameController.getPlayerOptions | 
| /api/games/availablePokemon | GET | gameController.getAvailablePokemon | 
| /api/games/getGames | GET | gameController.getGames | 
| /api/games/lobbyinit | GET | gameController.lobbyInit | 
| /api/games/remainingStarterPokemon | GET | gameController.getRemainingStarterPokemon | 
| /api/games/boardInit | GET | gameController.boardInit | 
| /api/games/remainingSprites | GET | gameController.getAvailableSprites | 
| /api/games/getusers | GET | gameController.getUsers | 
| /signin/facebook | GET | passport.authenticate('facebook') | 
| /signin/facebook/callback | GET | redirect to /#/home | 


#### Database Design


#### Client Design

Angular was used as the front end framework.

|  URL      | Controller            | Template            | Authenticate |
|:---------:|:---------------------:|:-------------------:|:------------:|
| /home |  homeController | home/home.html | true |
| /board | boardController | board/board.html | true |
| /starter | starterController | starterPokemon/starterPokemon.html | true |
| /lobby | lobbyController | lobby/lobby.html | true |
| /capture | captureController | capturePokemon/capturePokemon.html | true |
| /city | cityController | city/city.html | true |
| /event | eventController | event/event.html | true |
| /winner | winnerController | winner/winner.html | false |
| /signin | authController | auth/signin.html | false |

### Roadmap

View the project roadmap [here](https://github.com/luminescent-recliners/pokemon-board-game/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
