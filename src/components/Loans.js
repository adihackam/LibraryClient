import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // color: theme.palette.text.primary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
  },
}));

export default function LoansList() {
  const classes = useStyles();

  const [Loans, setLoans] = useState([]);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    LoansGet()
  }, [])
  
  const ExpiredGet = () => {
    LoansGet(!expired)
    setExpired(!expired)
  }

  const LoansGet = (showExpired = false) => {
    let url = "http://127.0.0.1:5000/loans"
    if (showExpired) {
      url = "http://127.0.0.1:5000/expiredLoans"
    }

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setLoans(result)
        }
      )
      .then(() => {
        console.log("LoansGet")
      }) 
  }

  const LoansDelete = id => {
    var data = {
      'id': id
    }
    fetch(`http://127.0.0.1:5000/loans/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        LoansGet();
      }
    )
  }

  return (
    // <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                LOANS
              </Typography>
            </Box>
            <Box align="right">
              <Link to="/LoansCreate">
                <Button variant="contained" color="primary">
                  LOAN
                </Button>
              </Link>
            </Box>
            <Box>
              <FormControlLabel
                sx={{
                  display: 'block',
                }}
                control={
                  <Switch
                    checked={expired}
                    onChange={ExpiredGet}
                    name="expired"
                    color="primary"
                  />
                }
                label="Show Expired loans"
              />              
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Customer Id</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="left">Book Id</TableCell>
                <TableCell align="left">Book Name</TableCell>
                <TableCell align="left">Loan Date</TableCell>
                <TableCell align="left">Return Date</TableCell>            
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Loans.map((Loan) => (
                <TableRow key={Loan.id}>
                  <TableCell align="center">{Loan.customerId}</TableCell>
                  <TableCell align="center">{Loan.customerName}</TableCell>
                  <TableCell align="center">{Loan.bookId}</TableCell>
                  <TableCell align="center">{Loan.bookName}</TableCell>                                   
                  <TableCell align="left">{Loan.loanDate}</TableCell>
                  <TableCell align="left">{Loan.returnDate}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => LoansDelete(Loan.id)}>Return</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    // </div>
    
  );
}

