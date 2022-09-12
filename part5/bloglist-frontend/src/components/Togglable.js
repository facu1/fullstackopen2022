const { useState, forwardRef, useImperativeHandle } = require("react")

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideStyle = { display: 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={visible ? hideStyle : {}}>
        <br />
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={visible ? {} : hideStyle}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable