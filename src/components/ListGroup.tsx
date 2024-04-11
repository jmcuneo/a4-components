import { useReducer } from "react";
import Person from "./Person";

interface PeopleProps {
  items: Person[];
}

function ListGroup({ items }: PeopleProps) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <>
      <div className="d-flex justify-content-around">
        <h3 className="mb-5 text-center m-auto">People's Table</h3>
        <button className="btn btn-primary m-auto" onClick={forceUpdate}>
          Update Table
        </button>
      </div>
      {items.length === 0 && <p>No people found</p>}
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-dark table-hover table-bordered w-75  text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Full Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>{item.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListGroup;
