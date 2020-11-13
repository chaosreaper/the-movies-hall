/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react'

//component style
import "./headerSection.css"

//theme context
import  themeContext from '../colorScheme'

// Mui componenets
import TheatersIcon from '@material-ui/icons/Theaters';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';

export default function HeaderSection(props) {

    const {theme,changeTheme} = useContext(themeContext)

    //dropDown menu and window size



    const [menu,setMenu] = useState(false)
    const [windowSize,setSize] = useState(window.innerWidth<600)

    const dropMenu = ()=>{
        setMenu(!menu)
    }

    window.addEventListener("resize",()=>{
        if(window.innerWidth<600){
            setSize(true)
        }else{
            setSize(false)
        }
    })

    

    
    return (

        <div className={"header-container "+props.variant+" edge-"+theme} 
        style={{height:windowSize? (menu? "150px":"40px"):"auto" }} 
        >
            <div className="header-logo" >
                <h1 onClick={props.home} >the movie hall</h1>
                <MenuIcon className="phoneMenu" onClick={dropMenu} />
            </div>
            <div className="header-search-box" >
                <input className={"search-box "+theme} type="text" 
                name="search" autoComplete="off" 
                value={props.search}
                onChange={props.onChange}
                />                
            </div>
            <div className="header-actions" >
                <button 
                type="button" className="content-type"  onClick={props.onClick} 
                data-type="movie"
                >
                    <TheatersIcon data-type="movie" className={props.type=="movie"?"active":""} />
                </button>

                <button 
                type="button" className="content-type"  onClick={props.onClick}
                data-type="tv"
                >
                    <LiveTvIcon data-type="tv" className={props.type=="tv"?"active":""}/>
                </button>

                <button 
                type="button" className="theme" onClick={changeTheme}>
                    <Brightness4Icon />
                </button>
            </div>
        </div>
    )
}
