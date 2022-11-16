import React from "react";
import PropTypes from "prop-types";

const qualitie = ({ color, name, _id }) => {
    return (
        <span key={_id} className={`btn m-1 btn-${color}`}>
            {name}
        </span>
    );
};

qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default qualitie;
