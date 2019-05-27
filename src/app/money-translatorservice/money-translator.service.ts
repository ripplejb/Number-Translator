import { Injectable } from '@angular/core';

export enum NumberType {
  USA,
  INDIA
}


@Injectable({
  providedIn: 'root'
})

export class MoneyTranslatorService {

  private singleDigits = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private multipleOfTen = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred'];



  private usDigits = ['Thousand', 'Million', 'Billion'];

  private indiaDigits = ['Thousand', 'Laakh', 'Crore', 'Arab'];

  constructor() { }

  convertToWord(amount: number, type: NumberType) {
    let result = '';
    switch (type) {
      case NumberType.INDIA:
         result = this.toWord(amount, this.indiaDigits, 2);
         return this.highlightWords(result, this.indiaDigits);
      case NumberType.USA:
        result = this.toWord(amount, this.usDigits, 3);
        return this.highlightWords(result, this.usDigits);
    }


  }

  private highlightWords(result: string, arr: string[]) {
    arr.forEach((val) => {
      result = result.replace(new RegExp(`${val}`, 'g'), `<span class="nt-highlightText">${val}</span>`);
    } );

    return result;
  }

  private toWord(num: number, above1000Array: string[], skipDigit: number) {

    let result = this.getWordForValuesBelowThousand(num);

    if (result !== '') {
      return result;
    }

    let i = 3 + skipDigit;
    let c = 0;
    result = num % 1000 === 0 ? '' : this.get3DigitWord(num % 1000);
    while (i < 10) {
      const currentNumber = num % Math.pow(10, i) - num % Math.pow(10, i - skipDigit);

      if (currentNumber > 0) {
        result = `${this.get3DigitWord(currentNumber / Math.pow(10, i - skipDigit))} ${above1000Array[c]} ${result}`;
      }
      c++;
      i += skipDigit;
    }
    const aboveArab = (num % Math.pow(10, num.toString().length + 1) - num % Math.pow(10, 9)) /
      Math.pow(10, 9);

    if (aboveArab > 0) {
      result = `${this.toWord(aboveArab, above1000Array, skipDigit)} ${above1000Array[above1000Array.length - 1]} ${result}`;
    }

    return result;
  }

  private getWordForValuesBelowThousand(num: number) {
    const zero = this.getZero(num);
    if (zero !== '') {
      return zero;
    }

    if (!this.isSupported(num)) {
      return 'Unsupported for now.';
    }

    if (num < 100) {
      return this.get2DigitWord(num);
    }

    if (num < 1000) {
      return this.get3DigitWord(num);
    }

    return zero;
  }

  private getZero(num: number) {
    if (num === undefined || num === null || num === 0) {
      return this.singleDigits[0];
    }
    return '';
  }

  private isSupported(num: number) {
    return num.toString().length <= 16;
  }

  private get2DigitWord(num: number) {
    if (num < 21) {
      return this.singleDigits[num];
    }

    return `${this.multipleOfTen[Math.floor(num / 10) - 2]} ${(num % 10) !== 0 ? this.singleDigits[num % 10] : ''}`;
  }

  private get3DigitWord(num: number) {
    if (num < 100) {
      return this.get2DigitWord(num);
    }

    return `${this.singleDigits[Math.floor(num / 100)]} Hundred ${(num % 100) !== 0 ? this.get2DigitWord(num % 100) : ''}`;
  }

}
