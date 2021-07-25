import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function AddMovie () {
    const emptyMovie = {title: '', poster: '', description:'', genre:''};
    const [newMovie, setNewMovie] = useState(emptyMovie);
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    console.log('Current state', newMovie);

    // Get genres from store
    useEffect(() => {
        dispatch({type:'GET_GENRES'});
    }, []);

    // Handle changes to state from several inputs 
    const handleChange = event => {
        const value = event.target.value;
        setNewMovie({
            ...newMovie, [event.target.name]: value
        });
    }

    // Post new movie 
    const handleSubmit = () => {
        dispatch({type:'ADD_MOVIE', payload: newMovie});
        setNewMovie(emptyMovie);
    }

    // Add Movie form 
    return (
        <>
        <form onSubmit={handleSubmit}>
            
            <input type='text' placeholder='movie title' value={newMovie.title} name='title' onChange={handleChange} />
            <input type='text' placeholder='poster url' value={newMovie.poster} name='poster' onChange={handleChange}  />
            <input type='text' placeholder='movie description' value={newMovie.description} name='description' onChange={handleChange} />
            <select onChange={handleChange} name='genre' value={newMovie.genre}>
                {/* Iterate through all genres available from DB */}
                {genres.map(genre => { 
                    return (
                    <option key={genre.id} name={genre.name}>{genre.name}</option>
                    )
                })}
            </select>
            <button type='submit'>Submit</button>

        </form>
        </>
    )
}

export default AddMovie;