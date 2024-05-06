import {
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE,
    UPDATE_FILTERS,
    RESET_JOBS,
} from "../actions/jobsActions";

const initialState = {
    jobs: [],
    offset: 0,
    loading: false,
    error: null,
    filters: {
        companyName: '',
        jobRole: '',
        location: '',
        minExp: '',
        minJdSalary: '',
    },
};

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOBS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_JOBS_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: state.offset === 0 ? action.jobs : [...state.jobs, ...action.jobs],
                offset: state.offset + action.jobs.length,
            };

        case FETCH_JOBS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.filters,
            };

        case RESET_JOBS:
            return {
                ...state,
                jobs: [],
                offset: 0,
            };

        default:
            return state;
    }
};

export default jobsReducer;
