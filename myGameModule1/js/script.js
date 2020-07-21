//start game
// put the ships randomly 
//sturt battele
// asking guess of position , compere gues to position
// game is over , evaluation of the result;

 // looping program while ship is up
 //get a coordinates from user
 //comper coopdinats to set of posible values, if data uncorect - error message
 //eles + 1 to the guess
 // if shot is got the ship + 1 to rigthr shot;
 // if right shots equals all ships downe isSunk =true
 //log Ship is sunk
 // log the statistics to the user.

//OVC-model
let view = {
	displayMessage: function(msg){
		let messageArea = document.querySelector('#messageArea');
		messageArea.innerHTML = msg;
	},

	displayHit: function(location){
		let cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location){
		let cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};// model and game logics
    let model ={
        boardSize:7, //its a grid
        numShips: 3,//how many ships
        shipLength:3, //how long from corner to corner
        shipsSunk:0, // how many put down
        ships:[
            ship1 = { locations: [0, 0, 0], hits: ['', '', ''] },
            ship2 = { locations: [0, 0, 0], hits: ['', '', ''] },
            ship3 = { locations: [0, 0, 0], hits: ['', '', ''] }
            ],
        fire:function(guess) { //gets coordinates of shot
                for(let i = 0; i < this.numShips; i++){
                     let ship = this.ships[i];
                     ///location = ship.location;
                    // let index = location.indexOf(guess);
                    let index = ship.locations.indexOf(guess); ///just a short version
                    if(ship.hits[index] === 'hit'){
                        view.displayMessage('Opps, you already hit that location!!')
                    }
                    else if(index >=0){
                        //got shot
                        ship.hits[index] = 'hit';
                        view.displayHit(guess);
                        view.displayMessage('Aliens got HIT!!!');

                        if(this.isSunk(ship)){
                            view.displayMessage('you put down alien - Ship!!!')
                            this.shipsSunk++;
                        }
                        return true;
                    }
                }
                view.displayMiss(guess);
                view.displayMessage("Hahaha you missed!!! Aliens taking your planet")
                return false;
            },
            isSunk: function (ship) {
                for(let i = 0; i<this.shipLength; i++){
                    if(ship.hits[i] !== 'hit'){
                        return false;
                    }
                }
                return true;
            },
            //ships position generation 
            generateShipLocations: function () {
                let locations;
                for( let i = 0; i< this.numShips; i++){
                    do{
                        locations = this.generateShip();
                    }while(this.collision(locations)); 

                    this.ships[i].locations = locations; 

                }
                console.log('ships arr: ' );
                console.log(this.ships );

            },
            //make one ship
            generateShip: function () {
                let direction = Math.floor(Math.random()*2);
                let row, col;
                if(direction === 1){
                    //horizontal position of ship
                    row = Math.floor(Math.random()* this.boardSize);
                    col = Math.floor(Math.random()*(this.boardSize - this.shipLength + 1));

                }else{
                    //vertical position of ship
                    col = Math.floor(Math.random()* this.boardSize);
                    row = Math.floor(Math.random()*(this.boardSize - this.shipLength + 1));

                }
                let newShipLocations  = [];

                for(let i = 0; i < this.shipLength; i++ ){
                    if( direction ===1){
                        // add to arr for horizontsl ship
                        newShipLocations.push(row + ''+ (col + i));
                    }else{
                        //add to arr for vertical ship
                        newShipLocations.push((row + i)+ '' + col);

                    }
                }
                return newShipLocations;
            },
            collision: function (locations) { 
                
                for(let i = 0; i < this.shipLength; i++ ){
                    let ship = model.ships[i];
                    for(let j = 0; j < locations.length; j++){
                        if(ship.locations.indexOf(locations[j]) >= 0){
                            return true;
                        }
                    }

                }
                return false;
            }
    };
    
    var controller ={
        guesses:0,
        guessProcess: function(guess) {
            let location = parcelGuess(guess);
            if(location){
                this.guesses++;
                let hit = model.fire(location);
                if(hit && model.shipsSunk === model.numShips){
                    view.displayMessage('you put down ' +model.numShips + ' Ships in: '+this.guesses + ' shots');
                    // add if for rating later
    
                }
                if(this.guesses >25 ){
                    view.displayMessage('your resulte led humanity to death');
                }
            }
        }
    }
    function parcelGuess(guess) {// package of guesses, by indexes
        let alphabet =['A','B','C','D','E','F',"G"];
        if(guess === null || guess.length !==2){
            alert('invalid gues');
        }else{
           let firstChar = guess.charAt(0);// taking first iteam from string
            let row =alphabet.indexOf(firstChar);
            let column= guess.charAt(1);

            if(isNaN(row) || isNaN(column)){
                alert('invalid gues');
            }else if(row < 0 || row >= model.boardSize || column >= model.boardSize){
                alert('invalid gues');
            }else{
                return row + column;
            }
            
        }
        return null;
    }
function init() {
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
    /// enter by use returen on keybord of my mac
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}
function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    let  guess = guessInput.value;
    controller.guessProcess(guess);
    guessInput.value = '';
}
function handleKeyPress(e) {   // event
    let fireButton = document.getElementById('fireButton');
    if(e.keyCode === 13){
        fireButton.click();
        return false;
    }
}
window.onload = init;
    // controller.guessProcess('B0');
    // controller.guessProcess('C0');
    // controller.guessProcess('D0');

    // controller.guessProcess('B5');
    // controller.guessProcess('C4');
    // controller.guessProcess('F0');

    // controller.guessProcess('D2');
    // controller.guessProcess('D3');
    // controller.guessProcess('D4');

    // controller.guessProcess('G3');
    // controller.guessProcess('G4');
    // controller.guessProcess('G5');


