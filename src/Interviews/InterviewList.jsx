/* eslint-disable react/prop-types */
import { Interview } from "./Interview.jsx"

export function InterviewList( {interviews, erase } ) {
    return (
        <ul className="list list-center">
            {interviews.length === 0 && "No Interviews"}
            {interviews.map(interview => {
              return (
                <Interview 
                {...interview}
                key={interview.id} 
                erase={erase}
                />
              )  
            })}
        </ul>

    )
}