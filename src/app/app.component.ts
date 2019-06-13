import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {fromEvent, Subscription} from 'rxjs';
import {MoneyTranslatorService, NumberType} from './money-translatorservice/money-translator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Number Translator';
  amount = new FormControl('', [Validators.required]);
  usWord: string;
  indianWord: string;

  private subscription: Subscription;

  constructor(private moneyTranslator: MoneyTranslatorService) {

  }


  ngOnInit(): void {
    const input$ = this.amount.valueChanges.pipe(map((value: any) => {
      return value;
    }), startWith('0'));
    this.subscription = input$.subscribe((value: string) => {
      const num = +value;
      this.usWord = this.moneyTranslator.convertToWord(num, NumberType.USA);
      this.indianWord = this.moneyTranslator.convertToWord(num, NumberType.INDIA);
    });
  }


  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }


}
