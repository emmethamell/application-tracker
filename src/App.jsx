import { useState, useEffect } from "react" //useState takes default value, and 
import "./styles.css"
import { NewApplicationForm } from "./NewApplicationForm"
import { JobList } from "./JobList"
//with components in react, you can only ever return one element. In this case everything is inside the one div
//if you want to return multiple elements from a component you can use a fragment, which is like a div wrapping everything but its empty
export default function App() {
  //FOR COMPANY
  const[companies, setCompanies] = useState([]) //change default to get the local storage

  function addCompany(title) {
    setCompanies((currentCompanies) => {
      return [
        ...currentCompanies, 
        { id: crypto.randomUUID(), title, completed: false},
      ]  
    })
  }

  //call when the job is deleted
  function deleteCompany(id) {
    setCompanies(currentCompanies => {
      return currentCompanies.filter(company => company.id != id)
    })
  }




  //FOR JOBS
  const [jobs, setJobs] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return []

    return JSON.parse(localValue)
  })
  useEffect(() => { 
    localStorage.setItem("ITEMS", JSON.stringify(jobs));
  }, [jobs])

//for both job and company
  function addJob(jobTitle, companyTitle) {

    let id = crypto.randomUUID();
    setJobs((currentJobs) => {
      return [
        ...currentJobs, 
        { id, jobTitle, completed: false, companyTitle},
      ]  
    })
    setCompanies((currentCompanies) => {
      return [
        ...currentCompanies,
        { id, companyTitle, completed: false}
      ]
    })
    
  }
  function toggleJob(id, completed) {
    setJobs(currentJobs => {
      return currentJobs.map(job => {
        if (job.id === id) {
          return { ...job, completed}
        }

        return job
      })
    })
  }
  function deleteJob(id) {
    setJobs(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    })
  }  

  //the NewApplicationForm below is a react custom component we built
  //react knows this because it starts with a capital letter
  return (
    <> 
    <NewApplicationForm onSubmitJob={addJob}/> 
  <h1 className="header">Pending applications</h1>
    <JobList 
    jobs={jobs} 
    toggleJob={toggleJob} 
    deleteJob={deleteJob}
    />
  </>
  )
}