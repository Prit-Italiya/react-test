import React from 'react';
import PropTypes from 'prop-types';

const Col = props => {
    const {children, customClass, colSm, colMd, colLg} = props;
    const classColSm = colSm ? 'col-sm-' + colSm : 'col-sm-8';
    const classColMd = colMd ? 'col-md-' + colMd : 'col-md-6';
    const classColLg = colLg ? 'col-lg-' + colLg : 'col-lg-4';

    return (
        <div className={`${classColSm} ${classColMd} ${classColLg} ${customClass}`}>
            {children}
        </div>
    );
};

Col.propTypes = {
    customClass: PropTypes.string,
    colSm: PropTypes.number,
    colMd: PropTypes.number,
    colLg: PropTypes.number,
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

export default Col;