

function MovieItem (props) {
    
    return(
        <>
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