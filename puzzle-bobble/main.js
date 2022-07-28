import $ from "jquery";

//* VARIABLES
const $rows = $(".row");

//* FUNCTIONS
//! Creating a function to select a color from array of chosen colors
const colors = ["red", "yellow", "blue", "green"];

const randomColor = (arr) => {
  const ranNum = Math.floor(Math.random() * arr.length);
  return arr[ranNum];
};

//! Creating a function to generate a bubble
const addBubble = () =>  {
  const $bubble = $("<div>").addClass("bubble");
  return $bubble;
};

//! Creating a bubble class
// class Bubble {
//   constructor(row, col, coords, color) {
//     this.row = row;
//     this.col = col;
//     this.coords = coords;
//     this.color = color;
//   }
//   getColor() {
//     return this.color
//   }
// };

//! Creating a function to add in a bubble in an even row
// const addEvenRow = (i, j) => { // Function takes row & col number as a parameter
//   const $bubble = addBubble();

//   const $bubbleColor = randomColor(colors);
//   $bubble.addClass($bubbleColor);

//   $bubble.css("left", (j*50)); // Distance from the left of the container
//   $bubble.css("top", (i*50)); // Distance from the top of the container

//   $bubble.attr("data-row", i); // Setting row data
//   $bubble.attr("data-col", j); // Setting column data

//   // bubbleGrid.push(new Bubble(i, j, [(i*50), (j*50)], $bubbleColor)); // Appending bubble data to bubble grid array

//   bubbleGrid.push([i, j]);

//   $(".row").eq(i).append($bubble); // Adding the bubble into i row of grid

// };

//! Creating a function to add in a bubble in an odd row
// const addOddRow = (i, j) => { // Function takes row & col number as a parameter
//   const $bubble = addBubble();

//   const $bubbleColor = randomColor(colors);
//   $bubble.addClass($bubbleColor);

//   $bubble.css("left", (j*50)+25); // Distance from the left of the container
//   $bubble.css("top", (i*50)); // Distance from the top of the container

//   $bubble.attr("data-row", i); // Setting row data
//   $bubble.attr("data-col", j); // Setting column data

//   // bubbleGrid.push(new Bubble(i, j, [(i*50), (j*50)], $bubbleColor)); // Appending bubble data to bubble grid array
  
//   bubbleGrid.push([i, j]);

//   $(".row").eq(i).append($bubble); // Adding the bubble into i row of grid
// };

//! Creating an array to hold the coordinates of each bubble generated
const bubbleGrid = [];

//! Creating a function to generate a bubble in the bubble grid
const addBubbleInGrid = (row, col) => {
  // Creating the bubble and giving it a color
  const $bubble = addBubble();
  $bubble.addClass(randomColor(colors));

  // Setting the coordinates of the bubble
  $bubble.css("left", col*25);
  $bubble.css("top", row*50);

  // Adding row and col data to an array
  bubbleGrid.push(`${row}, ${col}`);

  // Appending the bubble to the respective row
  $rows.eq(row).append($bubble);
  console.log(`Appended a bubble at ${[row, col]}`);
};

//! Creating a function to generate a grid of bubbles
const addBubbleGrid = (rows, cols) => {
  // Looping each row
  for (let i=0; i<rows; i++) {

    // Checking if the row is odd or even
    if (i%2 == 0) {
      for (let j=0; j<cols-1; j+=2) {
        addBubbleInGrid(i, j);
      };
    } else {
      for (let j=1; j<cols-2; j+=2) {
        addBubbleInGrid(i, j);
      };
    };
  };
};

//! Creating a function to generate shooter bubble
const getShooter = () => {
  // Generating bubble and giving it a color
  const $shooter = addBubble().addClass(randomColor(colors));

  // Attaching the shooter-bubble id to the shooter bubble
  $shooter.attr("id", "shooter-bubble")

  // Appending bubble to the shooter div
  $("#shooter").append($shooter);
};

//! Creating a div to show angle of shooting
const $trajectory = $("<div>").attr("id", "trajectory");
$("#game-screen").append($trajectory);

//! Creating a variable to store the angle of rotation
let rotateAngle = 0;

//! Creating a function to rotate trajectory
const rotateTrajectory = (angle) => {
  $("#trajectory").css("transform", `rotate(${angle}deg)`);
};

//! Creating a function to check which is the lowest row that the bubble can land in
const firstEmptyRow = () => {
  let emptyRow = 0;
  for (let i=0; i<9; i++) {
    if ($rows.eq(i).children().length === 0) {
      console.log(`The first empty row is row ${i}`);
      return emptyRow = i;
    };
  };
};

//! Creating an array to hold the possible intersections
let possibleIntersections = [];

//! Creating a function to convert angle from degrees to radians
const convertAngle = (angle) => {
  // Checking if angle is negative
  if (angle < 0) {
    angle = -(angle);
  }
  return angle * (Math.PI / 180);
};

//! Creating function to find possible positions a bubble could land in
const landingCoords = (emptyRow) => { // Argument taken is the first empty row
  let xDist, yDist, col;

  // Converting angle to radians
  const angleInRadians = convertToRadians(rotateAngle);
  console.log(`The trajectory angle is ${rotateAngle}deg and ${angleInRadians}rad`);

  // For each row from the top to the bottom row
  for (let row=0; row<=emptyRow; row++) {
    yDist = ((9-row) * 50) + 25;
    xDist = yDist * Math.tan(angleInRadians);

    if (rotateAngle >= 0) {
      col = Math.round(xDist/25); // Number of cols from middle, NOT edge
      if (row%2 == 0 && col%2 != 0 && col >= 0) {
        col += 9;
        possibleLandingCoords.unshift(`${row}, ${col}`);
      } else if (row%2 != 0 && col%2 == 0 && col >=0) {
        col += 9;
        possibleLandingCoords.unshift(`${row}, ${col}`);
      };
    };
  };
  // Log and return an array of the possible landing coordinates
  console.log(`These are the possible landing coordinates: ${possibleLandingCoords}`);
  return possibleLandingCoords;
}

//! Function to check if the possible positions are empty
const finalPosition = (arr) => { // Argument taken is an array of possible landing coords
  let finalLandingCoord;

  for (const coord of possibleLandingCoords) {
    if (!bubbleCoords.includes(coord)) {
      finalLandingCoord = coord;
    };
  };
  // Log and return the position for the bubble to land on
  console.log(`The bubble will land on ${finalLandingCoord}`);
  return finalLandingCoord;
};

//! Function to shoot bubble
const shootBubble = (left, bottom) => {
  $("#shooter-bubble ").animate({
    left: "+=" + left,
    bottom: "+=" + bottom
  });
};


//! LOAD AFTER DOM HAS LOADED
$(() => {

  $("#start-screen").hide();

  addBubbleGrid(5, 10); // Generating a grid of 5 rows with 9/10 bubbles per row

  //! Event listener to change angle of shooting
  $(window).on("keydown", (event) => {
    if (event.which === 39) { // Listening for pressdown of right arrow key
      if (rotateAngle <= 45) { // Preventing arrow from rotating out of the playing field
        rotateAngle += 1; // Angle of rotation changes by 10deg with each press
        rotateTrajectory(rotateAngle);
      };
    };
    if (event.which === 37) {
      if (rotateAngle >= -45) {
        rotateAngle -= 1;
        rotateTrajectory(rotateAngle);
      };
    };
  });

  //! Event listener to shoot
  $(window).on("keydown", (event) => {
    if (event.which === 32) { // Listening for pressdown of spacebar
      
    };
  });

})