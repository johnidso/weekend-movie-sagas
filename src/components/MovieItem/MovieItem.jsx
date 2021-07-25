import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import './MovieItem.css';

function MovieItem () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const movieResponse = useSelector(store => store.movies);

    // make a GET saga I can dispatch against to get specific movie info from an ID
    useEffect(() => {
        dispatch({type:'GET_MOVIE', payload: id});
    }, []);
    
    return(
        <section id='movieContainer'>
            {/* props might not be the way to go here - RESEARCH */}
            <h1>{movieResponse[0].title}</h1> 
            <section className='movieDetails'>
                <img id='poster' src={movieResponse[0].poster} />
                <section id='posterText'>
                    <p id='description'>{movieResponse[0].description}</p>
                    <h2>Genres</h2>
                    {/* iterates over genres present */}
                    {movieResponse.map((movie, index) =>{
                        return <p className='genres' key={index}>{movie.genre_name}</p>
                    })}
                </section>
                <br />
                <Button variant="outlined" onClick={()=> {
                    history.push('/');
                    }}>Back</Button>
            </section>
        </section>
    )
}

export default MovieItem;