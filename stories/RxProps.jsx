import React from 'react';
import { Form, FormProvider, Field } from '../src';
import { MyInput } from './custom-fields';

const providerRules = {
  type: {
    text: ({ value }) => (value !== '')
  }
};

const providerMessages = {
  general: {
    invalid: 'General invalid'
  }
};

const rules = {
  name: {
    foo: ({ value }) => (value > 10)
  }
};

const messages = {
  general: {
    missing: 'Please provide the required field'
  },
  name: {
    foo: {
      invalid: 'Foo!'
    }
  }
}

export default class Messages extends React.Component {
  state = {
    type: 'text'
  }

  handleSubmitStart = ({ serialized }) => {
    console.warn(serialized);
  }

  render() {
    const { type } = this.state;

    return (
      <Form
        rules={ rules }
        messages={ messages }
        onSubmitStart={ this.handleSubmitStart }>
        <h2>Reactive props</h2>

        <MyInput
          name="fieldOne"
          initialValue="foo" />

        <MyInput
          name="rxField"
          required={({ fields }) => {
            const conditionA = fields.fieldOne && !!fields.fieldOne.value;
            const conditionB = fields.fieldThree && (fields.fieldThree.type === 'password');

            return conditionA && conditionB;
          }} />

        <MyInput
          name="fieldThree"
          type={ type }
          initialValue="something" />

        {/* <MyInput
          name="fieldThree"
          required={({ fields, form }) => {
            return form.subscribe('fieldTwo', 'value', ({ value }) => !!value);
          }} /> */}

        <button onClick={(event) => {
          event.preventDefault();
          this.setState(({ type }) => ({
            type: (type === 'text') ? 'password' : 'text'
          }));
        }}>Toggle type</button>

        <button>Submit</button>
      </Form>
    );
  }
}