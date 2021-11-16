import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getMovieById, updateExistingMovie } from '../../DataUtils/BL/moviesBL'

const EditMovie = () => {
    const [movie, setMovie] = useState({ Name: "", Genres: [], Image: "", Premiered: Date() })
    const [button, setButton] = useState(1)

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        async function getMovie() {
            const movie = await getMovieById(id)
            let data = movie.Premiered.slice(0, 10)
            let movieObj = {
                Name: movie.Name,
                Genres: movie.Genres,
                Image: movie.Image,
                Premiered: data
            }
            setMovie(movieObj)
        }
        getMovie()
    }, [])

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const editMovie = async (e) => {
        e.preventDefault()
        if (button === 1) {
            let stringGenre = movie.Genres.toString()
            let genres = stringGenre.split(',')
            let movieObj = {
                Name: movie.Name,
                Genres: genres,
                Image: movie.Image,
                Premiered: movie.Premiered
            }
            const res = await updateExistingMovie(id, movieObj)
            console.log(res);
            console.log("Updated");
            history.goBack()
        }
        if (button === 2) {
            console.log("Cancel!");
            history.goBack()
        }
    }

    return (
        <div>
            <h1>Edit Movie : Movie Name</h1><br />
            <form onSubmit={editMovie}>
                <label>Name: </label>
                <input type="text" name="Name" value={movie.Name} onChange={handleChange} /><br />
                <label>Genres: </label>
                <input type="text" name="Genres" value={movie.Genres} onChange={handleChange} /><br />
                <label>Image url: </label>
                <input type="text" name="Image" value={movie.Image} onChange={handleChange} /><br />
                <label>Premired: </label>
                <input type="date" name="Premiered" value={movie.Premiered} onChange={handleChange} /><br /><br />
                <button
                    onClick={() => (setButton(1))}
                    type="submit"
                    name="update"
                >Update</button>
                <button
                    onClick={() => (setButton(2))}
                    type="submit"
                    name="cancel"
                >Cancel</button>
            </form>
        </div>
    )
}

export default EditMovie
