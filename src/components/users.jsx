import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
    const [professions, setProfession] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfession(
                data
            )
        );
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className = "d-flex">

            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">

                    <GroupList
                        selectedItem = {selectedProf}
                        items = {professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    < button className = "dtn dtn-secondary mt-2" onClick = {clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился,раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={rest.onDelete}
                                onBookmark={rest.onBookmark}
                                userId={user._id}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
