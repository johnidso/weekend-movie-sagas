import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function MovieItem () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieResponse = useSelector(store => store.movies);

    // make a GET saga I can dispatch against to get specific movie info from an ID
    useEffect(() => {
        dispatch({type:'GET_MOVIE', payload: id});
    }, []);
    
    
    return(
        <>
            {/* props might not be the way to go here - RESEARCH */}
            <h2>Test</h2>
            <h1>{movieResponse[0].title}</h1> 
            <img src={movieResponse[0].poster} />
            <p>{movieResponse[0].description}</p>
            <h2>Genres</h2>
            <ul>
                {/* iterates over genres present */}
                {movieResponse.map(movie =>{
                    return <li>{movie.genre_name}</li>
                })}
            </ul>
        </>
    )
}

export default MovieItem;