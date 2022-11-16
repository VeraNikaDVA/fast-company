import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) =>
            setUser(
                data
            )
        );
    }, []);
    const history = useHistory();
    return <>
        {user
            ? <>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <Qualities qualities={user.qualities}/>
                <h2>{`Встретился ${user.completedMeetings} раз`}</h2>
                <h2>{`Оценка: ${user.rate}/5`}</h2>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => history.push(`/users/${id}/edit`)}
                >
                    Изменить
                </button>
            </>
            : <h1>Loading ...</h1>
        }
    </>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
