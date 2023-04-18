import React, { useDebugValue, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Form } from 'react-bootstrap';
import {upd} from '../api/Grou'; 
import {ft} from '../api/Grou'; 
export default function ModifierGroup() {

  
  const {id} = useParams()
  const [modifs,setModifs] = useState([])
  const [defaultval,setDefaultval] = useState();
  ft(id,setDefaultval)
  const Modifier = async ()=>{
    upd(modifs,id);

  }

  return (
    <div>

    <h1 className='mt-5'> MODIFICATION :</h1>
    <Alert variant="warning" className='w-50 mt-3'>
        NB : si le nom de group deja exist dans le tableau cette chanmpe ne modifier pas 
    </Alert>
    <Form.Control
        type="text"
        className='w-50 mt-3'
        Value={defaultval}
        onChange={(e)=>setModifs(e.target.value)}
      />
      <Button as="Link" variant="outline-success" className='mt-5 w-60' onClick={Modifier}>
           Modifier
      </Button>

      

    </div>
  )
}
