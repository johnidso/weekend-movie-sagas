const { useState } = require("react");


function AddMovie () {
    const [newMovie, setNewMovie] = useState({});

    return (
        <form>
            <input type='text' name='title' placeholder='movie title' />
            <input type='text' name='url' placeholder='movie poster url' />
            <input type='text' name='description' placeholder='movie description' />
            <select>
                <option
            </select>
            <input type='submit' name='submit'>Submit</input>
        </form>
    )
}