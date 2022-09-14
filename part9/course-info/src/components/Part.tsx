import { JsxElement } from "typescript";
import { CoursePart } from "../types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: { course: CoursePart }): any => {
  const { course } = props
  switch (course.type) {
    case "normal":
      return (
        <div key={course.name}>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
        </div>
      )
    case "groupProject":
      return (
        <div key={course.name}>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Group Project Count: {course.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div key={course.name}>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
          <p>Exercise Submission Link: {course.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div key={course.name}>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
          <p>Exercise Requirements: {course.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(course)
  }
}

export default Part