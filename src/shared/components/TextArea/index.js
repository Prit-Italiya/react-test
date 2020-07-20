import React from "react";
import PropTypes from 'prop-types';

const TextArea = props => {

    const {labelText, name, required, placeholder, id, customClassName, value, textMuted, onChange, isInvalid, errMsg, onBlur} = props;

    return <div className={`form-group ${customClassName}-container`}>
        {labelText &&
        <label className={`form-label ${customClassName}-label`} htmlFor="formBasicName">{labelText}</label>}
        <textarea
            name={name}
            placeholder={placeholder}
            id={id}
            className={`form-control ${customClassName}-input ${isInvalid ? 'is-invalid' : ''}`}
            value={value}
            aria-describedby="inputGroup-sizing-sm"
            onChange={onChange}
            onBlur={onBlur}
        />
        {isInvalid && <div className={`invalid-feedback ${customClassName}-err`}>{errMsg}</div>}
        {textMuted && <small className="text-muted form-text">{textMuted}</small>}
    </div>;
};

TextArea.propTypes = {
    labelText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
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

TextArea.defaultProps = {
    customClassName: ''
};

export default TextArea;