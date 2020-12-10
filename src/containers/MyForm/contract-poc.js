import React from 'react'
import { Form, Field, FormElement } from "@progress/kendo-react-form";

import { ComboBox } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
export default function ContractPOC() {

  const onSubmitHandler = data => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <fieldset>
        <legend>Contract POC</legend>

        <Form
          onSubmit={onSubmitHandler}

          render={(formRenderProps) => (
            <FormElement>
              <Field
                name="principal"
                label="Principal"
                component={DatePicker}
              />
            </FormElement>
          )}
        />
      </fieldset>
    </div>
  )
}
