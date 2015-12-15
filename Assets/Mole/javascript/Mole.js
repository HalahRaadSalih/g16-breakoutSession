/**
 * @constructor
 * A mole object represents a mole in the game.
 *
 * Moles need 3 variables
 *  - this.timeSpentUp: the amount of time a mole spends on the board before being removed
 *
 *  - this.occupiedHole: A DOM element representing the hole that a mole occupies
 *
 *  - this.moleElement: A DOM element that is created when a mole is created. This element
 *                 should be appended to occupiedHole when a mole emerges
 *
 */
// Enable the passage of the 'this' object through the JavaScript timers
// link to the source of this code 
// https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout#The_%27this%27_problem 
var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;
 
window.setTimeout = function (vCallback, nDelay) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};
 
window.setInterval = function (vCallback, nDelay) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

function Mole(minUpTime, maxUpTime){

    // Give this.timeSpentUp a number value between minUpTime and maxUpTime.
    // HINT: use Mole.prototype.getRandomBetween
    this.timeSpentUp = this.getRandomBetween(minUpTime,maxUpTime);

    // this.removed needs a value
    this.removed = false;

    // this.occupiedHole needs a value. it should be a DOM element
    // HINT: use Mole.prototype.selectHole
    this.occupiedHole = this.selectHole();
     // console.log(this.occupiedHole);
    // Create an HTML element to represent the Mole
    // and save it into this.moleElement
    // Don't forget to give our mole a proper css class!
    // Don't forget to call whackThisMole if the mole is clicked!
    
    this.moleElement = $('<div class="mole"></div>');
    $(this.moleElement).on('click', this.whackThisMole);

    // Moles always emerge when they are created.
    this.emerge();
}

/**
 * A mole emerges from it's mole hole!
 * This function must:
 *   mark that hole as occupied using the data-hole-occupied attribute.
 *   add the mole to the DOM. 
 *   use setTimeout() to remove the mole after this.timeSpentUp milliseconds
 *
 */
Mole.prototype.emerge = function() {
    $(this.occupiedHole).attr('data-hole-occupied','true');
    $(this.occupiedHole).append(this.moleElement);
   setTimeout.call(this,this.removeMole, this.timeSpentUp);
}

/**
 * This function should change a mole from the default state, to the
 * whacked state.
 * 
 * It should use the global variable scoreBoard to update the score.
 * This should change the data-score attribute, as well as what the 
 * user can see on the screen.
 *
 * It should cause the foundLove.png heart to appear behind the mole.
 * 
 * Then after one second it should remove the mole from the DOM.
 */
Mole.prototype.whackThisMole = function() {
    var score = parseInt($('#score-board').attr('data-score'));
    if(!this.removed){
           score++; 
    }
    this.removed = true;

    $('#score-board').attr('data-score', (score).toString());
    $('#score-board').html(score);

    var lovedMole = $('<div class="in-love"></div>');

    // $(this).closest('.mole-hole').prepend(lovedMole).append(this.moleElement).slideUp('slow', function(){});
    // debugger;
    console.log(this);
    $(this).removeClass('mole').addClass('bang');
    // console.log($(this.moleElement));
    // $(this).toggleClass('.mole');
    // debugger;

    setTimeout.call(this,this.removeMole, 1000);
}

/**
 * This function should remove the moleElement from the DOM.
 * It should also change the data-hole-occupied attribute back to
 * false so that other moles can occupy the hole. 
 */
Mole.prototype.removeMole = function() {
    $(this.occupiedHole).empty();
    $(this.occupiedHole).attr('data-hole-occupied', 'false');

}
/**
 * Select an element from the DOM. The element must be one of the 
 * mole holes and it must have an attriute data-hole-occupied with
 * a value of false. 
 * 
 * If all those conditions are met, return an HTML element. 
 * If those conditions cannot be met (i.e. every hole is already occupied)
 * then return undefined.
 */
Mole.prototype.selectHole = function() {
    var currentIndex = 9;
    var randomMoleHole = this.getRandomIntBetween(0,currentIndex);

    var holes = $('.mole-hole');
    var selectedHole;



    for(var i = 0; i < currentIndex; i++){

        if($(holes[randomMoleHole]).attr('data-hole-occupied')=== 'false'){
            selectedHole = $('.mole-hole')[randomMoleHole];
        }
    }

    return selectedHole;
   
};

/**
 * This must return a random number in between min and max.
 */
Mole.prototype.getRandomBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * This must return an integer in between min and max
 */
Mole.prototype.getRandomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Enable the passage of the 'this' object through the JavaScript timers
 

