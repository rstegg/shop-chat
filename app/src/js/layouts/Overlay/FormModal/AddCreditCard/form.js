import React from 'react'
import { connect } from 'react-redux'

import { Form } from 'semantic-ui-react'

import { setFocusedCardField, onAddCreditCardFormChange } from 'actions/card'

import { normalizeCCNumber, normalizeExpiry, normalizeCVV } from './normalize'

const FormInput = ({ type, label, placeholder, value, onChange, autoFocus, onFocus, onBlur }) =>
  <Form.Field>
    <label>{label}</label>
    <div className='ui input'>
      <input type={type || 'text'} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} autoFocus={autoFocus || false} placeholder={placeholder || label} />
    </div>
  </Form.Field>

const AddCreditCardForm = ({card, user, onAddCreditCardFormChange, setFocusedCardField}) =>
  <Form>
    <Form.Group>
      <FormInput
        autoFocus={true}
        label='Name'
        name='name'
        placeholder='Name on card'
        value={card.name}
        onChange={e => onAddCreditCardFormChange('name', e.target.value)}
        onFocus={() => setFocusedCardField('name')}
        onBlur={() => setFocusedCardField(null)} />
      <FormInput
        label='Number'
        name='number'
        placeholder='Card number'
        value={card.number}
        onChange={e => onAddCreditCardFormChange('number', normalizeCCNumber(e.target.value))}
        onFocus={() => setFocusedCardField('number')}
        onBlur={() => setFocusedCardField(null)} />
    </Form.Group>
    <Form.Group>
      <FormInput
        label='Expiration'
        name='expirationDate'
        placeholder='MM/YY'
        value={card.expirationDate}
        onChange={e => onAddCreditCardFormChange('expirationDate', normalizeExpiry(e.target.value))}
        onFocus={() => setFocusedCardField('expiration')}
        onBlur={() => setFocusedCardField(null)} />
      <FormInput
        label='CVV'
        name='cvv'
        placeholder='CVV'
        value={card.cvv}
        onChange={e => onAddCreditCardFormChange('cvv', normalizeCVV(e.target.value))}
        onFocus={() => setFocusedCardField('cvc')}
        onBlur={() => setFocusedCardField(null)} />
    </Form.Group>
  </Form>

const mapStateToProps = ({card}) =>
({
  card
})

const mapDispatchToProps = dispatch =>
({
  onAddCreditCardFormChange: (field, value) => dispatch(onAddCreditCardFormChange(field, value)),
  setFocusedCardField: field => dispatch(setFocusedCardField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCardForm)
