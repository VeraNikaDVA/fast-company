import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const userId = params.userId;
    return <>
        { userId
            ? <UserPage id={userId}/>
            : <UsersList/>
        }
    </>;
};

export default Users;