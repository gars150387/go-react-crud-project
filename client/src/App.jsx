import { useEffect, useState } from "react";
import { connecUrl } from "./api";

function App() {
  const [first, setfirst] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const handleButtonClick = async (e) => {
    e.preventDefault();
    const response = await connecUrl.post("/user", {
      name: first,
    });
    if (response.data) {
      alert(`${response.data.data.InsertedID}`);
      setfirst("");
      return handleAllUsers();
    }
  };

  const handleAllUsers = async () => {
    const response = await connecUrl.get("/users");
    if (response.data) {
      setAllUsers(response.data.data);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    handleAllUsers();
    return () => {
      controller.abort();
    };
  }, []);

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
        {allUsers?.map(
          (user) => (console.log(user), (<div key={user._id}>{user.name}</div>))
        )}
      </ul>
    </div>
  );
}

export default App;
