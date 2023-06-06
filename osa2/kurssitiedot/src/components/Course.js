const Course = ({course}) => (
    <div>
      <Header key={course.id} course={course.name} />
      <Content parts={course.parts} />
      <Totals parts={course.parts} />
    </div>
)

const Totals = ({parts}) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <p><b>total of {total} exercises</b></p>
    )
}

const Content = ({parts}) => {
    return ( 
    <div>
      {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
    </div>
    )
}

const Header = (props) => (
    <h2>{props.course}</h2>
)
  
const Part = (props) => (
    <p>{props.part} {props.exercises}</p>
)

export default Course