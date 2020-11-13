/* eslint-disable eqeqeq */
import React , { useState} from 'react'

//colorScheme Context
import themeContext from "./colorScheme"

//component style
import "./app.css"

//custom componenets
import HeaderSection from "./components/HeaderSection"
import MovieShowCase from "./components/MovieShowCase"
import MovieInfoCard from "./components/MovieInfoCard"

import {CSSTransition} from "react-transition-group"

export default function App() {

    

    //conserving theme setting when page refresh or revisiting the website
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme" ,"light")
    }
    
    //use the theme setting from the LocalStorage
    const [theme,setTheme] = useState(localStorage.getItem("theme"))
    const [stcicky,setSticky] = useState(false)
    const [details,setDetails] = useState(false)
    const [chosen,setChosen] = useState(null) 

    const [search,setSearch] = useState("")
    const [type,setType] = useState("movie")
    const [page,setPage] = useState(1)


    //when user change the theme also save it in LocalStorage
    const changeTheme = () =>{
        if(theme === "dark"){
            setTheme("light")
            localStorage.setItem("theme" ,"light")
        }else{
            setTheme("dark")
            localStorage.setItem("theme" ,"dark")
        }

    }

    //Movie DEtails
    const Details = (e)=>{
        setDetails(!details)
        if(e.target.classList.contains("poster-container")){
            setDetails(true)
            setChosen({id:e.target.id,type:e.target.dataset.type})
        }else{
            setDetails(false)
        }
    }
    
    //stick nav on scroll down
    window.addEventListener("scroll",()=>{
        if(window.pageYOffset>130){
            setSticky(true)
        }else{
            setSticky(false)
        }
    })

    const changeHandle =(e)=>{
        setSearch(e.target.value)
        setDetails(false)
        setPage(1)
    }

    const changeType = (e)=>{
        setPage(1)
        setDetails(false)
        window.scrollTo(0,0)
        if(e.target.dataset.type == "movie")
            setType("movie")
        else{
            setType("tv")
        }
    }

    document.addEventListener("scroll",()=>{

        const showcase = document.querySelector(".showcase")

        if(showcase != null && window.scrollY + window.innerHeight >= showcase.clientHeight){
            setPage(page+1)
            
        }
    })

    const home = ()=>{
        setType("movie")
        setPage(1)
        setSearch("")
        setDetails(false)
        window.scrollTo(0,0)
    }

    return (
        <themeContext.Provider value={{theme,changeTheme}} >
            <div className="App">
                <div className={"container container-"+theme} >
                    <div className="header" > 
                        <HeaderSection variant={(stcicky || details)? "sticky" : ""}  
                        onChange={changeHandle} search={search} 
                        type={type}
                        onClick={changeType}
                        home={home}
                        />
                    </div>
                    <div className="content">

                        <CSSTransition 
                        in={details == false} 
                        unmountOnExit
                        timeout={500} 
                        classNames="SC" 
                        >
                            <MovieShowCase onClick={Details} search={search} type={type} page={page}/>
                        </CSSTransition>

                        <CSSTransition 
                        in={details == true} 
                        unmountOnExit 
                        timeout={500} 
                        classNames="DT" 
                        >
                            <MovieInfoCard onClick={Details} chosen={chosen}/>
                        </CSSTransition>

                    </div>
                </div>
            </div>
        </themeContext.Provider>
    )
}
