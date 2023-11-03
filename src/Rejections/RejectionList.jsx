/* eslint-disable react/prop-types */
import { Rejection } from "./Rejection.jsx"

export function RejectionList( {rejections, deleteRejection} ) {
    return (
        <ul className="list list-center">
            {rejections.length === 0 && "No Rejections"}
            {rejections.map(rejection => {
              return (
                <Rejection 
                {...rejection}
                key={rejection.id} 
                deleteRejection={deleteRejection}
                />
              )  
            })}
        </ul>

    )
}
