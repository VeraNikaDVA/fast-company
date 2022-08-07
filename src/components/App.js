import React, { useState } from "react";
import Users from "./users.jsx";
import SearchStatus from "./searchStatus";
import api from "../api/index";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  return (
    <>
      <SearchStatus length={users.length} />
      {users.length ? <Users users={users} onDelete={handleDelete} /> : null}
    </>
  );
}

export default App;
