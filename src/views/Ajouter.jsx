import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
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
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Nombre
               </InputGroup.Text>
            <Form.Control
               aria-label="Nombre"
               aria-describedby="inputGroup"
               className="formControl"
               value={num} 
               onChange={(e)=>{setnum(e.target.value)}}
            />
            </InputGroup>                
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Nom
               </InputGroup.Text>
            <Form.Control
               aria-label="Nom"
               aria-describedby="inputGroup"
               className="formControl"
               value={nom} 
               onChange={(e)=>{setnom(e.target.value)}}
            />
            </InputGroup>                 
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Prenom
               </InputGroup.Text>
            <Form.Control
               aria-label="Prenom"
               aria-describedby="inputGroup"
               className="formControl"
               value={prenom} 
               onChange={(e)=>{setprenom(e.target.value)}}
            />
            </InputGroup>                 
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Groupe
               </InputGroup.Text>
            <Form.Control
               aria-label="Groupe"
               aria-describedby="inputGroup"
               id="formControl"
               value={groupe} 
               onChange={(e)=>{setgroupe(e.target.value)}}
            />
            </InputGroup>                 
                <Link to={`/Participants`}>
                    <Button variant="outline-success" onClick={add}>Ajouter</Button>
                </Link>
                
            </form>
        </>
    )
}
export default Ajouter;