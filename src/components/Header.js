import React, { useEffect, useState } from 'react'
import {
    AppBar,
    Autocomplete,
    Box,
    IconButton,
    Tab,
    Tabs,
    TextField,
    Toolbar
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../Store';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data.movies)).catch((err) => console.log(err));
    }, []);
    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout())

    }
    const handleChange = (e, val) => {
        const movie = movies.find((m) => m.title === val);
        console.log(movie);
        if (isUserLoggedIn && movie) {
            navigate(`/booking/${movie._id}`);
        }
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
            <Toolbar>
                <Box width={"20%"}>
                    <IconButton LinkComponent={Link} to="/" >
                        <MovieIcon />
                        </IconButton>
                </Box>
                <Box width={"30%"} margin={"auto"}>
                    <Autocomplete
                        onChange={handleChange}
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant='standard' {...params} placeholder="Search Movies" />}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs
                        textColor="inherit"
                        indicatorColor='secondary'
                        value={value}
                        onChange={(e, val) => setValue(val)}>


                        <Tab LinkComponent={Link} to='/movies' label="All Movies" />
                        {!isAdminLoggedIn && !isUserLoggedIn && [
                            <Tab key="auth" label="Auth" LinkComponent={Link} to='/auth' />,
                            <Tab key="admin" label="Admin" LinkComponent={Link} to='/admin' />
                        ]}
                        {isUserLoggedIn && [
                            <Tab key="profile" label="Profile" LinkComponent={Link} to='/user' />,
                            <Tab key="logout" onClick={() => logout(false)} label="Logout" LinkComponent={Link} to='/' />
                        ]}
                        {isAdminLoggedIn && [
                            <Tab key="add" label="Add Movie" LinkComponent={Link} to='/add' />,
                            <Tab key="profile-admin" label="Profile" LinkComponent={Link} to='/user-admin' />,
                            <Tab key="logout-admin" onClick={() => logout(true)} label="Logout" LinkComponent={Link} to='/' />
                        ]}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header