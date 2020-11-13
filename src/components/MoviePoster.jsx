/* eslint-disable no-unused-vars */
import React ,{useContext} from 'react'


import colorScheme from "../colorScheme"

//component style
import "./moviePoster.css"

export default function MoviePoster(props) {

    const {theme,changeTheme} = useContext(colorScheme)

    

    return (
        <div className="poster" onClick={props.onClick} >
            <div className={"poster-container poster-"+theme} id={props.id} data-type={props.type} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <img src={props.poster} alt="Poster"/>
                <h3 title={props.title}> {props.title && props.title.substring(0,50)} </h3>
                <p className="poster-overview"> {props.plot && props.plot.substring(0,100)+"..."} </p>
                <p> {props.rating} </p>
            </div>
        </div>
    )
}
