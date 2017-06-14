import React from 'react'
import { connect } from 'react-redux'
import { path, pipe } from 'ramda'

import { Segment } from 'semantic-ui-react'

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`
const hasAlpha = rgba => !!rgba && rgba.a === 0 ? 'none' : '0 1px 2px 0 rgba(34,36,38,.15)'
const getSegmentRGB = path(['themes', 'segment', 'rgb'])

const getSegment = pipe(getSegmentRGB, toRGBStyle)
const getSegmentAlpha = pipe(getSegmentRGB, hasAlpha)

const ProductGallerySegment = ({product, children}) =>
  <Segment compact style={{background: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
    {children}
  </Segment>

const mapStateToProps = ({products}) =>
({
  product: products.current
})

export default connect(mapStateToProps)(ProductGallerySegment)
