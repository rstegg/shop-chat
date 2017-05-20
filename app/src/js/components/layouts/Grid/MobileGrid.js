import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export default ({Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight}) =>
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
