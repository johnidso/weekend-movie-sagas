import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

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
                            <img onClick={handleClick} id={movie.id} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;