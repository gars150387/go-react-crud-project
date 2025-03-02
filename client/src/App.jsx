import { useState } from "react";
import { connecUrl } from "./api";

function App() {
  const [first, setfirst] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const handleButtonClick = async (e) => {
    e.preventDefault();
    // axios
    //   .get("https://go-react-crud-app-29a97a0eb165.herokuapp.com/users")
    //   .then((response) => {
    //     console.log(response.data);
    //   });
    const response = await connecUrl.post("/user", {
      name: first,
    });
    if (response.data) {
      console.log(response.data);
      console.log(response.data.data.InsertedID);
      alert(`${response.data.data.InsertedID}`);
      return setfirst("");
    }
  };

  const handleAllUsers = async () => {
    const response = await connecUrl.get("/users");
    if (response.data) {
      console.log(response.data);
      setAllUsers(response.data.data);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleButtonClick(e)}>
        <input
          name="name"
          value={first}
          onChange={(e) => setfirst(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => handleAllUsers()}>All users</button>
      <ul>
        {allUsers.map((user) => (
          console.log(user),
          <div key={user.InsertedID}>{user.name}</div>
        ))}
      </ul>
    </div>
  );
}

export default App;
