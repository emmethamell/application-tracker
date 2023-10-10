// eslint-disable-next-line react/prop-types
export function Job({ completed, id, jobTitle, companyTitle, toggleJob, deleteJob}) {

    return (
    <li>
        <label>
            <input 
                type="checkbox" 
                checked = {completed} 
                onChange={e => toggleJob(id, e.target.checked)}
                />
            {jobTitle + " at " + companyTitle}
        </label>
        <button 
        onClick={() => deleteJob(id)}  
        className="btn btn-danger">rejected
        </button>
    </li>
    )
}