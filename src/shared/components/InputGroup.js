import React from "react";
import PropTypes from 'prop-types';

const InputGroup = props => {

    const {labelText, name, required, icon, placeholder, type, id, customClassName, value, textMuted, onChange, isInvalid, errMsg, onBlur} = props;

    return <div className={`form-group ${customClassName}-container`}>
        {labelText &&
        <label className={`form-label ${customClassName}-label`} htmlFor="formBasicName">{labelText}</label>}
        <div className="input-group mt-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                id={id}
                className={`form-control ${customClassName}-input ${isInvalid ? 'is-invalid' : ''}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {isInvalid && <div className={`invalid-feedback ${customClassName}-err`}>{errMsg}</div>}
            {textMuted && <small className="text-muted form-text">{textMuted}</small>}
        </div>
    </div>;
};

InputGroup.propTypes = {
    labelText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    customClassName: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.string,
    textMuted: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    errMsg: PropTypes.string,
    onBlur: PropTypes.func
};

InputGroup.defaultProps = {
    type: 'text',
    customClassName: ''
};

export default InputGroup;