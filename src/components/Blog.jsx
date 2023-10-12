const style = {
  padding: '20px 40px',
  borderBottom: '1px solid lightgrey',
  fontFamily: 'arial'
}

const Blog = ({ blog }) => (
  <div style={style}>
    {blog.title} {blog.author}
  </div>  
)

export default Blog