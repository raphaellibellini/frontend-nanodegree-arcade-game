const H_MOVE = 101;
const V_MOVE = 83;
const H_INIT = 202;
const V_INIT = 400;

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.width = 75;
        this.height = 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
    // When the enemy leaves the board, return to the beginning of the screen.
        if(this.x > 500) {
            this.x = 0;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // The following code is taken from 
    // MDN: https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
    collision(player) {
        if (this.x < player.x + player.width &&
           this.x + this.width > player.x &&
           this.y < player.y + player.height &&
           this.y + this.height > player.y) {
            // collision detected!
            player.x = H_INIT;
            player.y = V_INIT;
        }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.width = 75;
        this.height = 50;
    }
    
    update(dt, enemy) {

    }

    handleInput(move) {
        if(move === 'right') {
            if(this.x < 404) {
                this.x += H_MOVE;
                console.log(`${this.x}, ${this.y}`);
            }
        }
        else if(move === 'left'){
            if(this.x > 0) {
                this.x -= H_MOVE;
                console.log(`${this.x}, ${this.y}`);
            }
        }
        else if(move === 'up') {
            if(this.y > 58) {
                this.y -= V_MOVE;
                console.log(`${this.x}, ${this.y}`);
            }
        }
        else if(move === 'down') {
            if(this.y < 386) {
                this.y += V_MOVE;
                console.log(`${this.x}, ${this.y}`);
            }
        } 
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
new Enemy(0, 68, 150),
new Enemy(0, 234, 100)
];
// Place the player object in a variable called player
let player = new Player(H_INIT, V_INIT);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
