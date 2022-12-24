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

export default function Customers() {
    const classes = useStyles();

    const [Customers, setCustomers] = useState([]);
    useEffect(() => {
        CustomersGet()
    }, [])

    const CustomersGet = () => {
        fetch("http://127.0.0.1:5000/customers")
            .then(res => res.json())
            .then(
                (result) => {
                    setCustomers(result)
                }
            )
    }

    const UpdateCustomers = id => {
        window.location = '/update/' + id
    }

    const CustomersDelete = id => {
        var data = {
            'id': id
        }
        fetch('https://www.mecallapi.com/api/users/delete', {
            method: 'DELETE',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert(result['message'])
                    if (result['status'] === 'ok') {
                        CustomersGet();
                    }
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
                            Customers
                        </Typography>
                    </Box>
                    <Box align="right">
                        <Link to="/CustomersCreate">
                            <Button variant="contained" color="primary">
                                ADD NEW CUSTOMER 
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Customer Id</TableCell>
                                <TableCell align="left">Customer Name</TableCell>
                                <TableCell align="left">Customer Age</TableCell>
                                <TableCell align="left">Customer City</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Customers.map((Customer) => (
                                <TableRow key={Customer.id}>
                                    <TableCell align="center">{Customer.id}</TableCell>
                                    <TableCell align="center">{Customer.name}</TableCell>
                                    <TableCell align="left">{Customer.age}</TableCell>
                                    <TableCell align="left">{Customer.city}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button onClick={() => UpdateCustomers(Customer.id)}>Edit</Button>
                                            <Button onClick={() => CustomersDelete(Customer.id)}>Del</Button>
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

