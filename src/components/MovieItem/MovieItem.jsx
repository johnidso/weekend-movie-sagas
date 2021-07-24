import { useParams } from "react-router-dom";

function MovieItem (props) {
    const { id } = useParams();
    // make a GET saga I can dispatch against to get specific movie info from an ID
    return(
        <>
            {/* props might not be the way to go here - RESEARCH */}
            <h1>{props.title}</h1> 
            <img src={props.poster} />
            <p>{props.description}</p>
            <ul>
                {/* iterates over genres present */}
                {props.genres.map(genre =>{
                    return <li>{genre}</li>
                })}
            </ul>
        </>
    )
}

export default MovieItem;