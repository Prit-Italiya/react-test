import React from "react";
import PropTypes from 'prop-types';

const InputSelect = props => {

    const {labelText, name, required, options, placeholder, id, customClassName, value, textMuted, onChange, isInvalid, errMsg, onBlur} = props;
    const generateOptions = () =>
        options.map(
            (item, index) =>
                <option key={index} value={item.value}>{item.displayValue || item.value}</option>
        );

    return <div className={`form-group ${customClassName}-container`}>
        {labelText &&
        <label className={`form-label ${customClassName}-label`} htmlFor="formBasicName">{labelText}</label>}
        <select
            name={name}
            placeholder={placeholder}
            id={id}
            className={`form-control ${customClassName}-input ${isInvalid ? 'is-invalid' : ''}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        >
            {generateOptions()}
        </select>
        {isInvalid && <div className={`invalid-feedback ${customClassName}-err`}>{errMsg}</div>}
        {textMuted && <small className="text-muted form-text">{textMuted}</small>}
    </div>;
};

InputSelect.propTypes = {
    labelText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array,
    customClassName: PropTypes.string,
    value: PropTypes.string,
    textMuted: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    errMsg: PropTypes.string,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

InputSelect.defaultProps = {
    customClassName: ''
};

export default InputSelect;