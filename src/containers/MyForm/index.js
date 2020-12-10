import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from '@progress/kendo-react-buttons';
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList, ComboBox } from "@progress/kendo-react-dropdowns";
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Label } from '@progress/kendo-react-labels';
import { NativeInput, EmailInput, LabelInput, RequiredLabelInput, Field as MyField } from './form-components';

import classes from './MyForm.module.css';
import ContractPOC from "./contract-poc";

/* Created from : https://www.telerik.com/blogs/building-a-fully-featured-react-form-component-kendoreact-form-example
 */

export default function KendoForm() {
  const onSubmitHandler = data => {
    alert(JSON.stringify(data, null, 2))
  };

  const onSubmitHandler2 = e => {
    e.preventDefault();
    console.log("onSubmitHandler2", e);
  };

  const basicForm = (
    <Form
      onSubmit={onSubmitHandler}
      render={(formRenderProps) => (
        <form onSubmit={formRenderProps.onSubmit} className='k-form'>
          <fieldset>
            <legend>Basic Form with Fields rendering Input Components</legend>
            <Field
              name='firstName'
              label='First Name'
              component={Input}
            />

            <Field
              name='lastName'
              label='Last Name'
              component={Input}
            />

            <button
              type="submit"
              className="k-button"
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
              </button>
          </fieldset>
        </form>
      )}
    />
  )

  const formWithNativeComponents = (
    <Form
      onSubmit={onSubmitHandler}
      render={({ allowSubmit, onSubmit }) => (
        <form onSubmit={onSubmit} className="k-form">
          <fieldset>
            <legend>Basic Form with Fields rendering <b>NativeInput</b> Components</legend>
            <Field
              name="firstName"
              label="First name"
              component={NativeInput}
            />

            <Field
              name="lastName"
              label="Last name"
              component={NativeInput}
            />
          </fieldset>
          <button
            type="submit"
            className="k-button"
            disabled={!allowSubmit}
          >
            Submit
        </button>
        </form>
      )}
    />
  )

  const rooms = ["Room 1", "Alpha", "101", "Room-A", "Uno"]
  const formWithKendoWidgets = (
    <Form
      onSubmit={onSubmitHandler}
      render={({ onSubmit, allowSubmit }) => (
        <form onSubmit={onSubmit} className='k-form'>
          <fieldset>
            <legend>Form with Fields rendering <b>Kendo Widgets</b></legend>

            <Field
              name="firstName"
              label="First name"
              component={Input}
            />

            <Field
              name="lastName"
              label="Last name"
              component={Input}
            />

            <Field
              name="room"
              label="Room"
              component={DropDownList}
              data={rooms}
              validator={requiredValidator}
            />

            <Button
              type="submit"
              primary={true}
              disabled={!allowSubmit}
            >
              Submit
          </Button>

          </fieldset>

        </form>
      )}
    />
  );

  const formWithValidation = (
    <Form
      onSubmit={onSubmitHandler}
      render={({ allowSubmit, onSubmit }) => {
        const emailRegex = new RegExp(/\S+@\S+\.\S+/);
        const emailValidator = value =>
          emailRegex.test(value) ? "" : "Please enter a valid email.";

        return (
          <form onSubmit={onSubmit} className='k-form'>
            <fieldset>
              <legend>Form With field User Input Validation</legend>

              <Field
                name='name'
                label='Name'
                component={Input}
              />

              <Field
                type='email'
                name='email'
                label='Email'
                component={EmailInput}
                validator={emailValidator}
              />

              <Button
                type='submit'
                primary
                disabled={!allowSubmit}
              >Submit</Button>

            </fieldset>
          </form>
        );
      }}
    />
  );

  const basicFormWithInlineStyle = (
    <Form
      onSubmit={onSubmitHandler}
      render={(formRenderProps) => (
        <FormElement horizontal={true}>
          <fieldset>
            <legend>Form with inputs Inline</legend>

            <Field
              id={'name'}
              name={'name'}
              label={'Name (Regular Label)'}
              placeholder={'You Name Here'}
              component={LabelInput}
            />

            <Field
              id={'room'}
              name={'room'}
              label={'Room'}
              component={ComboBox}
              data={rooms}
            />

            <button
              type="submit"
              className="k-button"
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
              </button>
          </fieldset>

        </FormElement>
      )}
    />
  )

  const requiredValidator = value => !!value ? "" : "This Field is Requried";
  const formWithRequiredLabelInput = (
    <Form
      onSubmit={onSubmitHandler}
      render={({ allowSubmit, onSubmit }) => (
        <FormElement>
          <fieldset>
            <legend>Form With Custom Required Label Input Component</legend>

            <Field
              name='name'
              label='Name'
              component={RequiredLabelInput}
              required
              validator={requiredValidator}
            />

            <Field
              name='nickname'
              label='Nicname'
              component={RequiredLabelInput}
              fieldInfo={'Optional'}
              validator={requiredValidator}
            />

            <Button type='submit' primary disabled={!allowSubmit}>Submit</Button>
          </fieldset>
        </FormElement>
      )}
    />
  )


  return (<React.Fragment>
    {/* <div className={classes.Forms}>
      {basicForm}
      {formWithNativeComponents}
      {formWithKendoWidgets}
      {formWithValidation}
    </div> */}

    <div className={classes.Forms}>
      {basicFormWithInlineStyle}
      {formWithRequiredLabelInput}
    </div>

    <div className={classes.Forms}>
      <ContractPOC />
    </div>


  </React.Fragment>)

}