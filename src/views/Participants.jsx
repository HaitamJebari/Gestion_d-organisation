import React, { useState, useEffect  } from "react";
import { dataAll } from "../api/Particip";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../Participants.css';
function Participants () {
    const[Participants,setparticipants]=useState([]);




    useEffect(()=>{
        const data = async () =>{
            let dt = await dataAll();
            setparticipants(dt)
        }
        data();

    },[]);

    
    
    const delt = (itemId) =>{
      fetch(`http://192.168.1.88:1337/api/participants/${itemId}`+`?populate=group` ,{ method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression des données');
        }
        let a = Participants.data.filter(item => item.id !== itemId)
        setparticipants({data:a});
       })
        .catch(error => {
           console.error(error);
       });
}
    return (
        <>
        <div id="cnt">

        <div className="Title">
            <h1>Gestion des Participants</h1>
        </div>
            
            <Link to={`/Ajouter`}>
                <Button as="Link" variant="outline-success" className='ajt' >
                    Ajouter un Nouveau Participant
                </Button>
            </Link>
        <div className="table">
         <Table striped bordered hover >
               <thead>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Telefone</th>
                  <th>Action</th>
               </thead>
               <tbody>
                  {Participants?.data?.map((Participants) => (
                      <tr key={Participants?.attributes.id}>
                          <td>{Participants.attributes.Nom}</td>
                          <td>{Participants.attributes.Prenom}</td>
                          <td>{Participants.attributes.Tel}</td>
                          <td>
                          <Link to={`/modifier/${Participants.id}`}>
                                <Button as="Link" id="Button" variant="outline-primary">
                                    Modifier
                                </Button>
                          </Link>
                          <Link to={`/Groupes/${Participants.id}`}>
                                <Button as="Link" id="Button" variant="outline-info">
                                    Groupes
                                </Button>
                          </Link>
                            <Button as="Link" id="Button" variant="outline-danger" className='ml-5' onClick={()=>delt(Participants.id)}>
                                Supprimer
                            </Button>
                          </td>
                      </tr>
                 ))}
               </tbody>
            </Table>
            
        </div>
        </div>
        </>
    );
}
export default Participants;