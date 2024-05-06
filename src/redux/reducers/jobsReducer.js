const initialState = {
    jobs: [],
    filteredJobs: [],
    offset: 0,
    limit: 10,
    loading: false,
    error: null,
    filters: {},
};

const jobsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_JOBS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case 'FETCH_JOBS_SUCCESS':
            const newJobs = state.offset === 0 ? action.jobs : [...state.jobs, ...action.jobs];

            return {
                ...state,
                loading: false,
                jobs: newJobs, // Keep original jobs array
                filteredJobs: action.jobs, // Store newly fetched jobs
                offset: state.offset + state.limit,
            };

        case 'FETCH_JOBS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: action.filters,
            }

        case 'RESET_JOBS':
            return {
                ...state,
                jobs: [],
                filteredJobs: [],
                offset: 0,
            }
        default:
            return state;
    }
};

export default jobsReducer;
