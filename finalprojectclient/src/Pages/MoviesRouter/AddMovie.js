import React, { useState } from 'react'
import { postNewMovie } from '../../DataUtils/BL/moviesBL'
import { useHistory } from 'react-router-dom'

const AddMovie = () => {
    const [button, setButton] = useState(0)
    const [movie, setMovie] = useState({ Name: "", Genres: "", Image: "", Premiered: "" })

    const history = useHistory()

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const addMovie = async (e) => {
        e.preventDefault()
        if (button === 1) {
            let genres = movie.Genres.split(',')
            let movieObj = {
                Name: movie.Name,
                Genres: genres,
                Image: movie.Image,
                Premiered: movie.Premiered
            }
            const res = await postNewMovie(movieObj)
            console.log(res)
            console.log("Movie Added")
            history.goBack()
        } else {
            console.log("cancel")
            history.goBack()
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <form onSubmit={addMovie}>
                <label>Name: </label>
                <input type="text" name="Name" value={movie.Name} onChange={handleChange} /><br />
                <label>Genres: </label>
                <input type="text" name="Genres" value={movie.Genres} onChange={handleChange} /><br />
                <label>Image url: </label>
                <input type="text" name="Image" value={movie.Image} onChange={handleChange} /><br />
                <label>Premired: </label>
                <input type="date" name="Premiered" value={movie.Premiered} onChange={handleChange} /><br /><br />
                <button type="submit" onClick={() => setButton(1)} >Add</button>
                <button type="submit" onClick={() => setButton(2)} >Cancel</button>
            </form>
        </div>
    )
}

export default AddMovie
