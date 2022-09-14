import { CoursePart } from "../types"
import Part from "./Part"

const Content = (props: { courses: Array<CoursePart> }) => {
  const { courses } = props
  return (
    <div>
      {courses.map((course) => (
        <Part key={ course.name } course={course} /> 
      ))}
    </div>
  )
}

export default Content