import React from 'react'

const Card = ({children}) =>
  <div className='card'>
    {children}
  </div>

Card.Content = ({children}) =>
  <div className='card-content'>
    {children}
  </div>

Card.Header = ({children}) =>
  <div className='card-header'>
    {children}
  </div>

Card.Image = ({src}) =>
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={src} alt={src} />
    </figure>
  </div>

Card.Title = ({children}) =>
  <div className='card-header-title'>
    {children}
  </div>

Card.Footer = ({children}) =>
  <div className='card-footer'>
    {children}
  </div>

Card.Action = ({children}) =>
  <div className='card-footer-item'>
    {children}
  </div>

export default Card
