// eslint-disable-next-line react/prop-types
export function Job({ id, jobTitle, companyTitle, deleteJob, deleteInterview}) {

    return (
    <li>
            {jobTitle + " at " + companyTitle}
        <button 
            onClick={() => deleteJob(id)}
            className="btn btn-danger">
            rejected
        </button>
        <button
            onClick={() => deleteInterview(id)}
            className="btn btn-success">
            interview
        </button>
    </li>
    )
}