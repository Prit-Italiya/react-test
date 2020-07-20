import React from "react";
import PropTypes from 'prop-types';
import Spinner from "react-bootstrap/Spinner";

const spinner = props => {

    const isLoading = props.show;
    const className = isLoading ? 'spinner-block' : 'spinner-block-disabled';

    return isLoading ? <div className={className}>
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div> : null;
};

spinner.prototype = {
    show: PropTypes.bool
};

export default spinner;