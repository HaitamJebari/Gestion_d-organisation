import React, { useState } from "react";
import {Link} from 'react-router-dom'
import '../Ajouter.css'

function Ajouter(){
    const [num,setnum]=useState();
    const [nom,setnom]=useState();
    const [prenom,setprenom]=useState();
    const [groupe,setgroupe]=useState();

    function add (){
        let myheaders=new Headers();
        myheaders.append("Content-Type","application/json")
        let mydt={
            "data":
                {
                "Nombre":num,
                "Nom":nom,
                "Prenom":prenom
            }
                }

                console.log(mydt)
        fetch('http://192.168.1.88:1337/api/participants' ,{ 
               method: 'POST' , 
               headers:myheaders,
               body:JSON.stringify(mydt),
               redirect : "follow"
                })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout`);
            }
               })
            .catch(error => {
               console.error(error);
           });
          
    }
    return(
        <>
            <form action="" method="post">
                  <label>Nombre :</label> 
                <input type="text" name="" value={num} onChange={(e)=>{setnum(e.target.value)}}/>
                  <label>Nom :</label> 
                <input type="text" name="" value={nom} onChange={(e)=>{setnom(e.target.value)}}/>
                  <label>Prenom :</label> 
                <input type="text" name="" value={prenom} onChange={(e)=>{setprenom(e.target.value)}}/>
                  <label>Groupe :</label> 
                <input type="text" name="" value={groupe} onChange={(e)=>{setgroupe(e.target.value)}}/>
                <Link to={`/Participants`}>
                        <button id="buttA" onClick={add}>Ajouter</button>
                </Link>
                
            </form>
        </>
    )
}
export default Ajouter;