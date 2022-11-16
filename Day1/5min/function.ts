// Using union and type check
function wrapWithArray(obj: string | string[]): string[] {
  if (typeof obj === "string") {
    return [obj];
  } else {
    return obj;
  }
}

console.log(wrapWithArray("Ram"));

// Generics
type StringArray = Array<string>; //Same as string[]
type NumberArray = Array<number>; //Same as number[]
type ArrayOfObjects = Array<{ name: string; age: number }>;

//declare custom types
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
declare const backpack:Backpack<string>;
const object =backpack.get();
// backpack.add(20); // result an error because the type is declared to string


// Structural types

// If the types of each element are same then it becomes structural types

interface Point {
    x: number;
    y: number;
  }
   
  function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
  }
   
//   Here the point doesnot need an type decleration
  // logs "12, 26"
  const point = { x: 12, y: 26 };
  logPoint(point);
  
//   logPoint({hex:'213'})