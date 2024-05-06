export const fetchJobsRequest = () => ({
    type: 'FETCH_JOBS_REQUEST',
});

export const fetchJobsSuccess = (jobs) => ({
    type: 'FETCH_JOBS_SUCCESS',
    jobs,
});

export const fetchJobsFailure = (error) => ({
    type: 'FETCH_JOBS_FAILURE',
    error,
});

export const updateFilters = (filters) => ({
    type: 'UPDATE_FILTERS',
    filters,
});

export const resetJobs = () => ({
    type: 'RESET_JOBS',
});

export const fetchJobs = ({ limit, offset }) => {
    return async (dispatch, getState) => {
        dispatch(fetchJobsRequest());

        try {
            const { filters } = getState().jobs;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            const body = JSON.stringify({
                limit,
                offset,
                ...filters,   //include filter parameters
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body,
            };

            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const result = await response.json();
            // dispatch(fetchJobsSuccess(result.jobs)); 
            
            // Check if the data structure is correct
            if (result.jdList && Array.isArray(result.jdList)) {
                dispatch(fetchJobsSuccess(result.jdList)); // Correct dispatching with valid data
            } else {
                throw new Error('Invalid job data structure');
            }

        } catch (error) {
            dispatch(fetchJobsFailure(error.message));
        }
    }
}