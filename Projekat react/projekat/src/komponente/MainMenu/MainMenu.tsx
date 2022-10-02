import React, { Children, useState } from 'react'
import {Link} from 'react-router-dom'
import './MainMenu.css'
function MainMenu(){
  let [sirina,setSirina]=useState<number>();
    return(
        <div id='header'>
          <Link to="/">
            <div id='headerIcon'>
              <img src="https://media-exp1.licdn.com/dms/image/C560BAQFXBPjlAd8rhg/company-logo_200_200/0/1549622046903?e=2147483647&v=beta&t=nQFMTt_daXFqQua6mXRHyWuwOFy50c9-s9hcjjrK6J8" alt="" />
            </div>
          </Link>
          <div id='headerButtons'>
            <MenuButton link='/ponudaPodizvodjaca' tekst={"Ponude"}>
              <DropdownMenu>
                <DropdownItem link='/ponudaPodizvodjaca/kreirajPonudu'>Kreiranje ponude</DropdownItem>
                <DropdownItem link='/ponudaPodizvodjaca/obrisiPonudu'>Brisanje ponude</DropdownItem>
              </DropdownMenu>
            </MenuButton>
            <MenuButton link='/zaposleni' tekst='Zaposleni' 
            // className='button'
            >
              <DropdownMenu>
                <DropdownItem link={"/zaposleni/kreiranjeZaposlenog"}>Kreiranje zaposlenog</DropdownItem>
                <DropdownItem link={"/zaposleni/ucitavanjeZaposlenih"}>Prikaz zaposlenog</DropdownItem>
                <DropdownItem link={"/zaposleni/izmenaZaposlenog"}>Izmena zaposlenog</DropdownItem>
                <DropdownItem link={"/zaposleni/brisanjeZaposlenog"}>Brisanje zaposlenog</DropdownItem>
              </DropdownMenu>
            </MenuButton>
            <MenuButton link='/ugovorSaPodizvodjacem' tekst='Ugovori'
            // className='button' 
            >
              <DropdownMenu>
                <DropdownItem link={"/ugovorSaPodizvodjacem/kreiranjeUSP"}>Kreiranje ugovora</DropdownItem>
                <DropdownItem link={"/ugovorSaPodizvodjacem/ucitavanjeUSP"}>Prikaz ugovora</DropdownItem>
                <DropdownItem link={"/ugovorSaPodizvodjacem/izmenaUSP"}>Izmena ugovora</DropdownItem>
                <DropdownItem link={"/ugovorSaPodizvodjacem/brisanjeUSP"}>Brisanje ugovora</DropdownItem>
              </DropdownMenu>
            </MenuButton>
            <MenuButton link={''} tekst={'Kontakt'} children={undefined}></MenuButton>
          </div>
        </div>
    )
}
export default MainMenu;
function MenuButton(props:{link:string,tekst:string,children:any}){
  //let [open,setOpen] = useState<boolean>(false);
  return(
    <div className='menuButton'>
      <div className='button' 
        // onClick={(evt)=>setOpen(!open)}
        >{props.tekst}</div>
      {props.children}
    </div>
  )
}
function DropdownMenu(props:any){
  return(
    <div className='dropdown'>
      {props.children}
    </div>
  )
}
function DropdownItem(props:{link:string,children:any}){
  return (
    <Link to={props.link} className='dropDownItem'>{props.children}</Link>
  )
}