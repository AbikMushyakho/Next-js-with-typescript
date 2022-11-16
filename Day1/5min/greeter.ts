class Student {
  //   fullname: string;
  constructor(public firstname: string, public lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

interface Person {
  firstname: string;
  lastname: string;
}

function greeter(person: Person) {
  return `Hello ${person.firstname} ${person.lastname}`;
}
// let user = {
//   firstname: "Abik",
//   lastname: "mushyakho",
// };
let user:Person = new Student("Amreet", "Raj");
let anotherUser = new Student("Mohan", "Aryal");

document.body.textContent = greeter(user);
