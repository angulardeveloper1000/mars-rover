import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  listOfStrBoard: Array<string> = new Array<string>();
  roverXhistory: Array<number> = new Array<number>();
  roverYhistory: Array<number> = new Array<number>();
  arrOfCommands: Array<string> = new Array<string>();

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

  }

  ngAfterViewInit() {
    setInterval(() => {
      console.log('Firing again... Number of Commands left: ' + this.arrOfCommands);
      if (this.arrOfCommands.length > 0) { // Handle only if commands exists.
      }
    }, 3570);
  }

} // end class AppComponent
