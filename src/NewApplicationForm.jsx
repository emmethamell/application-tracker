import { useState } from "react"

// eslint-disable-next-line react/prop-types
export function NewApplicationForm({ onSubmitJob }) {
    const [newJob, setNewJob] = useState("")
    const [newCompany, setNewCompany] = useState("")

    function handleSubmit(e) { 
        e.preventDefault()
        
        if (newJob === "" || newCompany == "") return; 
        onSubmitJob(newJob, newCompany)
        setNewJob("")
        setNewCompany("")

    }

    return (
        <form onSubmit={handleSubmit} className="new-job-form">
            <div className="form-row">
                <label htmlFor="job">POSITION</label> 
                <input value={newJob} onChange={e => setNewJob(e.target.value)} type="text" id="job" autoComplete="off"></input>
                <label htmlFor="company">COMPANY</label>
                <input value={newCompany} onChange={e => setNewCompany(e.target.value)} type="text" id="company" autoComplete="off"></input>
            </div>
            <button className="btn">add</button>
        </form>
    )
}