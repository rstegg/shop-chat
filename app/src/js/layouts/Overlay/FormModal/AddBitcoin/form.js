import React from 'react'
import { connect } from 'react-redux'

import { Form } from 'semantic-ui-react'

import { setFocusedBitcoinField, onAddBitcoinFormChange } from 'actions/bitcoin'

const FormInput = ({ type, label, placeholder, value, onChange, autoFocus, onFocus, onBlur }) =>
  <Form.Field>
    <label>{label}</label>
    <div className='ui input'>
      <input type={type || 'text'} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} autoFocus={autoFocus || false} placeholder={placeholder || label} />
    </div>
  </Form.Field>

const AddBitcoinForm = ({ bitcoin, onAddBitcoinFormChange, setFocusedBitcoinField }) =>
  <Form>
    <FormInput
      label='Email'
      name='email'
      placeholder='Email'
      value={bitcoin.email}
      onChange={e => onAddBitcoinFormChange('email', e.target.value)}
      onFocus={() => setFocusedBitcoinField('email')}
      onBlur={() => setFocusedBitcoinField(null)} />
    <FormInput
      label='Amount'
      name='amount'
      placeholder='Amount'
      value={bitcoin.amount}
      onChange={e => onAddBitcoinFormChange('amount', e.target.value)}
      onFocus={() => setFocusedBitcoinField('amount')}
      onBlur={() => setFocusedBitcoinField(null)} />
  </Form>

const mapStateToProps = ({ bitcoin }) =>
({
  bitcoin
})

const mapDispatchToProps = dispatch =>
({
  onAddBitcoinFormChange: (field, value) => dispatch(onAddBitcoinFormChange(field, value)),
  setFocusedBitcoinField: field => dispatch(setFocusedBitcoinField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBitcoinForm)
