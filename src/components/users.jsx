import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    return number >= 2 && number <= 4
      ? `${number} человека тусанет с тобой сегодня`
      : number === 1
      ? `${number} человек тусанет с тобой сегодня`
      : `${number} человек тусанут с тобой сегодня`;
  };

  return (
    <>
      <h2>
        <span class={`badge bg-${users.length === 0 ? "danger" : "info"}`}>
          {renderPhrase(users.length)}
        </span>
      </h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((qualitie) => (
                  <span class={`btn m-1 btn-${qualitie.color}`}>
                    {qualitie.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  className="bth btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
