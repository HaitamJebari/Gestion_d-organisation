import React, { useDebugValue, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {FaArrowLeft} from "react-icons/fa";
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
    <>
      <div className="mod" > 
                 <div className="one">
                   <h1> MODIFICATION DU GROUPE</h1>
                </div>
                <div className="Arr">
                      <Link to='/gr'>
                      <FaArrowLeft/>
                      </Link>
                </div> 
                <div className="inputes" id='grInput'>   
                <Alert variant="warning" >
                    NB : si le nom de group deja exist dans le tableau cette chanmpe ne modifier pas 
                </Alert>
                <Form.Group className="mb-6">
                  <Form.Label id="FormGroup">
                    Prenom
                  </Form.Label>
                  <Form.Control
                    id="FormControl"
                    type="text"
                    Value={defaultval}
                    onChange={(e)=>setModifs(e.target.value)}
                  />
                </Form.Group>
                </div> 
                  <Button as="Link" variant="outline-success" className="Ajt" onClick={Modifier}>
                      Modifier
                  </Button>

      
      </div>
    </>
  )
}
