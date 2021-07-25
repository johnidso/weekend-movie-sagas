import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // Get all movies from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // Handle click of 'add a movie'
    const handleClick = (event) => {
        event.preventDefault();
        history.push(`/movie/${event.target.id}`);
    }

    return (
        <main>
            <h1>My Movies</h1>
            <Button variant="outlined" onClick ={() => {
                history.push('/addMovie');
            }}>Add a Movie</Button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                            <div key={movie.id} className='moviePosters' >
                                <h3>{movie.title}</h3>
                                <Paper elevation={3}>
                                    <img onClick={handleClick} id={movie.id} src={movie.poster} alt={movie.title}/>
                                </Paper>
                            </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;