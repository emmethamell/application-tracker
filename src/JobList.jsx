import { Job } from "./Job.jsx"
// eslint-disable-next-line react/prop-types
export function JobList({ jobs, toggleJob, deleteJob }) {
    return (
    <ul className="list">
    {jobs.length === 0 && "No Applications"}
    {jobs.map(job => {
      return (
      < Job 
      {...job} 
      key={job.id} 
      toggleJob={toggleJob} 
      deleteJob={deleteJob}
      />
      )
    })}
  </ul>
  )
}
