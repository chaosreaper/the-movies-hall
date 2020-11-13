/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'


//component style
import "./movieShowCase.css"


//custom componenets
import MoviePoster from "./MoviePoster"

//mui
import CircularProgress from '@material-ui/core/CircularProgress';


export default function MovieShowCase(props) {

    const [movies,setMovies] = useState([])

    let uri;


    if(props.search.trim() == ""){
        uri = `https://api.themoviedb.org/3/${props.type}/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${props.page}`
    }else{
        uri= `https://api.themoviedb.org/3/search/${props.type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${props.page}&query=${props.search}&include_adult=true`
    }

    useEffect(()=> {
        fetch(uri)
        .then(res =>res.json())
        .then(data => {
            if(props.page!=1)
            setMovies([...movies,...data.results])
            else
            setMovies(data.results)
        })
        .catch(err => {throw err})
    },[uri])


    const rst = (movies != undefined && movies.length) ? movies.map((movie,index) =>{
        return (
            <MoviePoster 
                key={movie.id*index} id={movie.id} type={props.type}
                poster={movie.poster_path!=null?`http://image.tmdb.org/t/p/w185/${movie.poster_path}`:"/img/not-found.jpg"}
                title={props.type =="movie" ? movie.title:movie.name}
                plot={movie.overview}
                rating={movie.vote_average}
                onClick={props.onClick}
            />
        )
    }):<CircularProgress />

    return (
        <div className="showcase" >
            {rst}
        </div>
    )
}
