import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnDestroy {

  para: string = '';
  timer: NodeJS.Timer;
  startTime: Date;
  timerDisplay: number = 0;
  wordIsValid: boolean = true;
  totalSpeed: number = 0;
  currentParaCompleted: boolean = false;
  workingWordPlaceholder: string = '';

  // para related stuff.

  paraDone: string = '';
  paraWorking: string;
  paraLeft: string;
  workingWord: string;

  paraArray: Array<string>;
  paraDoneArray: string[] = [];


  ngOnInit(): void {
    this._startRace();

  }

  _startRace() {
    // starting code
    this.para = `hey this is     the base line and this should work.
    This is the second line to complete and finish, the test.`;
    this.workingWordPlaceholder = 'Type here...';
    this.currentParaCompleted = false;
    this.paraArray = this.para.split(/\s/)
      .filter(word => word.length)
      .map(word => word.trim() && word + ' ');
    // remve space from the last element.
    let lastElement = this.paraArray[this.paraArray.length - 1];
    this.paraArray[this.paraArray.length - 1] = lastElement.trim();
    this.paraWorking = this.paraArray.shift();
    this.paraLeft = this.paraArray.join(' ');
    this.startTime = new Date();
  }

  checkWord(): boolean {
    // start timer
    if (!this.paraWorking) { return; }
    if (!this.timer) { this.startTimer(); };
    if (this.workingWord && (this.workingWord === this.paraWorking)) {
      if (!this.paraArray.length) {
        this.paraCompleted();
      }
      this.prepareNextWord();
      this.workingWord = '';
      return;
    }
    if (!this.workingWord.trim()) {
      this.workingWord = '';
    }
    this.wordIsValid = this.paraWorking.includes(this.workingWord && this.workingWord.trim());
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timerDisplay += 1;
      this.totalSpeed = Math.floor(
        (this.paraDoneArray.length / this.timerDisplay) * 60
      );
    }, 1000);
  }

  prepareNextWord() {
    this.paraDoneArray.push(this.paraWorking);
    this.paraDone += ' ' + this.paraWorking;
    this.paraWorking = this.paraArray.shift();
    this.paraLeft = this.paraArray.join(' ');
  }

  resetRace() {
    this._startRace();
    this.paraDoneArray = [];
    this.paraDone = '';
    clearInterval(this.timer);
    this.timer = null;
    this.timerDisplay = 0;
  }

  paraCompleted() {
    this.currentParaCompleted = true;
    this.workingWordPlaceholder = 'Click start button to start again.';
    clearInterval(this.timer);
    alert(`Your speed is ${this.totalSpeed} WPM.`);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
