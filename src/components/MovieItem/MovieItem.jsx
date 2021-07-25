import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router";

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
        <>
            {/* props might not be the way to go here - RESEARCH */}
            <h1>{movieResponse[0].title}</h1> 
            <img src={movieResponse[0].poster} />
            <p>{movieResponse[0].description}</p>
            <h2>Genres</h2>
            <ul>
                {/* iterates over genres present */}
                {movieResponse.map((movie, index) =>{
                    return <li key={index}>{movie.genre_name}</li>
                })}
            </ul>
            <br />
            <button onClick={()=> {
                history.push('/');
                }}>Back</button>
        </>
    )
}

export default MovieItem;