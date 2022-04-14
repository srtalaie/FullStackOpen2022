const Course = ({ course }) => {
  return (
    <div>
        <h1>{course.name}</h1>
        {course.parts.map((part) => {
            return <div key={part.id}>{part.name} {part.exercises}</div>
        })}
    </div>
  )
}

export default Course