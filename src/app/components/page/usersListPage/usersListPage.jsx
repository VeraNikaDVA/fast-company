import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const [professions, setProfession] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchString, setSearchString] = useState("");
    const pageSize = 4;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(
                data
            )
        );
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

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

    useEffect(() => {
        if (users?.length === pageSize) {
            setCurrentPage(1);
        }
    });

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchString("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = ({ target }) => {
        setSearchString(target.value);
        setSelectedProf(undefined);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;
        const searchedUsers = searchString
            ? users.filter((user) => user.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
            : users;
        const count = selectedProf
            ? filteredUsers.length
            : searchedUsers.length;
        const sortedUsers = _.orderBy(selectedProf
            ? filteredUsers
            : searchedUsers,
        [sortBy.path],
        [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
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
                    <TextField
                        name="search"
                        placeholder="Search..."
                        value={searchString}
                        onChange={handleSearch}
                    />
                    <UserTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onBookmark={handleBookmark}
                    />
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
    }
    return "loading ...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
