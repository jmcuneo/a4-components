class Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public age: string;
  public fullName;

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    age: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = firstName + " " + lastName;
  }

  public getInfo() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
  }
}

export default Person;
