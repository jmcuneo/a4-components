import { useState } from "react";

interface AddPersonProps {
  onSubmitPerson: (item: {
    firstName: string;
    lastName: string;
    age: string;
  }) => void;
}

function AddPerson({ onSubmitPerson }: AddPersonProps) {
  let firstName = "",
    lastName = "",
    age = "";
  let [vals, setInputs] = useState({ firstName, lastName, age });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmitPerson(vals);
    vals = { firstName: "", lastName: "", age: "" };
    event.target.reset();
  };

  return (
    <>
      <h3>Add a Person</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="form-group pb-2">
          <label htmlFor="firstName">First Name: </label>
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group pb-2">
          <label htmlFor="lastName">Last Name: </label>
          <input
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group pb-2">
          <label htmlFor="age">Age: </label>
          <input
            className="form-control"
            id="age"
            name="age"
            placeholder="0"
            onChange={handleChange}
            required
          ></input>
        </div>

        <button id="buttonAdd" className="btn btn-success w-25">
          Add Person
        </button>
      </form>
    </>
  );
}

export default AddPerson;
