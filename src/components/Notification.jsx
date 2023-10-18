const Notification = ({ notification }) => {
  const highlightColor = notification.type === 'error' ? '#BF1A2F' : '#018E42'
  const style = {
    position: 'fixed',
    top: 20,
    left: 20,
    width: 180,
    border: '1px solid',
    borderColor: highlightColor,
    backgroundColor: '#fff',
    color: highlightColor,
    padding: '15px 20px',
    borderRadius: 5
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification