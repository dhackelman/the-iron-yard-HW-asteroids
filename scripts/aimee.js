(function gameSetup() {
    'use strict';

    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    console.log(viewportWidth);
    console.log(viewportHeight);


    var shipElem = document.getElementById('ship');


    // Create your "ship" object and any other variables you might need..

    const ship = {
        top: 0, //  top key
        left: 0, // left key
        velocity: 0, // velocity key
        angle: 0, // angle key
        elem: shipElem // put shipElem as a element in the obj to have access to its properties
    };

    // define shipsCurrentAngle & shipsCurrentVelocity to ship angle & ship velocity
    let shipsCurrentAngle = ship.angle;
    let shipsCurrentVelocity = ship.velocity;


    var allAsteroids = [];
    shipElem.addEventListener('asteroidDetected', function (event) {
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail
        // What might you need/want to do in here?

    // if asteroid detected = true then the asteroid's HTML element in event.detail will be pushed in the array and this can be used to check for colisions
        if ('asteroidDetected') {
            allAsteroids.push(event.detail); // now how acess to 'aside' & all properties
            console.dir(allAsteroids);
        }
    });

    /**
     * Use this function to handle when a key is pressed. Which key? Use the
     * event.keyCode property to know:
     *
     *   37 = left
     * 38 = up
     * 39 = right
     * 40 = down
     *
     * @param  {Event} event   The "keyup" event object with a bunch of data in it
     * @return {void}          In other words, no need to return anything
     */
    function handleKeys(event) {
        if (event.keyCode == 38) {
            // when up , increment the ship velocity, & set current velocity to ship velocity
            ship.velocity++;
            shipsCurrentVelocity = ship.velocity; //updating curret velocity each time
           console.log(`the current velocity is, ${shipsCurrentVelocity}`);

        } else if (event.keyCode == 40) {
            // when down, if current velocity <= 0 then set the ship velocity at 0 so it can't move
            // else decrement the velocity & set the current velocity to the ship velocity
            if (shipsCurrentVelocity <= 0) {
                ship.velocity = 0;
            } else {
                ship.velocity--;
                shipsCurrentVelocity = ship.velocity; //updating current velocity each time
               console.log(`the current velocity is, ${shipsCurrentVelocity}`);
            }

            // if left, subtract 10 degrees each time from the left & set current angle to ship angle
        } else if (event.keyCode == 37) {
            ship.angle -= 10;
            shipsCurrentAngle = ship.angle; //updating current angle each time
           console.log(`ships current angle is, ${shipsCurrentAngle}`);

           // if right, add 10 degrees each time to the right & set current angle to ship angle
        } else if (event.keyCode == 39) {
            ship.angle += 10;
            shipsCurrentAngle = ship.angle; //updating current angle each time
           console.log(`ships current angle is, ${shipsCurrentAngle}`);
        }
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
        var move = getShipMovement(ship.velocity, ship.angle);


        // Move the ship here!
        // increment move top and move left for smooth moving across screen
        // access to top and left are through getShipMovement which is stored in move
        ship.top += move.top; // ship.top = ship.top + move.top;
        ship.left += move.left; // ship.left = ship.left + move.left;

        // have to turn ship  angle, top, and left into strings to allow styling for the elem
        // set properties for style and place in variables for easy use
        let rotateAngle = 'rotate(' + String(ship.angle) + 'deg)';
        let moveTop = (String(-ship.top) + "px"); // needs to be negative to move in right direction
        let moveLeft = (String(ship.left) + "px");

        // access elem & set properties equal to variables created above
        ship.elem.style.transform = rotateAngle;
        ship.elem.style.top = moveTop;
        ship.elem.style.left = moveLeft;


        //screen wrapping

        // function getTheStyle() {
        //     let computedTop = ship.top;
        //     let computedLeft = ship.left;
        //
        //     computedTop = window.getComputedStyle(ship.elem, null);
        //     computedLeft = window.getComputedStyle(ship.elem, null);
        //
        //     return computedTop, computedLeft;
        // }
        //
        // getTheStyle();

        // console.log(ship.top);
        // console.log(ship.left);









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
    function checkForCollisions() {

        // Implement me!

        allAsteroids.forEach(function(asteroid) {  //array protoype method executes a provided function once for each array element.
        let asteroidRect = asteroid.getBoundingClientRect();
        let shipRect = shipElem.getBoundingClientRect();
        // console.dir(shipRect);
        // console.dir(asteroidRect);
        if (shipRect.top < asteroidRect.bottom &&
            shipRect.bottom > asteroidRect.top &&
            shipRect.right > asteroidRect.left &&
            shipRect.left < asteroidRect.right) {

          ship.velocity = 0; // stops the velocity (resets back to 0)
          crash(asteroid); // crash method called
        }
      });

    }


    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function () {
        console.log('A crash occurred!');

        // What might you need/want to do in here?
        alert ("Game Over!!!!!");
        document.location.reload();

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
