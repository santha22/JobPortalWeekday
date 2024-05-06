import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, resetJobs, fetchJobs } from '../redux/actions/jobsActions';
import { Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import { Grid } from '@mui/material';

const Filters = () => {

    const initialFilterState = {
        companyName: '',
        jobRole: '',
        location: '',
        minExp: '',
        remote: '',
        minJdSalary: '',
    };

    const [filters, setFilters] = useState(initialFilterState);
    // const [fetching, setFetching] = useState(false);

    

    const dispatch = useDispatch();

    const jobData = useSelector((state) => state.jobs || []);


    const uniqueRoles = [...new Set(jobData.jobs?.map((job) => job.jobRole))].filter((role) => role);

    // Default to an empty array if no unique roles
    const availableRoles = uniqueRoles.length > 0 ? uniqueRoles : ['']; // Include a default value

    const uniqueLocations = [...new Set(jobData.jobs?.map((job) => job.location))].filter((location) => location)

    const uniqueCompanyName = [...new Set(jobData.jobs?.map((job) => job.companyName))].filter((companyName) => companyName)

    const uniqueMinExperience = [...new Set(jobData.jobs?.map((job) => job.minExp))]
        .filter((minExp) => minExp)
        .sort(function (a, b) {
            return a - b;
        })


    const uniqueMInBasePay = [...new Set(jobData.jobs?.map((job) => job.minJdSalary))]
        .filter((minJdSalary) => minJdSalary)
        .sort(function (a, b) {
            return a - b;
        })

    // In any component where you want to check the filtered jobs
    
    // set the input values 
    const handleFilterChange = (e) => {
        let { name, value } = e.target;
        
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // to apply filters 
    const applyFilters = () => {
        dispatch(resetJobs());
        dispatch(updateFilters(filters));
        dispatch(fetchJobs({ limit: 10, offset: 0 }));
    };

    // to clear the filters 
    const clearFilters = () => {
        setFilters(initialFilterState); // Reset local component state
        dispatch(resetJobs()); // Reset Redux jobs and offset
        dispatch(updateFilters({})); // Clear Redux filters
        dispatch(fetchJobs({ limit: 10, offset: 0 })); // Fetch without filters
    };


    return (
        <Grid container spacing={2}>
            {/* Experience  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id='minExp-label'>Experience</InputLabel>
                    <Select
                        labelId='minExp-label'
                        name='minExp'
                        value={uniqueMinExperience.includes(filters.minExp) ? filters.minExp : ''}
                        onChange={handleFilterChange}
                    >
                        {uniqueMinExperience?.map((minExp) => (
                            <MenuItem key={minExp} value={minExp}>
                                {minExp}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* company name  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id='companyName-label'>Company Name</InputLabel>
                    <Select
                        labelId='companyName-label'
                        name='companyName'
                        value={uniqueCompanyName.includes(filters.companyName) ? filters.companyName : ''}
                        onChange={handleFilterChange}
                    >
                        {uniqueCompanyName?.map((companyName) => (
                            <MenuItem key={companyName} value={companyName}>
                                {companyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* location  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id='location-label'>Locations</InputLabel>
                    <Select
                        labelId='location-label'
                        name='location'
                        value={uniqueLocations.includes(filters.location) ? filters.location : ''}
                        onChange={handleFilterChange}
                    >
                        {uniqueLocations?.map((location) => (
                            <MenuItem key={location} value={location}>
                                {location}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* remote / on-site  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="remote-label">Remote/On-Site</InputLabel>
                    <Select
                        labelId="remote-label"
                        name="remote"
                        value={filters.remote}
                        onChange={handleFilterChange}
                        label="Remote/On-Site"
                    >
                        <MenuItem value="remote">Remote</MenuItem>
                        <MenuItem value="on-site">On-Site</MenuItem>
                    </Select>
                </FormControl>
            </Grid>


            {/* role  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="jobRole"
                        value={availableRoles.includes(filters.jobRole) ? filters.jobRole : ''} // Use empty string as a fallback if out of range
                        onChange={handleFilterChange}
                    >
                        {availableRoles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

            </Grid>

            {/* salary  */}
            <Grid item xs={12} sm={4} md={2}>
                <FormControl fullWidth>
                    <InputLabel id='minJdSalary-label'>Min Base Pay</InputLabel>
                    <Select
                        labelId='minJdSalary-label'
                        name='minJdSalary'
                        value={uniqueMInBasePay.includes(filters.minJdSalary) ? filters.minJdSalary : ''}
                        onChange={handleFilterChange}
                    >
                        {uniqueMInBasePay?.map((minJdSalary) => (
                            <MenuItem key={minJdSalary} value={minJdSalary}>
                                {minJdSalary}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>
            </Grid>

            {/* Apply button*/}
            <Grid item xs={12} sm={4} md={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                    fullWidth
                >
                    Apply Filters
                </Button>
            </Grid>

            {/* clear the fileter */}
            <Grid item xs={12} sm={4} md={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearFilters}
                    fullWidth
                >
                    Clear Filters
                </Button>
            </Grid>
        </Grid>
    )
}

export default Filters;
