import React from 'react';
import PropTypes from 'prop-types';

const Row = props => {
    const {children, customClass, rowId} = props;
    const className = (customClass) ? customClass : 'row';
    return (
        <div className={className} id={rowId}>
            {children}
        </div>
    );
};

Row.propTypes = {
    rowId: PropTypes.string,
    customClass: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
        PropTypes.func,
        PropTypes.array,
        PropTypes.node,
        PropTypes.element
    ])
};

export default Row;