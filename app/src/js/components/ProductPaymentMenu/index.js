import React from 'react'
import { connect } from 'react-redux'

import { Segment, Button, Popup } from 'semantic-ui-react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const TwitterIcon = generateShareIcon('twitter')

const {
  TwitterShareButton
} = ShareButtons

import SocialMenuForm from './form'

import { shareProduct } from 'actions/products'

const SocialMenu = ({url, user, shareProduct, productId}) =>
  <Segment.Group compact horizontal>
    <Segment>
      <CopyToClipboard text={url}>
        <Button circular basic icon='linkify' size='medium' />
      </CopyToClipboard>
    </Segment>
    <Segment>
      <TwitterShareButton
        title="Kool, Wow"
        url={url}
        style={{cursor: 'pointer'}}>
          <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </Segment>
    <Segment>
    <Popup wide trigger={<Button circular basic icon='mail' size='medium' />} on='click'>
        <Popup.Header>Share via Email</Popup.Header>
        <Popup.Content>
          <SocialMenuForm onSubmit={values => shareProduct({...values, productId}, user, url)} />
        </Popup.Content>
    </Popup>
  </Segment>
  </Segment.Group>

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  shareProduct: (email, user, url) => dispatch(shareProduct(email, user, url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialMenu)
