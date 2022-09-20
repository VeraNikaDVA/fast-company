import React, { useState } from "react";

function Bookmark() {
    const [status, setStatus] = useState(false);
    const handleBookmark = () => {
        return setStatus((prevState) => !prevState);
    };
    return (
        <button
            onClick={handleBookmark}
            className="btn btn-outline-dark btn-lg"
        >
            <i className={status ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </button>
    );
}

export default Bookmark;
