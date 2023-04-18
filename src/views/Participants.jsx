import React, { useState, useEffect  } from "react";
import { dataAll } from "../api/Particip";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../Participants.css'
function Participants () {
    const[Participants,setparticipants]=useState([]);
    useEffect(()=>{
        const data = async () =>{
            let dt = await dataAll();
            setparticipants(dt)
        }
        data();
    },[]);
    
    function delt(itemId){
      fetch('http://192.168.1.88:1337/api/participants/'+itemId ,{ method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression des données');
        }

        setparticipants(Participants.data.filter(item => item.id !== itemId));
       })
        .catch(error => {
           console.error(error);
       });
}
    return (
        <div>
         <Table striped bordered hover>
               <thead>
                  <th>Nombre</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Groupe</th>
                  <th>Action</th>
               </thead>
               <tbody>
                  {Participants?.data?.map(Participants => (
                      <tr key={Participants.id}>
                          <td>{Participants.attributes.Nombre}</td>
                          <td>{Participants.attributes.Nom}</td>
                          <td>{Participants.attributes.Prenom}</td>
                          <td>{Participants.attributes.Groupe}</td>
                          <td>
                          <Link to={`/modifier/${Participants.id}`}>
                                <Button as="Link" variant="primary">
                                    Modifier
                                </Button>
                          </Link>
                            <Button as="Link" variant="danger" className='ml-5'onClick={()=>deleteorg(e.id)}>
                                Supprimer
                            </Button>
                          </td>
                      </tr>
                 ))}
               </tbody>
            </Table>
            <Link to={`/Ajouter`}>
                <Button as="Link" variant="success" className='mt-5 ml-5' >
                    Ajouter Nouvelle Participant
                </Button>
            </Link>
        </div>
    );
}
export default Participants;