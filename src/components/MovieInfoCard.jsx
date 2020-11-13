/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import "./movieInfoCard.css"





//mui icons
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import StarIcon from '@material-ui/icons/Star';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function MovieInfoCard(props) {

    const [rst,setRst] = useState({})

    useEffect(()=>{
        let uri = `https://api.themoviedb.org/3/${props.chosen.type}/${props.chosen.id}?api_key=31642b090ec00df20ba0fb96c43db571`

        fetch(uri)
        .then(res =>res.json())
        .then(data => setRst(data))
        .catch(err => {throw err})
    },[])
    
    return (
        <div className="movieDetails" >
                <div className="infoPoster">
                    <ArrowBackIcon onClick={props.onClick} />
                    <img src={`http://image.tmdb.org/t/p/w185/${rst.poster_path}`} alt="poster" ></img>
                </div>
                <div className="infoDetails">
                    <h3> {rst.title} </h3>
                    <span><QueryBuilderIcon/> 
                    {props.chosen.type=="movie"? `${Math.floor(rst.runtime/60)}h ${rst.runtime%60}min` : "N/A"} 
                    </span>
                    <span><StarIcon /> {rst.vote_average} </span>
                </div>

                <div className="infoPlot">
                    <p>
                        {rst.overview}
                    </p>
                </div>
        </div>
    )
}
