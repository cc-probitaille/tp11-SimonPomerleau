export class ClassA {
    private readonly message: string;

    constructor(message: string) {
      this.message = message;
    }
  
    sayHello() {
      return `Hello from ClassA: ${this.message}`;
    }
  }
  
  export class ClassB {
    private readonly x: number;
    private readonly y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    sum() {
      return this.x + this.y;
    }
  }