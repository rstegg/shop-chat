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
      label='Address'
      name='address'
      placeholder='Bitcoin address'
      value={bitcoin.address}
      onChange={e => onAddBitcoinFormChange('address', e.target.value)}
      onFocus={() => setFocusedBitcoinField('address')}
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
