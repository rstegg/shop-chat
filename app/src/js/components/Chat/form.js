import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import AreaField from 'elements/Input/AreaField'

import OfferMenu from 'components/OfferMenu'

const ShopChatForm = ({handleSubmit, resetForm, threadType}) =>
    <form className='media-content' onSubmit={handleSubmit}>
      <Field component={AreaField} className='textarea' label='Message' name='text' placeholder='Type a chat message' />
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <button className="button is-primary">Submit</button>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {threadType === 'shop' && <OfferMenu />}
          </div>
        </div>
      </nav>
    </form>

export default reduxForm({
  form: 'sendThreadChatMessage'
})(ShopChatForm)
