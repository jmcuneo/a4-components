import ListGroup from "./components/ListGroup";
import AddPerson from "./components/AddPerson";
import RemovePerson from "./components/RemovePerson";
import EditPerson from "./components/EditPerson";
import Person from "./components/Person";

function App() {
  let items = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Stevenson",
      age: "23",
      fullName: "Mark Stevenson",
    },
    {
      id: 2,
      firstName: "Tom",
      lastName: "Sanford",
      age: "30",
      fullName: "Tom Sanford",
    },
    {
      id: 3,
      firstName: "Steve",
      lastName: "Smith",
      age: "14",
      fullName: "Steve Smith",
    },
  ];

  let currentIndex = items.length + 1;
  let currentChanges = 0;

  let itemsPeople = [];
  for (let item of items) {
    itemsPeople.push(
      new Person(item.id, item.firstName, item.lastName, item.age)
    );
  }

  const handleSubmitPerson = (item: {
    firstName: string;
    lastName: string;
    age: string;
  }) => {
    let fullName = item.firstName + " " + item.lastName;
    let json = {
      id: currentIndex,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      fullName: fullName,
    };
    console.log(json);
    itemsPeople.push(
      new Person(json.id, json.firstName, json.lastName, json.age)
    );
    console.log(itemsPeople);
    currentIndex = currentIndex + 1;
    currentChanges = currentChanges + 1;
  };

  const handleDeletePerson = (item: { id: number }) => {
    for (let index = 0; index < itemsPeople.length; index++) {
      if (itemsPeople[index].id == item.id) {
        itemsPeople.splice(index, 1);
        break;
      }
    }
    console.log(itemsPeople);
    currentChanges = currentChanges + 1;
  };

  const handleEditPerson = (item: {
    id: number;
    firstName: string;
    lastName: string;
    age: string;
  }) => {
    for (let index = 0; index < itemsPeople.length; index++) {
      if (itemsPeople[index].id == item.id) {
        itemsPeople[index] = new Person(
          item.id,
          item.firstName,
          item.lastName,
          item.age
        );
        break;
      }
    }
    console.log(itemsPeople);
    currentChanges = currentChanges + 1;
  };

  return (
    <>
      <div className="m-auto" style={{ width: "95%" }}>
        <div className="pt-4 pb-2 mx-auto mt-4 rounded bg-black">
          <h2 className="text-center">
            <b>User's Book Completion List</b>
          </h2>
        </div>
        <div className="d-flex justify-content-around flex-row m-auto pb-4 pt-3 rounded">
          <div
            className="px-3 py-4 bg-black mt-3 rounded"
            style={{ width: "30%" }}
          >
            <AddPerson onSubmitPerson={handleSubmitPerson} />
          </div>
          <div
            className="px-3 py-4 bg-black mt-3 rounded"
            style={{ width: "30%" }}
          >
            <RemovePerson onDeletePerson={handleDeletePerson} />
          </div>
          <div
            className="px-3 py-4 bg-black mt-3 rounded"
            style={{ width: "30%" }}
          >
            <EditPerson onEditPerson={handleEditPerson} />
          </div>
        </div>
        <div className="m-auto p-3 rounded bg-black">
          <ListGroup items={itemsPeople} />
        </div>
      </div>
    </>
  );
}

export default App;
