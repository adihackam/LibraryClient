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
  useEffect(() => {
    LoansGet()
  }, [])
  
  const LoansGet = () => {
    fetch("http://127.0.0.1:5000/loans")
      .then(res => res.json())
      .then(
        (result) => {
          setLoans(result)
        }
      )
  }

  const UpdateLoans = id => {
    window.location = '/update/'+id
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
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Customer Id</TableCell>
                <TableCell align="left">Book Id</TableCell>
                <TableCell align="left">Loan Date</TableCell>
                <TableCell align="left">Return Date</TableCell>            
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Loans.map((Loan) => (
                <TableRow key={Loan.id}>
                  <TableCell align="center">{Loan.customerId}</TableCell>
                  <TableCell align="center">{Loan.bookId}</TableCell>                  
                  <TableCell align="left">{Loan.loanDate}</TableCell>
                  <TableCell align="left">{Loan.returnDate}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateLoans(Loan.id)}>Edit</Button>
                      <Button onClick={() => LoansDelete(Loan.id)}>Del</Button>
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

