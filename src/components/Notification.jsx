const Notification = ({notification}) => {
  const style = {
    color: notification.type === 'error' ? '#BF1A2F' : '#018E42',
    padding: '20px 35px',
    fontSize: 24,
    backgroundColor: '#ffffff'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification