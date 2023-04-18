import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import {ajouter} from '../api/organisation';
export default function AjouterOrganisation() {
    const [Norg,setNorg] = useState('')
    const [descorg,setdescorg] = useState()


    const [choose,setChoose] = useState()
    const ajouterorg = ()=>{
        ajouter(Norg,descorg)
    }



  return (
    <div>
            
            
    <h1 className='mt-4'>Nom de Organisation</h1>
    <Alert variant="warning" className='w-50 mt-3'>
        NB : si le nom de Organisation deja exist dans le tableau cette organisation n'ajoute pas 
    </Alert>
      <Form.Control
        type="text"
        placeholder='deposer le nom de organisation'
        className='w-50 mt-3'
        value={Norg}
        onChange={(e)=>setNorg(e.target.value)}
      />
      <Form.Control
        type="text"
        placeholder='deposer le descriprtion de organisation'
        className='w-50 mt-3'
        value={descorg}
        onChange={(e)=>setdescorg(e.target.value)}
      />
        <Button as="Link" variant="success" className='mt-5 w-60' onClick={ajouterorg} >
           Ajouter
        </Button>


    </div>
  )
}
