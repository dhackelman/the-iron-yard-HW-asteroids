(function gameSetup() {
  'use strict';

  const asteroidGame = {
    allAsteroids: [],

    keyupObj: document.querySelector('body'),

    main: document.querySelector('main'),
    shipElem: document.querySelector('#ship'),
    ship: {

    },



    asteroidDetector() {
      this.shipElem.addEventListener('asteroidDetected', () => {

      });
    },

    handleKeys() {
      //put key codes + if/else statements
      // * @param  {Event} event   The "keyup" event object with a bunch of data in it
      // @return {void} In other words, no need to return anything

    },

    keyup() {
      this.keyupObj.addEventListener(keyup, handleKeys);
    },

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     */
    gameLoop() {
        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation!
        var move = this.getShipMovement(this.shipsCurrentVelocity, this.shipsCurrentAngle);


        // Move the ship here!


        // Time to check for any collisions (see below)...
        this.checkForCollisions();
    },

    loopHandle() {
      let loop = setInterval(gameLoop, 20);
    },

    checkForCollisions() {

        // Implement me!

    },

    crashHandler() {
      this.main.addEventListener(this.crash, () => {
        console.log('A crash occurred!');

        // What might you need/want to do in here?

      });
    },

    crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        let event = new CustomEvent('crash', { detail: asteroidHit });
        document.querySelector('main').dispatchEvent(event);
    },

    getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    },

    init() {
      this.asteroidDetector();
      this.handleKeys();
      this.gameLoop();
      this.keyup();
      this.checkForCollisions();
      this.crashHandler();
      this.loopHandle();
    }

  };

  asteroidGame.init();

})();
