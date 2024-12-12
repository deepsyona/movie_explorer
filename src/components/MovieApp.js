import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { AiOutlineSearch } from "react-icons/ai";

const MovieApp = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [expandedMovieId, setExpandedMovieId] = useState(null)

  useEffect(() => {
  const fetchGenres = async() => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params:{
          api_key: 'f0cc67b7a47c1dfee4ebb2ba51f8a75e',
        },
      }
    );
    setGenres(response.data.genres)
  }
  fetchGenres()
  }, [])
  
  useEffect(() => {
   const fetchMovies = async()=> {
    const response = await axios.get(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: 'f0cc67b7a47c1dfee4ebb2ba51f8a75e',
          sort_by: sortBy,
          page: 1,
          with_genres: selectedGenre,
          query: search
        }
      }
    )
    setMovies(response.data.results)
   }
   fetchMovies()
  }, [search, sortBy, selectedGenre])
  

  const handleSearchChange = (e)=> {
    setSearch(e.target.value)
  }
  const handleSearchClick = async()=>{
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        api_key : 'f0cc67b7a47c1dfee4ebb2ba51f8a75e',
        query: search,
      },
    }
  );
  setMovies(response.data.results)
  console.log(response.data.results)
  }

  const handleSortChange = (e)=> {
    setSortBy(e.target.value)
  }
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
  }

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId)
  }
  
  return (
    <div className='bg-gray-900 h-full m-auto '>
      <div className='px-10 py-20 text-center items-center'>
      <h1 className='bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-transparent bg-clip-text font-extrabold font-anta text-7xl mb-4'>Movie Explorer</h1>
      <div className='flex justify-center gap-5 mb-5 items-center'>
        <input className='p-2 w-[25%] border-2 border-emerald-600 rounded-2xl font-semibold shadow-lg mt-5' type="text" placeholder='Search movies...' 
        onChange={handleSearchChange}/>
        <button onClick={handleSearchClick}
        className='flex border-2 border-emerald-600 items-center px-3 py-3 mt-5 rounded-full cursor-pointer bg-white'><AiOutlineSearch /></button>
      </div>
      <div>
        <label className='bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold px-2' htmlFor="sort_by">Sort By:</label>
        <select className='rounded-2xl bg-[#424242] text-white text-center py-1 border-x-2 border-emerald-400' value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="rating.desc">Rating Descending</option>
          <option value="rating.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
        <label className='bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text px-2' htmlFor="genre">Genre:</label>
        <select className='rounded-2xl bg-[#424242] text-white text-center py-1 border-x-2 border-emerald-400 overflow-scroll max-h-7' value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre)=>(
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-4 gap-5 p-5 mt-5'>
        {movies.map((movie)=>(
          <div key={movie.id}
          className='bg-gradient-to-r from-gray-700 to-gray-800 p-5 rounded-md shadow-md text-white'>
            <img className='rounded-md'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2 className='text-lg font-bold mt-2'>{movie.title}</h2>
            <p className='font-semibold text-yellow-400 px-2 mt-1'>Rating: {movie.vote_average}</p>
            {expandedMovieId === movie.id ? (
             <p>{movie.overview}</p>) : (<p>{movie.overview.substring(0, 150)}...</p>)
            }

            <button className='bg-gray-500 px-1 py-1 text-white rounded-md mt-4'
             onClick={()=> toggleDescription(movie.id)}>
              {expandedMovieId===movie.id ? 'Show Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default MovieApp
