import React, { useEffect, useState } from 'react'
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [moviesList,setmovieList]=useState([])
    const [isLoading,setisLoading]=useState(false)

    const fetchMovies = async (query='') => {
        setisLoading(true)
        setErrorMessage('')
        try {
            const endpoint = query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`


            const response = await fetch(endpoint, API_OPTIONS)
            if (!response.ok) throw new Error('Network response was not ok')
            const data = await response.json()
            if(data.Response==='False'){
             setErrorMessage(data.Error || 'failed to fetch movies')
            }
            setmovieList(data.results || [])
        } catch (error) {
            console.error('Error while fetching data:', error)
            setErrorMessage('Error fetching movies. Please try again later.')
        }
        finally{
            setisLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm)
    }, [searchTerm])

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="Hero" />
                    <h1>
                        Find Your <span className="text-gradient">Movies</span> that you will enjoy without hassle
                    </h1>
                    <Search searchTerm={searchTerm} setsearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
                    {isLoading?(
                        <Spinner/>
                    ):errorMessage?(
                        <p className="text-red-500">{errorMessage}</p>
                    ):(
                        <ul>
                            {moviesList.map((movie)=>(
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}

                </section>
            </div>
        </main>
    )
}

export default App
