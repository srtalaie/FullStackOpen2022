import { CoursePart } from "../types"

const Total = (props: { courses: Array<CoursePart> }) => {
  const { courses } = props
  return (
    <div>
      <h3>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h3>
    </div>
  )
}

export default Total