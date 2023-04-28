import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {showV,modifiedval} from '../api/organisation';
import Collapse from 'react-bootstrap/Collapse';
export default function UpdateOraganisation() {
    const {id } = useParams();

    const [defval,setDeftval] = useState();
    const [modification,setModification] = useState();
    const [modificationdesc,setModificationdesc] = useState();
    const [defdescval,setDefdesctval] = useState();
    const [open, setOpen] = useState(false);

    showV(id,setDeftval,setDefdesctval);

    const modifier =()=>{
        modifiedval(id,modification,modificationdesc);
    }

  return (
    <div>
    <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className='bg-danger'
      >
        NB!! 
    </Button>
    <Collapse in={open}>
        <div className='bg-danger' id="collapse-text">
        Si Nom de group deja exist .
        Impossible de Modifier Le champ 
        </div>
    </Collapse>
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
