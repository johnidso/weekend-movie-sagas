const { useEffect } = require("react");
const { useState } = require("react");
const { useSelector } = require("react-redux");


function AddMovie () {
    const [newMovie, setNewMovie] = useState({});
    const genres = useSelector(store => store.genres);
    useEffect(() => {
        dispatch({type:'GET_GENRES'});
    }, []);
    console.log(genres);
    return (
        <form>
            <input type='text' name='title' placeholder='movie title' />
            <input type='text' name='url' placeholder='movie poster url' />
            <input type='text' name='description' placeholder='movie description' />
            <select>
                {}
            </select>
            <input type='submit' name='submit'>Submit</input>
        </form>
    )
}

export default AddMovie;