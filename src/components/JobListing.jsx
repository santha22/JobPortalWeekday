import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from "../redux/actions/jobsActions";
import JobCard from "./JobCard";
import { Grid, Typography } from '@mui/material';

const JobListings = () => {
    const dispatch = useDispatch();
    const jobData = useSelector((state) => state.jobs);
    const filters = useSelector((state) => state.jobs.filters);


    // Apply client-side filtering
    const getFilteredJobs = (jobs, filters) => {
        return jobs.filter((job) => {
            let matches = true;
            if (filters.companyName) {
                matches = matches && job.companyName === filters.companyName;
            }
            if (filters.jobRole) {
                matches = matches && job.jobRole === filters.jobRole;
            }
            if (filters.location) {
                matches = matches && job.location === filters.location;
            }
            if (filters.minExp) {
                matches = matches && job.minExp >= filters.minExp;
            }
            if (filters.minJdSalary) {
                matches = matches && job.minJdSalary >= filters.minJdSalary;
            }
            if (filters.remote) {
                if (filters.remote === 'remote'){
                    matches = matches && job.location === filters.remote;
                } else {
                    matches = matches && job.location !== filters.remote;
                }
            }
            return matches;
        });

    };
    
    // filtered Jobs
    const filteredJobs = getFilteredJobs(jobData.jobs, filters);


    // Refetch jobs when filters change
    useEffect(() => {
        dispatch(fetchJobs({ limit: 10, offset: 0 })); // Refetch with new filters
    }, [dispatch, filters]); // Use `filters` as a dependency to refetch when it changes


    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                dispatch(fetchJobs({ limit: 10, offset: jobData.offset }));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch, jobData.offset]);


    return (
        <Grid container spacing={2}>
            {/* conditional rendering */}
            {filteredJobs.length === 0 && jobData.loading === false ?
                (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            No jobs available for the selected filters
                        </Typography>
                    </Grid>
                ) :
                (
                    filteredJobs.map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <JobCard job={job} />
                        </Grid>
                    ))
                ) }
        </Grid>
    );
}

export default JobListings;