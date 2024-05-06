import React, { useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  Avatar,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// Truncate a given text to a specified length
const truncateText = (text, length) => {
  if (typeof text !== 'string') {
    return ''; // Return an empty string or a default value if text is undefined or not a string
  }

  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// function to display the salary ranges 
const getSalaryRange = (minJdSalary, maxJdSalary, salaryCurrencyCode) => {
  if (minJdSalary == null && maxJdSalary == null) {
    return "Salary information not available"
  } else if (minJdSalary == null) {
    return `Estimated Salary: ${maxJdSalary} ${salaryCurrencyCode}`;
  } else if (maxJdSalary == null) {
    return `Estimated Salary: ${minJdSalary} ${salaryCurrencyCode}`;
  } else {
    return `Estimated Salary: ${minJdSalary} - ${maxJdSalary} ${salaryCurrencyCode}`;
  }
}


const JobCard = ({job}) => {
  // to check expanded or not 
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Card  style={{ marginBottom: '16px'}}>
      <CardContent>
        
        <Grid container alignItems='center' spacing={5}>
          <Grid item xs={1} sm={1} md={1}>
            <Avatar 
              src={job.logoUrl || ''}
              alt={job.companyName}
              style={{ width: 40, height: 40 }}
            />
          </Grid>
          <Grid item xs={11} sm={11} md={11}>
            <Typography variant='subtitle1'> {job.companyName} </Typography>
            <Typography variant='h6' component="div"> {job.jobRole} </Typography>
            <Typography variant='body2'> {job.location} </Typography>

          </Grid>


        </Grid>

        <Typography variant='body1'>
          {getSalaryRange(job.minJdSalary, job.maxJdSalary, job.salaryCurrencyCode)}
        </Typography>

        <Typography variant='subtitle2' fontWeight='bold'>About Company</Typography>
        <Typography variant='body2'>
          {expanded 
          ? job.jobDetailsFromCompany 
          : truncateText(job.jobDetailsFromCompany, 100)}
        </Typography>
        

        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography variant='h6'>View job</Typography>
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>

      <CardActions>
        <Typography variant='body2'>
          Experience Required: {job.minExp !== null ? job.minExp : 0} years
        </Typography>

        <Button 
          variant='contained' 
          color='primary' 
          size='small' 
          onClick={() => alert("Apply button clicked")}>
          Apply
        </Button>
      </CardActions>

    </Card>
  )
}

export default JobCard;
