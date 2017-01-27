(function gameSetup() {
    'use strict';

    var shipElem = document.getElementById('ship');

    // Create your "ship" object and any other variables you might need...
    shipElem = {
      ship: document.getElementById('ship'),
      top: 0,
      left: 0,
      shipsCurrentVelocity: 0,
      shipsCurrentAngle: 0,
      i: 0,

    };


    var allAsteroids = [];
    shipElem.ship.addEventListener('asteroidDetected', function (event) {
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail

        // What might you need/want to do in here?
        handleKeys(event);
    });


    //  * @param  {Event} event   The "keyup" event object with a bunch of data in it
    //  * @return {void}          In other words, no need to return anything
    //  */
    function handleKeys(event) {

          if (event.keyCode === 37) {
            shipElem.shipsCurrentAngle--;
            console.log(shipElem.shipsCurrentAngle);
          } else if (event.keyCode === 38) {
            shipElem.shipsCurrentVelocity--;
            console.log(shipElem.shipsCurrentVelocity);
          } else if (event.keyCode === 39) {
            shipElem.shipsCurrentAngle++;
            console.log(shipElem.shipsCurrentAngle);
          } else if (event.keyCode === 40) {
            shipElem.shipsCurrentVelocity++;
            console.log(shipElem.shipsCurrentVelocity);
          }


        // Implement me!

    }
    document.querySelector('body').addEventListener('keydown', handleKeys);

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     *
     * @return {void}
     */
    function gameLoop() {
        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation!
        var move = getShipMovement(shipElem.shipsCurrentVelocity, shipElem.shipsCurrentAngle);


        // Move the ship here!
        shipElem.left = move.left;
        shipElem.top = move.top;

        console.log(shipElem);
        shipElem.ship.style.top = `${shipElem.top}%`;
        shipElem.ship.style.left = `${shipElem.left}%`;

        // Time to check for any collisions (see below)...
        checkForCollisions();
    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    }

    function checkForCollisions() {
        var shipRect = shipElem.ship.getBoundingClientRect();
        console.log(shipRect);
        console.log(asteroidLocations);
        // if (/*collision exists*/) {
        //   crash(this.void);
        // }
    }


    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function () {
        console.log('A crash occurred!');

        // What might you need/want to do in here?

    });



    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

     var loopHandle = setInterval(gameLoop, 20);

     /**
      * Executes the code required when a crash has occurred. You should call
      * this function when a collision has been detected with the asteroid that
      * was hit as the only argument.
      *
      * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
      * @return {void}
      */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', { detail: asteroidHit });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
