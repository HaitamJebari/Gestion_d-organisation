import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { Alert, Form } from 'react-bootstrap';
import {FaArrowLeft} from "react-icons/fa";
import {ajt} from '../api/Grou';
import '../Ajouter.css';

export default function Ajouter() {


    const [groupName,setGroupName] = useState('');

    const ajouter = async ()=>{
        ajt(groupName);
    }

  return (
    <>
    <div className='mod' >
        <div className="one">
            <h1>AJOUTER UN NOUVEAU GROUPE</h1>
        </div>
        <div className="Arr">
              <Link to='/gr'>
              <FaArrowLeft/>
              </Link>
        </div>      
        <div className="inputes" id='grInput'>   
          <Alert variant="warning" >
              NB : si le nom de group deja exist dans le tableau cette groupe n'ajoute pas 
          </Alert>
          <Form.Group className="mb-6">
              <Form.Label id="FormGroup">
               Nom de Groupe
               </Form.Label>
            <Form.Control
              type="text"
              placeholder='Deposer le Nom de Groupe'
              value={groupName}
              onChange={(e)=>setGroupName(e.target.value)}
            />
            </Form.Group>
            </div> 
    
              <Button as="Link" className="Ajt" variant="outline-success" onClick={ajouter}>
                Ajouter
              </Button>

    </div>
    
    </>
  )
}