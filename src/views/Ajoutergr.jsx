import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Form } from 'react-bootstrap';
import {ajt} from '../api/Grou';

export default function Ajouter() {


    const [groupName,setGroupName] = useState('');

    const ajouter = async ()=>{
        ajt(groupName);
    }

  return (
    <div>
            
            
    <p className='mt-4'>Nom de group</p>
    <Alert variant="warning" className='w-50 mt-3'>
        NB : si le nom de group deja exist dans le tableau cette groupe n'ajoute pas 
    </Alert>
      <Form.Control
        type="text"
        placeholder='deposer le nom de group'
        className='w-50 mt-3'
        value={groupName}
        onChange={(e)=>setGroupName(e.target.value)}
      />
        <Button as="Link" variant="success" className='mt-5 w-60' onClick={ajouter}>
           Ajouter
        </Button>


    </div>
  )
}