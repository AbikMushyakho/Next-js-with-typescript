// extends
interface Animal {
  name: string;
}

// Extended interface also covers the extended key types and values
interface Bear extends Animal {
  honey: boolean;
}
const bear: Bear = {
  name: "Winnie",
  honey: true,
};

// intersections
type Bird = {
  name: string;
};
// same as extends
type Parrot = Bird & {
  honey: boolean;
};
const parrot: Parrot = {
  name: "winkey",
  honey: false,
};

// new files can be added with existing interface
interface ForestAnimals {
  name: string;
}

interface ForestAnimals {
  tail: boolean;
}
const tiger: ForestAnimals = {
  name: "Giru",
  tail: true,
};

// function can also be defined inside interface
interface Persons {
  name: string;
  age: number;
  speak(sentence: string): string;
}

const person1: Persons = {
  name: "Abik",
  age: 24,
  speak: (sentence) => sentence,
};

console.log(person1);
console.log(person1.speak("hello my name is abik"));

// interfaces with classes

interface HasFormatter {
  format(): string;
}

class Person implements HasFormatter {
  constructor(public username: string, protected password: string) {}
  format() {
    return this.username.toLocaleLowerCase();
  }
}

let person12: HasFormatter;
let person123: HasFormatter;
person12 = new Person("DannyManl", "Danny123");
person123 = new Person("MohanSamsher", "Mohan123");
console.log(person12.format());

let people: HasFormatter[] = [];
people.push(person12);
people.push(person123);

console.log(people);

// union types with Literal types

let favouriteColor: "red" | "blue" | "green" | "yello";
favouriteColor = "red";
// favouriteColor ="dark" // throws an error
console.log(favouriteColor);

// generics

// <T> captures whatever the types are passed to the function
const addId = <T extends { name: string; age: number }>(obj: T) => {
  let id: number = Math.floor(Math.random() * 1000);
  return { ...obj, id };
};

let people1 = addId({ name: "abik", age: 20 });
// let demo =addId('Hero') //String cannot be passed becaus we have given <T> extension as an object
// let demo = addId(["sallt", 256]); //accures error because specifice name and types are assigned

console.log(people1);
console.log(people1.name); //throws an if <T> is not given

// Generics with interface
interface hasLength {
  length: number;
}

function logLength<T extends hasLength>(a: T[]) {
  console.log(a.length);
  a.forEach((element) => {
    console.log(element.length);
  });
}
// let hello = "HelloWorld1235"
// logLength(hello)

let arr = [
  "this is first text",
  ["this", "arr"],
  { material: "plastic", length: 30 },
];
logLength(arr);

// Generics with interfaces
interface Work<T> {
  companyName: string;
  experience: number;
  documents: T;
}

const work1: Work<string[]> = {
  companyName: "Broad",
  experience: 4,
  documents: ["passport", "visa"],
};

const work2: Work<string> = {
  companyName: "Info",
  experience: 1,
  documents: "passport,visa",
};
console.log(work1);
console.log(work2);

// Enums

// Enums declares
// Book =1 ,starts enum counting from 1
enum ResourceType {
  BOOK = 1,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}
console.log(ResourceType.BOOK);
console.log(ResourceType.PERSON);

// Enums can alsoo be strings
enum Direciton {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

console.log(Direciton.UP);
console.log(Direciton.DOWN);

// Strict mode in typescript
// insert "strict" = true in tsconfig file which enable strict checking of typescript codes
// set strictNullChecks = true to tsconfig . while implementing this, the types of keys should be give if its null or true
// we have to check if the values return from functions are null or undefined by using if condition

// Narrowing in typescript
function addAnother(val: string | number) {
  if (typeof val === "string") {
    return val.concat(" " + val);
  }
  return val + val;
}
console.log(addAnother("okay"));
console.log(addAnother(5)); //5 +5 =10

// Another example
// here the interface with the type values are used to narrow down
interface Vehicles {
  topSpeed: number;
}
interface Train extends Vehicles {
  type: "Train";
  carraiage: number;
}
interface Plane extends Vehicles {
  type: "Plane";
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;
function getSpeedRatio(v: PlaneOrTrain) {
  if (v.type === "Train") {
    return v.topSpeed / v.carraiage;
  }
  return v.topSpeed / v.wingSpan;
}

let bigTrain: Train = {
  type: "Train",
  topSpeed: 200,
  carraiage: 25,
};

let bigPlane: Plane = {
  type: "Plane",
  topSpeed: 200,
  wingSpan: 5,
};
console.log(getSpeedRatio(bigTrain));
console.log(getSpeedRatio(bigPlane));
