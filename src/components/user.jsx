import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import qualitie from "./qualitie";
import Users from "./users";

const user = (user) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((qualitie) => (
            <Qualitie key={qualitie._id} {...qualitie} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <Bookmark />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => user.onDelete(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default user;
