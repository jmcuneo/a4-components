import { useState } from "react";

interface DeletePersonProps {
  onDeletePerson: (item: { id: number }) => void;
}

function RemovePerson({ onDeletePerson }: DeletePersonProps) {
  let id = 0;
  let [vals, setInputs] = useState({ id });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onDeletePerson(vals);
    vals = { id: 0 };
    event.target.reset();
  };

  return (
    <>
      <h3>Remove a Person</h3>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="form-group pb-2">
          <label htmlFor="id">ID: </label>
          <input
            className="form-control"
            id="id"
            name="id"
            placeholder="0"
            onChange={handleChange}
            required
          ></input>
        </div>

        <button id="buttonRemove" className="btn btn-danger w-25">
          Delete Person
        </button>
      </form>
    </>
  );
}

export default RemovePerson;
