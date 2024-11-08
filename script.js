
//number of circles we have in the game
var numCircles = 6;
//The colour variable should be an array that contains as many random RGB colours as there are circles. 
var colours = [];
//This pickedColour is the RGB color we are trying to guess (string)
var pickedColour;
//This is the default colour of the game. 
let defaultColour="#582c99";

//Grab all appropriate elements from the HTML.
var circles = document.querySelectorAll(".circle");
var colourToGuess = document.getElementById("colour-to-guess");
var resultMessage = document.getElementById("result-message")
var resetButton = document.getElementById('restart');

// var banner 

init();

//The init function should reset the stage and set a new RGB color
function init() {
	//Call the reset function
	reset();
	//Set the text of the colourToGuess element to display the correct RGB color
	colourToGuess.textContent = pickedColour;
	
}


//Setup so that when the reset button is clicked, the reset function gets called 
resetButton.addEventListener("click", reset)


/*Define what should happen when any circle is clicked. 
When a circle is clicked, it should check if the color of a circle  is the same as the color to be guessed. 
If it is, you have won. You should set the display message to "You win", change the text of the reset button to "Play again"
- and set the color of each circle and of the banner to be the color we were guessing. 
If the color you clicked on was incorrect, you should set the color of the circle you just clicked to be the default color 
and change the result text to be "Try again"*/
function clickCircle(event) {
	const clickedColour = event.target.style.backgroundColor;
	console.log("clickedColour: ", clickedColour)
	console.log("pickedColour: ", pickedColour)

	if (clickedColour === pickedColour){
		resultMessage.textContent = "You Win!";
		circles.forEach(circle => {
			circle.style.backgroundColor = pickedColour;
		});
		document.querySelector("h1").style.backgroundColor = pickedColour;
		resetButton.textContent = "Play Again"
	} else {
		event.target.style.backgroundColor = defaultColour;
		resultMessage.textContent = "Try Again!"
	}

}

// Set the color of the banner to the default color, set the text of the reset
// button to "Restart" and the result text to an empty String. 
// Ensure that if a circle is clicked that the clickCircle function is called. 
function reset() {

	colours = genRandomColours(); //generate new random colours array
	pickedColour = chooseColor(colours); //pick a random colour from the array
	colourToGuess.textContent = pickedColour; //display the chosen RGB colour
	resultMessage.textContent = ""; 
	resetButton.textContent = "Restart";
	document.querySelector("h1").style.backgroundColor = defaultColour;

	circles.forEach((circle, index) => {
		circle.style.backgroundColor = colours[index]; //setting circle colours to random colours from array
		circle.addEventListener("click", clickCircle);
	});


}
//Write a function to make a random RGB color. For RGB colours are 
// made up of 3 values from 0 to 256. You should basically generate 3 random 
// numbers and create a string "rgb(0,0,0)" but replace the 0 with random values. 
//return that string
function makeColour() {
	
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`

}


// Write a function that will set new values for the colours array.
// It should contain as many RGB color strings as there are circles
function genRandomColours() {

	newColourArray = [];
	for (let i=0; i<numCircles; i++){
		newColourArray.push(makeColour());
	}
	return newColourArray

}

//return one of the 6 RGB colours you created and stored in colours
// this function should set the colour you are guessing.
function chooseColor(colourArray) {
	return colourArray[Math.floor(Math.random() * colourArray.length)];
}