import React from "react";
import PropTypes from "prop-types";

const searchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        return number >= 2 && number <= 4
            ? `${number} человека тусанет с тобой сегодня`
            : number === 1
                ? `${number} человек тусанет с тобой сегодня`
                : `${number} человек тусанут с тобой сегодня`;
    };
    return (
        <h2>
            <span className={`badge bg-${length === 0 ? "danger" : "info"}`}>
                {renderPhrase(length)}
            </span>
        </h2>
    );
};

searchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default searchStatus;
