import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const user = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onBookmark,
    userId
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((qualitie) => (
                        <Qualitie key={qualitie._id} {...qualitie} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                    <Bookmark
                        status={bookmark}
                        handleBookmark={onBookmark}
                        userId={userId}
                    />
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(userId)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

user.propTypes = {
    onDelete: PropTypes.func.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onBookmark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default user;
