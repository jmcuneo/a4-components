import { useState } from "react";

interface EditPersonProps {
  onEditPerson: (item: {
    id: number;
    firstName: string;
    lastName: string;
    age: string;
  }) => void;
}

function EditPerson({ onEditPerson }: EditPersonProps) {
  let id = -1,
    firstName = "",
    lastName = "",
    age = "";
  let [vals, setInputs] = useState({ id, firstName, lastName, age });

  const handleChange = (event: any) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "id") {
      value = Number(value);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onEditPerson(vals);
    vals = { id: -1, firstName: "", lastName: "", age: "" };
    event.target.reset();
  };
  return (
    <>
      <h3>Edit a Person</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="form-group pb-2">
          <label htmlFor="id">ID: </label>
          <input
            type="number"
            className="form-control"
            name="id"
            id="idEdit"
            placeholder="0"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group pb-2">
          <label htmlFor="firstNameEdit">First Name: </label>
          <input
            className="form-control"
            name="firstName"
            id="firstNameEdit"
            placeholder="First Name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group pb-2">
          <label htmlFor="lastNameEdit">Last Name: </label>
          <input
            className="form-control"
            name="lastName"
            id="lastNameEdit"
            placeholder="Last Name"
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className="form-group pb-2">
          <label htmlFor="ageEdit">Age: </label>
          <input
            className="form-control"
            name="age"
            onChange={handleChange}
            id="ageEdit"
            placeholder="0"
            required
          ></input>
        </div>

        <button id="buttonEdit" className="btn btn-success w-25">
          Edit Person
        </button>
      </form>
    </>
  );
}

export default EditPerson;
