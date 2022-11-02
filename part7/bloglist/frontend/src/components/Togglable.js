import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'

import './Togglable.css'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div className={visible ? 'togglable' : ''}>
        <br />
        <Button onClick={toggleVisibility} label={buttonLabel} />
      </div>
      <div className={visible ? '' : 'togglable'}>
        {children}
        <Button onClick={toggleVisibility} label="Cancel" />
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }

export default Togglable
