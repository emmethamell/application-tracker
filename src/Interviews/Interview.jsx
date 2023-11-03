/* eslint-disable react/prop-types */


export function Interview({ id, jobTitle, companyTitle, erase}) {
    return (
        <li>
            {jobTitle + " for " + companyTitle}
            <button 
            onClick={() => erase(id)} 
            className="little-button">
            X
        </button>
        </li>
    )
}