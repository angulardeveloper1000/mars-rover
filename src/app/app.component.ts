import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  listOfStrBoard: Array<string> = new Array<string>();
  roverXhistory: Array<number> = new Array<number>();
  roverYhistory: Array<number> = new Array<number>();
  arrOfCommands: Array<string> = new Array<string>();
  listOfObstacles: Array<string> = new Array<string>();
  currentCommand: string = null;

  constructor() {
    // Command data
    this.arrOfCommands.push('N');
    this.arrOfCommands.push('W');
    this.arrOfCommands.push('N');
    this.arrOfCommands.push('E');
    this.arrOfCommands.push('N');
    this.arrOfCommands.push('W');
    this.arrOfCommands.push('N');
    this.arrOfCommands.push('S');
    // Initial lcationof rover
    this.roverXhistory.push(3); // x
    this.roverYhistory.push(1); // y
    // 5x5 Board
    this.listOfStrBoard.push('Q o  ');
    this.listOfStrBoard.push(' O o ');
    this.listOfStrBoard.push('o   0');
    this.listOfStrBoard.push('   O ');
    this.listOfStrBoard.push('    Q');

    this.placeRoverOnBoard();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    setInterval(() => {
      console.log('Firing again... Number of Commands left: ' + this.arrOfCommands);
      if (this.arrOfCommands.length > 0) { // Handle only if commands exists.
        this.getNextCommand();
        this.executeNextCommand();
      }
    }, 3570);
  }
  
  placeRoverOnBoard() {
    let start_index = this.getLastX();
    let removeNumberOfItems = 1;
    let rowString = this.listOfStrBoard[this.getLastX()];
    let rowStringArr = rowString.split('');
    // Move the 'r' here. By default the Array.toString() uses comma as its delimiter, instead use .join("")
    rowStringArr[this.getLastY()] = 'r'; // to pass in your own chosen delimiter.
    let rowStrModified = rowStringArr.join('');
    this.listOfStrBoard.splice(start_index, removeNumberOfItems, rowStrModified);
    this.reportSuccessfulMove(this.getLastX(), this.getLastY());
  }
  reportSuccessfulMove(row: number, col: number) {
    const message = `Successful command ${this.currentCommand} moved rover to [${row}][${col}] `;
    this.listOfObstacles.push(message);
  }
  getLastX() {
    return this.roverXhistory[this.roverXhistory.length - 1];
  }
  getLastY() {
    return this.roverYhistory[this.roverYhistory.length - 1];
  }
  getNextCommand() {
    let nextCommand: string = this.currentCommand = this.arrOfCommands.pop(); // Pop off and return 1st character
    let newX, deltaX: number;
    let newY, deltaY: number;

    switch (nextCommand) {
      case 'W': { // This was N
        deltaX = 0;
        deltaY = 1;
        break;
      }
      case 'E': { // This was S
        deltaX = 0;
        deltaY = -1;
        break;
      }
      case 'S': { // This was E
        deltaX = 1;
        deltaY = 0;
        break;
      }
      case 'N': { // This was W
        deltaX = -1;
        deltaY = 0;
        break;
      }
      default: {
        break;
      }
    }

    newX = deltaX + this.getLastX();
    newY = deltaY + this.getLastY();
    console.log('current   X = ' + this.getLastX() + ' Y = ' + this.getLastY());
    this.roverXhistory.push(newX);
    this.roverYhistory.push(newY);
    console.log('nextCommand = ' + nextCommand + ' X = ' + newX + ' Y = ' + newY);
  }

  executeNextCommand() {
    let row: number = this.getLastX();
    let col: number = this.getLastY();
    if (this.isArrayEmptyAt(row, col)) {
      this.moveRoverTo(row, col);
      this.reportSuccessfulMove(row, col);
    } else {
      this.reportTheObstacle(row, col);
    }
  }

  isArrayEmptyAt(row: number, col: number) {
    return this.listOfStrBoard[row][col] === ' ';
  }

  moveRoverTo(row: number, col: number) {
    this.removeRoverFrom(this.roverXhistory[this.roverXhistory.length - 2]
      , this.roverYhistory[this.roverYhistory.length - 2]); // remove rover from previous position
    this.reportRemoveRover(this.roverXhistory[this.roverXhistory.length - 2]
      , this.roverYhistory[this.roverYhistory.length - 2]);
    let start_index = this.getLastX();
    let removeNumberOfItems = 1;
    let rowString = this.listOfStrBoard[this.getLastX()];
    let rowStringArr = rowString.split('');
    // Move the 'r' here. By default the Array.toString() uses comma as its delimiter, instead
    rowStringArr[this.getLastY()] = 'r'; //  use .join("") to pass in your own chosen delimiter.
    let rowStrModified = rowStringArr.join('');
    this.listOfStrBoard.splice(start_index, removeNumberOfItems, rowStrModified);
  }

  removeRoverFrom(row: number, col: number) {
    let start_index = row;
    let removeNumberOfItems = 1;
    let rowString = this.listOfStrBoard[row];
    let rowStringArr = rowString.split('');
    rowStringArr[col] = ' ';
    // Move the 'r' here. By default the Array.toString() uses comma as its delimiter, instead
    let rowStrModified = rowStringArr.join(''); //  use .join("") to pass in your own chosen delimiter.
    this.listOfStrBoard.splice(start_index, removeNumberOfItems, rowStrModified);
  }

  reportTheObstacle(row: number, col: number) {
    const message = `During command ${this.currentCommand} obstacle '${this.listOfStrBoard[row][col]}' was at location [${row}][${col}]`;
    this.listOfObstacles.push(message);
    // Since the rover cannot move here, then remove the x and y from history
    this.roverXhistory.pop();
    this.roverYhistory.pop();
  }

  reportRemoveRover(row: number, col: number) {
    const message = `Removing rover from [${row}][${col}]`;
    this.listOfObstacles.push(message);
  }


} // end class AppComponent
