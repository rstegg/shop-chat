import React from 'react'

import { Grid, Segment } from 'semantic-ui-react'

export default ({Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight}) =>
  <Grid celled='internally' className='main-container'>
    <Grid.Column width={3}>
      <Segment>{Image}</Segment>
      <Segment>{Header}</Segment>
      <Segment>{SubHeader}</Segment>
      <Segment>{Gutter}</Segment>
      <Segment>{GutterRight}</Segment>
    </Grid.Column>
    <Grid.Column width={8} stretched>
      {Canopy}
    </Grid.Column>
    <Grid.Column width={5}>
      {ChatBox}
    </Grid.Column>
  </Grid>
