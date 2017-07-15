/* eslint camelcase: 0 */
import React from 'react'
import { connect } from 'react-redux'

import { Form } from 'semantic-ui-react'

import { setFocusedBankField, onAddBankFormChange } from 'actions/bank'

import { normalizeNumber } from './normalize'

const FormInput = ({ type, label, placeholder, value, onChange, autoFocus, onFocus, onBlur }) =>
  <Form.Field>
    <label>{label}</label>
    <div className='ui input'>
      <input type={type || 'text'} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} autoFocus={autoFocus || false} placeholder={placeholder || label} />
    </div>
  </Form.Field>

const AddBankForm = ({ bank, onAddBankFormChange, setFocusedBankField }) =>
  <Form>
    <FormInput
      autoFocus={true}
      label='Name'
      name='account_holder_name'
      placeholder='Name on account'
      value={bank.account_holder_name}
      onChange={e => onAddBankFormChange('account_holder_name', normalizeNumber(e.target.value))}
      onFocus={() => setFocusedBankField('account_holder_name')}
      onBlur={() => setFocusedBankField(null)} />
    <FormInput
      label='Routing number'
      name='routing_number'
      placeholder='Routing number'
      value={bank.routing_number}
      onChange={e => onAddBankFormChange('routing_number', normalizeNumber(e.target.value))}
      onFocus={() => setFocusedBankField('routing_number')}
      onBlur={() => setFocusedBankField(null)} />
    <FormInput
      label='Account number'
      name='account_number'
      placeholder='Account number'
      value={bank.account_number}
      onChange={e => onAddBankFormChange('account_number', normalizeNumber(e.target.value))}
      onFocus={() => setFocusedBankField('account_number')}
      onBlur={() => setFocusedBankField(null)} />
  </Form>

const mapStateToProps = ({ bank }) =>
({
  bank
})

const mapDispatchToProps = dispatch =>
({
  onAddBankFormChange: (field, value) => dispatch(onAddBankFormChange(field, value)),
  setFocusedBankField: field => dispatch(setFocusedBankField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBankForm)
