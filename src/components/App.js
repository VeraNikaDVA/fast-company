import React, { useState, useEffect } from "react";
import Users from "./users.jsx";
import api from "../api";

function App() {
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(
                data
            )
        );
    }, []);

    const handleBookmark = (userId) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (user._id !== userId) {
                    return user;
                } else {
                    if (user.bookmark) {
                        return { ...user, bookmark: false };
                    } else {
                        return { ...user, bookmark: true };
                    }
                }
            })
        );
    };
    return (
        <>
            {users?.length
                ? (
                    <Users
                        users={users}
                        onDelete={handleDelete}
                        onBookmark={handleBookmark}
                    />
                )
                : null}
        </>
    );
}

export default App;
