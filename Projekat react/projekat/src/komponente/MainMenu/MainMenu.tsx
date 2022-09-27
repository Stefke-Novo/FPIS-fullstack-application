import React from 'react'
import {Link} from 'react-router-dom'
import './MainMenu.css'
function MainMenu(){
    return(
        <div id='header'>
          <Link to="/">
            <div id='headerIcon'>
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQFXBPjlAd8rhg/company-logo_200_200/0/1549622046903?e=2147483647&v=beta&t=nQFMTt_daXFqQua6mXRHyWuwOFy50c9-s9hcjjrK6J8" alt="" />
            </div>
          </Link>
          <div id='headerButtons'>
            <Link to='/ponudaPodizvodjaca' className='button'>Ponuda podizvodjaca</Link>
            <Link to='/zaposleni' className='button'>Zaposleni</Link>
            <Link to='/ugovorSaPodizvodjacem' className='button' >Ugovor sa podizvodjacem</Link>
          </div>
        </div>
    )
}
export default MainMenu;