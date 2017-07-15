import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

const DesktopGrid = ({ Image, Canopy, ChatBox, Header, SubHeader, Gutter, GutterRight }) =>
  <Grid celled='internally' className='main-container'>
    <Grid.Column width={3} stretched>
      <Segment basic>
        {!!Image && <Segment>{Image}</Segment>}
        {!!Header && <Segment>{Header}</Segment>}
        {!!SubHeader && <Segment>{SubHeader}</Segment>}
        {!!Gutter && <Segment>{Gutter}</Segment>}
        {!!GutterRight && <Segment style={{ display: 'flex', justifyContent: 'center' }}>{GutterRight}</Segment>}
      </Segment>
    </Grid.Column>
    {!!Canopy && <Grid.Column width={8} stretched>{Canopy}</Grid.Column>}
    {!!ChatBox && <Grid.Column width={5} stretched>{ChatBox}</Grid.Column>}
  </Grid>

export default DesktopGrid
