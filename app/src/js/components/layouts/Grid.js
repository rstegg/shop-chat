import React from 'react'

import { Grid } from 'semantic-ui-react'

export default ({Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        {Image}
      </Grid.Column>
      <Grid.Column width={10}>
        {Canopy}
      </Grid.Column>
      <Grid.Column width={3}>
        {ChatBox}
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Grid.Row>
          {Header}
        </Grid.Row>
        <Grid.Row>
          {SubHeader}
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={10}>
        {Gutter}
      </Grid.Column>
      <Grid.Column width={3}>
        {GutterRight}
      </Grid.Column>
    </Grid.Row>
  </Grid>
