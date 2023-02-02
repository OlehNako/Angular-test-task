import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-password-indicators',
  templateUrl: './password-indicators.component.html',
  styleUrls: ['./password-indicators.component.css']
})
  

export class PasswordIndicatorsComponent implements OnChanges{
  @Input() public passwordToCheck: string;
  private colors = ['red',  'yellow', 'green'];
  el0: string;
  el1: string;
  el2: string;

  checkStrength(pass) {

    let passRate = 0;

    const chars = /[A-Z, a-z]+/.test(pass);
    const numbs = /[0-9]+/.test(pass);
    const symbTempl = /[$#-/:-?{-~!"^_@`\[\]]/g;
    const symbs = symbTempl.test(pass);
    const metrics = [chars, numbs, symbs];

    let countCheck = 0;
    for (const metric of metrics) {
      countCheck += metric === true ? 1 : 0;
    }

    passRate += countCheck;
    passRate = (pass.length < 8) ? 1 : passRate;
    passRate = (countCheck === 1) ? Math.min(passRate, 1) : passRate;
    passRate = (countCheck === 2) ? Math.min(passRate, 2) : passRate;
    passRate = (countCheck === 3) ? Math.min(passRate, 3) : passRate;

    return passRate;
  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(3, 'grey');
    if (password) {
      if (password.length < 8) {
        this.setBarColors(3, 'red');
      }
      const coloring = this.getColor(this.checkStrength(password));
      this.setBarColors(coloring.index, coloring.color);
    }
  }

  private getColor(checkRes) {
    let index = 0;
    if (checkRes === 1) {
      index = 0;
    } else if (checkRes === 2) {
      index = 1;
    } else  {
      index = 2;
    } 
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(bars, color) {
    for (let n = 0; n < bars; n++) {
      this['el' + n] = color;
    }
  }

  
}

