import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'
import SelectField from '../../elements/SelectField'

const options = [
  { key: 'topic', value: 'topic', text: 'Topic' },
  { key: 'open', value: 'open', text: 'Open' }
]

const topic_options = [
  { key: 'disease', value: 'disease', text: 'Disease' },
  { key: 'engineering', value: 'engineering', text: 'Engineering' },
  { key: 'other', value: 'other', text: 'Other' },
]

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const CreateProductForm = ({handleSubmit, productTypeValue, topicTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Product name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Product descripton'  />
    <Field component={SelectField} name='product_type' label='Type' placeholder='Type' options={options} />
    {productTypeValue === 'topic' && <Field component={SelectField} name='topic' label='Type of topic' placeholder='Type of topic' options={topic_options} />}
    {topicTypeValue === 'other' && <Field component={InputField} name='topic_other' label='Topic name' placeholder='Topic name' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedCreateProductForm = reduxForm({
  form: 'newProduct',
  validate
})(CreateProductForm)

const selector = formValueSelector('newProduct')

const mapStateToProps = state =>
({
  productTypeValue: selector(state, 'product_type'),
  topicTypeValue: selector(state, 'topic')
})

export default connect(mapStateToProps)(connectedCreateProductForm)
