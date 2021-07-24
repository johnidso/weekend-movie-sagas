import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function MovieItem (props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    console.log(movies);

    // make a GET saga I can dispatch against to get specific movie info from an ID
    useEffect(() => {
        dispatch({type:'GET_MOVIE', payload: id});
    }, []);
    
    
    return(
        <>
            {/* props might not be the way to go here - RESEARCH */}
            <h2>Test</h2>
            <h1>{movies.title}</h1> 
            <img src={movies.poster} />
            <p>{movies.description}</p>
            <h2>Genres</h2>
            <ul>
                {/* iterates over genres present */}
                {/* {movies.genre_name.map(genre =>{
                    return <li>{genre}</li>
                })} */}
            </ul>
        </>
    )
}

export default MovieItem;