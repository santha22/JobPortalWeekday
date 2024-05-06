import React from "react";
import JobListings from "./components/JobListing";
import Filters from "./components/Filters";
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm" style={{maxWidth: '1000px'}}>
      
        <div style={{marginTop: "20px"}}>
          <Filters />
        </div>

        <div>
          <JobListings />
        </div>
    </Container>
  );
}


export default App;
