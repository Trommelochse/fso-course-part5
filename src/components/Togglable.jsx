import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div>
        { visible ? props.children : null }
      </div>
      <div>
        <button className={visible ? 'danger' : 'primary'} onClick={toggleVisibility}>{ visible ? 'Cancel' : props.buttonLabel }</button>
      </div>
    </div>
  )
})

export default Togglable