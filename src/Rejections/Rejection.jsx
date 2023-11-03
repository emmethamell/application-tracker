/* eslint-disable react/prop-types */


export function Rejection({ id, jobTitle, companyTitle, deleteRejection}) {

    return (
        <li>
            {jobTitle + " for " + companyTitle}
            <button 
            onClick={() => deleteRejection(id)}
            className="little-button">
            X
        </button>
        </li>
    )
}