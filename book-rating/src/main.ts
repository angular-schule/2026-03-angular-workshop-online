import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


//////////////


export class Customer {
  #id: number = 3;
  // idx!: number; // Non-Null Assertion GEFÄHRLICH!
  protected readonly idx?: string[];

  constructor(id: number) {
    console.log(this.#id);
    // this.idx = 4;

    // Optional Chaining
    if (this.idx) {
      this.idx.forEach(() => {})
    }
  }

  fooBar(foo: string): number {
    setTimeout(() => {
      console.log(this.#id)
    }, 2000)
    
    setTimeout(function () {
      console.log(this.#id)
    }, 2000)



    return 0;
 }
}

class SuperCustomer extends Customer {
  constructor() {
    super(5);
    this.idx?.forEach(() => {});
  }
}

const myCustomer = new Customer(5);




const plusOne = function (arg: number) {
  return arg + 1;
}

const plusOneX = arg => arg + 1;


[1,2,3,4].forEach((e, i) => {
  console.log(e)
});



const result = plusOne(4)