import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../components/ui/editUserForm";

const Edit = () => {
    const params = useParams();
    const userId = params.userId;
    return <>
        {
            userId
                ? <EditUserForm id={userId}/>
                : null
        }
    </>;
};

export default Edit;
