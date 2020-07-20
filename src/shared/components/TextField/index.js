import React from "react";
import PropTypes from 'prop-types';

const TextField = props => {

    const {labelText, name, required, disabled, placeholder, type, id, customClassName, value, textMuted, onFocus, onChange, isInvalid, errMsg, onBlur} = props;

    return <div className={`form-group ${customClassName}-container`}>
        {labelText &&
        <label className={`form-label ${customClassName}-label`} htmlFor="formBasicName">{labelText}</label>}
        <input
            name={name}
            placeholder={placeholder}
            type={type}
            id={id}
            className={`form-control ${customClassName}-input ${isInvalid ? 'is-invalid' : ''}`}
            value={value}
            disabled={disabled}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
        />
        {isInvalid && <div className={`invalid-feedback ${customClassName}-err`}>
            <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
            {` ${errMsg}`}
        </div>}
        {textMuted && <small className="text-muted form-text">{textMuted}</small>}
    </div>;
};

TextField.propTypes = {
    labelText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    customClassName: PropTypes.string,
    value: PropTypes.string,
    textMuted: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    errMsg: PropTypes.string,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

TextField.defaultProps = {
    type: 'text',
    customClassName: ''
};

export default TextField;