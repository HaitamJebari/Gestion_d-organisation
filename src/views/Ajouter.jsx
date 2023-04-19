import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import '../Ajouter.css'

function Ajouter(){
    const [nom,setnom]=useState();
    const [prenom,setprenom]=useState();
    const [groups,setgroupes]=useState([]);

    
    useEffect(() => {
        fetch("http://192.168.1.88:1337/api/groups")
          .then((response) => response.json())
          .then((data) => setgroupes(data))
          .catch((error) => console.error(error));
      }, []);
    console.log(groups)
    function add (){
        let myheaders=new Headers();
        myheaders.append("Content-Type","application/json")
        let mydt={
                "data":
                        {
                        "Nom":nom,
                        "Prenom":prenom
                        }
                }

                console.log(mydt)
        fetch('http://192.168.1.88:1337/api/participants'+'?populate=groups' ,{ 
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
         <form action="" method="POST">
                           
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Nom
               </InputGroup.Text>
            <Form.Control
               aria-label="Nom"
               aria-describedby="inputGroup"
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
               value={prenom} 
               onChange={(e)=>{setprenom(e.target.value)}}
            />
            </InputGroup>                 
            


            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Groupe
               </InputGroup.Text>
            <Form.Select aria-label="select" onChange={(e)=>setgroupes(e.target.value)}>
                    {groups?.data?.map((group) => (
                            <option key={group.id} value={group?.attributes?.group_name}>
                                {group?.attributes?.group_name}
                            </option>
                    ))}    
            </Form.Select> 
            </InputGroup>             
                <Link to={`/Participants`}>
                    <Button variant="outline-success" onClick={add}>Ajouter</Button>
                </Link>
                
            </form>
        </>
    )
}
export default Ajouter;
