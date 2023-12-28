import { useState, useEffect } from "react" 
import { NewApplicationForm } from "./NewApplicationForm"
import { JobList } from "./Jobs/JobList"
import { RejectionList } from "./Rejections/RejectionList"
import { InterviewList } from "./Interviews/InterviewList"
import "./styles.css"

export default function App() {
  const [interviews, setInterviews] = useState(() => {
    const localValue = localStorage.getItem("INTERVIEWS");
    if (localValue === null) return []

    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("INTERVIEWS", JSON.stringify(interviews));
  }, [interviews])

  const [rejections, setRejections] = useState(() => {
    const localValue = localStorage.getItem("REJECTIONS");
    if (localValue === null) return []

    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("REJECTIONS", JSON.stringify(rejections));
  }, [rejections])

  const [jobs, setJobs] = useState(() => {
    const localValue = localStorage.getItem("JOBS");
    if (localValue === null) return []

    return JSON.parse(localValue)
  })
  useEffect(() => { 
    localStorage.setItem("JOBS", JSON.stringify(jobs));
  }, [jobs])

  function addJob(jobTitle, companyTitle) {

    let id = crypto.randomUUID();
    setJobs((currentJobs) => {
      return [
        ...currentJobs, 
        { id, jobTitle, completed: false, companyTitle},
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

  function deleteInterview(id) {
    let job = [];
    for (let i = 0; i < jobs.length; i++) {
      if(jobs[i].id === id) {
        job = jobs[i]
        break;
      }
    }
    setInterviews((currentInterviews) => {
      return [
        ...currentInterviews, 
        job
      ]
    })
    
    setJobs(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    })
  }
  
  function deleteJob(id) { 
    let job = [];
    for (let i = 0; i < jobs.length; i++) {
      if(jobs[i].id === id) {
        job = jobs[i]
        break;
      }
    }
    setRejections((currentRejections) => {
      return [
        ...currentRejections, 
        job
      ]
    })

    setJobs(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    })

  }

  function deleteRejection(id) {
    setRejections(currentRejections => {
      return currentRejections.filter(job => job.id !== id)
    })
  }

  
  function erase(id) {
    let interview = [];
    for (let i = 0; i < interviews.length; i++) {
      if(interviews[i].id === id) {
        interview = interviews[i]
        break;
      }
    }
    setRejections((currentRejections) => {
      return [
        ...currentRejections, 
        interview
      ]
    })

    setInterviews(currentInterviews => {
      return currentInterviews.filter(job => job.id != id);
    })
  }
  

  return (
    <>
    <div className="container">
    <div className="left">
    <NewApplicationForm onSubmitJob={addJob}/> 
  <h1 className="header">Pending applications</h1>
    <JobList 
    jobs={jobs} 
    toggleJob={toggleJob} 
    deleteJob={deleteJob}
    deleteInterview={deleteInterview}
    />
    </div>
    <div className="center">
      <h1 className="header">Rejections</h1>
      <RejectionList 
      rejections={rejections}
      deleteRejection={deleteRejection}/>
    </div>
    <div className="right">
      <h1 className="header">Interviewing</h1>
      <InterviewList 
      interviews={interviews}
      erase={erase}/>
    </div>
    </div>
  </>
  )
}