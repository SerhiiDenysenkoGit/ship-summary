import React from 'react';

export class Field extends React.Component {

    render() {
        const {type, name, placeholder, label, value, onChange, errorMsg, onBlur, disabled, style, readonly, size, withoutLabel } = this.props;
        const errorMsgExists = errorMsg !== undefined && errorMsg.length > 0;
        const className = errorMsgExists ? 'input is-danger ' : 'input ' + size;

        return (
            <div className="field">
                {withoutLabel ? null : <label className="label">{label}</label>}
                <div className="control">
                    {type === 'textarea'
                        ? <textarea value={value}
                                    className={errorMsgExists ? 'textarea is-danger' : 'textarea'}
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    disabled={disabled}
                                    readOnly={readonly}
                                    rows="6"/>
                        : <input value={value}
                                 className={className}
                                 type={type}
                                 name={name}
                                 placeholder={placeholder}
                                 onChange={onChange}
                                 onBlur={onBlur}
                                 style={style}
                                 disabled={disabled}
                                 readOnly={readonly}/>}
                </div>
                {errorMsgExists ? <p className="help is-danger">{errorMsg}</p> : null}
            </div>
        );
    }
}

Field.defaultProps = {
    disabled: false
};
