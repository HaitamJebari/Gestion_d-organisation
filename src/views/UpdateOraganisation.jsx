import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {showV,modifiedval} from '../api/organisation';
export default function UpdateOraganisation() {
    const {id } = useParams();

    const [defval,setDeftval] = useState();
    const [modification,setModification] = useState();
    const [modificationdesc,setModificationdesc] = useState();
    const [defdescval,setDefdesctval] = useState();
    showV(id,setDeftval,setDefdesctval);

    const modifier =()=>{
        modifiedval(id,modification,modificationdesc);
    }

  return (
    <div>
      <h1 className='mt-5'> MODIFICATION :</h1>
    <Alert variant="outline-warning" className='w-50 mt-3'>
        NB : si le nom de group deja exist dans le tableau cette chanmpe ne modifier pas 
    </Alert>
    <Form.Control
        type="text"
        className='w-50 mt-3'
        Value={defval}
        onChange={(e)=>setModification(e.target.value)}
      />
    <Form.Control
        type="text"
        className='w-50 mt-3'
        Value={defdescval}
        onChange={(e)=>setModificationdesc(e.target.value)}
      />
      <Button as="Link" variant="outline-success" className='mt-5 w-60' onClick={modifier} >

           Modifier
      </Button>
    </div>
  )
}
