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


export default function Books() {
    const classes = useStyles();

    const [Books, setBooks] = useState([]);
    useEffect(() => {
      BooksGet()
    }, [])

    const BooksGet = () => {
        fetch("https://www.mecallapi.com/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setBooks(result)
                }
            )
    }

    const UpdateBooks = id => {
        window.location = '/update/' + id
    }

    const BooksDelete = id => {
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
                        BooksGet();
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
                            Books
                        </Typography>
                    </Box>
                    {/* <Box align="right">
                        <Link to="/LoansCreate">
                            <Button variant="contained" color="primary">
                                Search
                            </Button>
                        </Link>
                    </Box> */}
                </Box>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Book Id</TableCell>
                                <TableCell align="left">Book Name</TableCell>
                                <TableCell align="left">Book Age</TableCell>
                                <TableCell align="left">Book City</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Books.map((Book) => (
                                <TableRow key={Book.id}>
                                    <TableCell align="center">{Book.id}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" justifyContent="center">
                                            <Avatar src={Book.avatar} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{Book.fname}</TableCell>
                                    <TableCell align="left">{Book.lname}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button onClick={() => UpdateBooks(Book.id)}>Edit</Button>
                                            <Button onClick={() => BooksDelete(Book.id)}>Del</Button>
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

