import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import './AddMovie.css';


function AddMovie () {
    const emptyMovie = {title: '', poster: '', description:'', genre:'', genre_id: ''};
    const [newMovie, setNewMovie] = useState(emptyMovie);
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();

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

    // Handle changes to the dropdown, specifically to accomodate passing the genre id
    const handleSelect = event => {
        const value = event.target.value;
        setNewMovie({
            ...newMovie, [event.target.name]: value, ['genre_id']: event.target.selectedIndex+1
        });
    }

    // Post new movie 
    const handleSubmit = () => {
        dispatch({type:'ADD_MOVIE', payload: newMovie});
        setNewMovie(emptyMovie);
        history.push('/');
    }

    // Add Movie form 
    return (
        <>
        
        <form onSubmit={handleSubmit}>
            
            <input type='text' placeholder='movie title' value={newMovie.title} name='title' onChange={handleChange} />
            <input type='text' placeholder='poster url' value={newMovie.poster} name='poster' onChange={handleChange}  />
            <input type='text' placeholder='movie description' value={newMovie.description} name='description' onChange={handleChange} />
            <select onChange={handleSelect} name='genre' value={newMovie.genre}>
                {/* Iterate through all genres available from DB */}
                {genres.map(genre => { 
                    return (
                    <option key={genre.id} name={genre.name}>{genre.name}</option>
                    )
                })}
            </select>
            <section id='buttons'>
                <Button className='navButtons' variant="outlined" onClick={()=> {
                history.push('/');
                }}>Back</Button>
                <Button className='navButtons' variant='contained' color='primary' type='submit'>Submit</Button>
            </section>
        </form>
        </>
    )
}

export default AddMovie;