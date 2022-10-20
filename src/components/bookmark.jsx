import React from "react";
import PropTypes from "prop-types";

function Bookmark({ status, handleBookmark, userId }) {
    return (
        <button
            onClick={() => handleBookmark(userId)}
            className="btn btn-outline-dark btn-lg"
        >
            <i className={status ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </button>
    );
}

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default Bookmark;
