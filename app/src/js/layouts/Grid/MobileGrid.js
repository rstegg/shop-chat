import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export default ({Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight}) =>
  <Grid className='main-container'>
    <Grid.Row columns={1} stretched>
      {!!Image && <Grid.Column>
        <Segment textAlign='center'>{Image}</Segment>
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!Header && <Grid.Column>
        <Segment>{Header}</Segment>
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!SubHeader && <Grid.Column>
        <Segment>{SubHeader}</Segment>
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!Gutter && <Grid.Column>
        <Segment textAlign='center'>{Gutter}</Segment>
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!Canopy && <Grid.Column>
        {Canopy}
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!ChatBox && <Grid.Column>
        {ChatBox}
      </Grid.Column>}
    </Grid.Row>
    <Grid.Row columns={1} stretched>
      {!!GutterRight && <Grid.Column>
        {GutterRight}
      </Grid.Column>}
    </Grid.Row>
  </Grid>
