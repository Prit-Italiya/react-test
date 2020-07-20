import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const Checkbox = props => {

    const [checked, setChecked] = useState(props.checked || false);

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);

    const {labelText, name, id, customClassName, onFocus, onBlur, disabled, textMuted, isInvalid, errMsg} = props;

    const onChange = e => {
        let isChecked = checked;
        if (!props.disabled) {
            setChecked(!isChecked);
            e.target.checked = !isChecked;
            e.target.name = props.id;
            e.target.value = !isChecked;
            props.onChange(e);
        }
    };

    const onKeyUp = e => {
        if (e.which === 32) {
            e.preventDefault();
            setChecked(!checked);
            e.target.name = props.id;
            e.target.value = !checked;
            props.onChange(e);
        }
    };

    const onKeyDown = e => {
        if ([32].indexOf(e.which) !== -1) {
            e.preventDefault();
        }
    };

    return <div className="custom-control custom-checkbox">
        <input
            type="checkbox"
            name={name}
            id={id}
            className={`custom-control-input ${isInvalid ? 'is-invalid' : ''} ${customClassName}`}
            checked={checked}
            aria-describedby={id}
            aria-hidden={false}
            onKeyUp={e => onKeyUp(e)}
            onKeyDown={e => onKeyDown(e)}
            disabled={disabled}
        />
        <label
            className={`custom-control-label ${customClassName}-label`}
            htmlFor={id}
            tabIndex={'0'}
            role={`checkbox`}
            aria-checked={checked}
            aria-describedby={id}
            aria-invalid={isInvalid}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={e => onKeyUp(e)}
            onKeyDown={e => onKeyDown(e)}
            onClick={e => onChange(e)}
        >
            <span className={`${customClassName}`}>{labelText}</span>
        </label>
        {isInvalid && <div className={`invalid-msg ${customClassName}-err`}>{errMsg}</div>}
        {textMuted && <small className="text-muted form-text">{textMuted}</small>}
    </div>;
};

Checkbox.propTypes = {
    labelText: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    customClassName: PropTypes.string,
    value: PropTypes.string,
    textMuted: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    disabled: PropTypes.bool,
    errMsg: PropTypes.string,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

Checkbox.defaultProps = {
    customClassName: '',
    disabled: false
};

export default Checkbox;