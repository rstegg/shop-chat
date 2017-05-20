import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import isMobile from 'utils/isMobile'

export default ({Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight}) =>
  isMobile ?
    <Grid className='main-container'>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          <Segment textAlign='center'>{Image}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          <Segment>{Header}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          <Segment>{SubHeader}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          <Segment textAlign='center'>{Gutter}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          {Canopy}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          {ChatBox}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} stretched>
        <Grid.Column>
          {GutterRight}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  :
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
