import React, { useState, useEffect  } from "react";
import { dataAll } from "../api/Particip";
import {Link} from 'react-router-dom';
import Delete from './Delete'
import '../Participants.css'
function Participants (itemId,props) {
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
            <table>
               <thead>
                  <th>Nombre</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Groupe</th>
                  <th></th>
               </thead>
               <tbody>
                  {Participants?.data?.map(Participants => (
                      <tr key={Participants.id}>
                          <td>{Participants.attributes.Nombre}</td>
                          <td>{Participants.attributes.Nom}</td>
                          <td>{Participants.attributes.Prenom}</td>
                          <td>{Participants.attributes.Groupe}</td>
                          <td>

                          <Link to={`/Modifier/${Participants.id}`}>
                            <button className="buttM">Modifier</button>
                          </Link>

                            <Delete onClick={()=>delt(Participants.id)}/>
                          </td>
                          
                      </tr>
                 ))}
               </tbody>
               <tfoot >
                  <tr>
                  <td colSpan='4'>
                      <Link to={`/Ajouter`}>
                           <button className="buttA">Ajouter Un Participant</button>
                      </Link>
                  </td>
                  </tr>
               </tfoot>
            </table>
        </div>
    );
}
export default Participants;