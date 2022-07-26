import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  let { id } = useParams()

  const user = useSelector((state) => state.users.find(user => user.id === id))

  console.log(user)

  return (
    <div>
      <h2>{user.name}</h2>
      <h2>Added blogs:</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User