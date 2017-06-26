import React from 'react'

const AreaField = ({ input: { value, onChange }, onKeyUp, name, placeholder }) =>
  <div className="field">
    <p className="control">
      <textarea className="textarea" name={name} value={value} placeholder={placeholder} onChange={onChange} onKeyUp={onKeyUp}></textarea>
    </p>
  </div>

export default AreaField
