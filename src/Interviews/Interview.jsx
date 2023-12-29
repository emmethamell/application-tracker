/* eslint-disable react/prop-types */


export function Interview({ id, job, erase}) {
    return (
        <li>
            {job}
            <button 
            onClick={() => erase(id)} 
            className="little-button">
            X
        </button>
        </li>
    )
}