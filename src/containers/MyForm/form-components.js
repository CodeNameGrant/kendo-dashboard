import React from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Hint, Error } from '@progress/kendo-react-labels';
import { ComboBox } from '@progress/kendo-react-dropdowns';

export function NativeInput({ label, value, onChange, onBlur, onFocus }) {
  return (
    <FieldWrapper>
      <Label>{label}</Label>

      <div className={'k-form-field-wrap'}>
        <input
          className='k-textbox'
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </FieldWrapper>
  )
}


export const EmailInput = ({ validationMessage, touched, visited, modified, ...restProps }) => (
  <React.Fragment>
    <Input {...restProps} />
    {touched && validationMessage && (
      <div className='error'>{validationMessage}</div>
    )}
  </React.Fragment>
)

export const LabelInput = (fieldRenderProps) => {
  const { validationMessage, visited, label, id, valid, hint, ...others } = fieldRenderProps;
  const showValidationMessage = visited && validationMessage;
  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid}>{label}</Label>
      <div className={'k-form-field-wrap'}>
        <Input valid={valid} id={id} {...others} />
        {
          !showValidationMessage &&
          <Hint>{hint}</Hint>
        }
        {
          showValidationMessage &&
          <Error>{validationMessage}</Error>
        }
      </div>
    </FieldWrapper>
  );
};

export const RequiredLabelInput = ({ label, value, required, fieldInfo, validationMessage, modified, onChange, onBlur, onFocus, ...restProps }) => (
  <label className='k-form-field'>
    <span>
      {label}
      {required && <span className='k-required'>*</span>}
      {fieldInfo && <span className='k-field-info'>{fieldInfo}</span>}
    </span>
    <Input
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      {...restProps}
    />
    {modified && validationMessage && (
      <div className='error'>{validationMessage}</div>
    )}
  </label>
);

export const Field = ({ id, label, children }) => (
  <div style={{ display: 'flex', alignContent: 'center' }}>
    <Label editorId={id}>{label}</Label>
    <div>
      {children}
    </div>
  </div>
)