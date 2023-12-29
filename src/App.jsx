import { useState, useEffect } from "react" 
import { NewApplicationForm } from "./NewApplicationForm"
import { JobList } from "./Jobs/JobList"
import { RejectionList } from "./Rejections/RejectionList"
import { InterviewList } from "./Interviews/InterviewList"
import "./styles.css"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ajzugslajkcgxyljgftt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqenVnc2xhamtjZ3h5bGpnZnR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzgwMTE5OSwiZXhwIjoyMDE5Mzc3MTk5fQ.m8esUIUm3OkEvkKfnsyH7-mRVbsJhymh-b06NAjO2YY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [interviews, setInterviews] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejections, setRejections] = useState([]);

  useEffect(() => {
    fetchInterviews();
    fetchPending();
    fetchRejections();
  }, []);

  async function fetchInterviews() {
    let { data: interviews, error } = await supabase
      .from("Interviewing")
      .select("*");
    if (error) console.error("Error loading interviews", error);
    else setInterviews(interviews);
  }

  async function fetchPending() {
    let { data: pending, error } = await supabase
      .from("Pending")
      .select("*");
    if (error) console.error("Error loading pending jobs", error);
    else setPending(pending);
  }

  async function fetchRejections() {
    let { data: rejections, error } = await supabase
      .from("Rejections")
      .select("*");
    if (error) console.error("Error loading rejections", error);
    else setRejections(rejections);
  }

  //used to be addJob
  async function addPending(jobTitle, companyTitle) {
    let newJob = jobTitle + " at " + companyTitle;
    setPending(currentJobs => [...currentJobs, {id: null, job: newJob}]);

    let { data, error } = await supabase
      .from('Pending')
      .insert({job: newJob});

      if (error) {
        console.error("Error adding job to Pending", error);
      } else {
        fetchPending(); // refetch the jobs from the database
      }

  }

  async function deleteInterview(id) {
    let job;
    for (let i = 0; i < pending.length; i++) {
      if(pending[i].id === id) {
        job = pending[i];
        break;
      }
    }
    let jobName = job.job;
  
    let { error: insertError } = await supabase
      .from('Interviewing')
      .insert({id:id, job: jobName});
    if (insertError) {
      console.error("Error adding job to Interviewing", insertError);
      return;
    }
  
    let { error: deleteError } = await supabase
      .from('Pending')
      .delete()
      .match({ id: id });
    if (deleteError) {
      console.error("Error deleting job from Pending", deleteError);
      // If there's an error, remove the job from Interviewing
      await supabase
        .from('Interviewing')
        .delete()
        .match({ job: jobName });
      return;
    }
  
    setInterviews((currentJobs) => [...currentJobs, { id: id, job: jobName }]);
    setPending(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    });
  }

  async function deleteJob(id) {
    let job;
    for (let i = 0; i < pending.length; i++) {
      if(pending[i].id === id) {
        job = pending[i];
        break;
      }
    }
    let jobName = job.job;
  
    let { error: insertError } = await supabase
      .from('Rejections')
      .insert({job: jobName});
    if (insertError) {
      console.error("Error adding job to Rejections", insertError);
      return;
    }
  
    let { error: deleteError } = await supabase
      .from('Pending')
      .delete()
      .match({ id: id });
    if (deleteError) {
      console.error("Error deleting job from Pending", deleteError);
      // If there's an error, remove the job from Rejections
      await supabase
        .from('Rejections')
        .delete()
        .match({ job: jobName });
      return;
    }
  
    setRejections((currentJobs) => [...currentJobs, { id: id, job: jobName }]);
    setPending(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    });
  }

  //deletes completely
  async function deleteRejection(id) {
    let { error } = await supabase
      .from('Rejections')
      .delete()
      .match({ id: id });
  
    if (error) {
      console.error("Error deleting job from Rejections", error);
      return;
    }
  
    setRejections(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    });
  }

  //deletes from interviews and adds to the rejections
  async function erase(id) {
    let job;
    for (let i = 0; i < interviews.length; i++) {
      if(interviews[i].id === id) {
        job = interviews[i];
        break;
      }
    }
    let jobName = job.job;
  
    let { error: insertError } = await supabase
      .from('Rejections')
      .insert({job: jobName});
    if (insertError) {
      console.error("Error adding job to Rejections", insertError);
      return;
    }
  
    let { error: deleteError } = await supabase
      .from('Interviewing')
      .delete()
      .match({ id: id });
    if (deleteError) {
      console.error("Error deleting job from Interviewing", deleteError);
      // If there's an error, remove the job from Rejections
      await supabase
        .from('Rejections')
        .delete()
        .match({ job: jobName });
      return;
    }
  
    setRejections((currentJobs) => [...currentJobs, { id: id, job: jobName }]);
    setInterviews(currentJobs => {
      return currentJobs.filter(job => job.id !== id)
    });
  }

  

  return (
    <>
    <div className="container">
    <div className="left">
    <NewApplicationForm onSubmitJob={addPending}/> 
  <h1 className="header">Pending applications</h1>
    <JobList 
    jobs={pending} 
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