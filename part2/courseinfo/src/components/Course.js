const Course = ({ course }) => {
  const total = course.parts.reduce((previous, current) => {
      return previous += current.exercises
  }, 0)
  return (
    <div>
        <h1>{course.name}</h1>
        <div>
            {course.parts.map((part) => {
                return <div key={part.id}>{part.name} {part.exercises}</div>
            })}
        </div>
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    </div>
  )
}

export default Course