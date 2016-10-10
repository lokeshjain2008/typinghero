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
    this.para = `Hey this is first line. You can create something that can be used by others and
    will; be; RTCI. thank you.`;

    this.paraArray = this.para.split(/\s/).filter(word => word.length);

    this.paraWorking = this.paraArray.shift();

    this.paraLeft = this.paraArray.join(' ');

    this.startTime = new Date();
  }

  checkWord(): boolean {
    // start timer
    if (!this.timer) { this.startTimer(); };
    if (this.workingWord && (this.workingWord.trim() === this.paraWorking)) {
      if (!this.paraArray.length) {
        this.paraCompleted();
      }
      this.prepareNextWord();
      this.workingWord = '';
      return;
    }
    this.wordIsValid = this.paraWorking.includes(this.workingWord && this.workingWord.trim());
  }

  startTimer() {
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
    clearInterval(this.timer);
    alert(`Your speed is ${this.totalSpeed} WPM.`);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
