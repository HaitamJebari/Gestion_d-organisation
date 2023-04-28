import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import {ajouter} from '../api/organisation';
import {api} from '../api/Grou';
import Select from 'react-select';
export default function AjouterOrganisation() {
    const [Norg,setNorg] = useState('')
    const [descorg,setdescorg] = useState()
    const [idgr,setIdgr] = useState([])


    // ajouter organisation 

    const ajouterorg = ()=>{
        ajouter(Norg,descorg,idgr)
    }

    // afficher le checkbox avec les valeur de table group  

    
    const [grtab,setGrtab] = useState([])
    useEffect(()=>{
      const callapi = async () =>{
          let data = await api();
          setGrtab(data);
      }
      
      callapi()
  },[])

  // put the cheched chaeckboxes to an array 
  
let datachange = (e,id)=>{
  const activdata = e.target.checked ;
  const ide = e.target.id;
  if(activdata == true){

    setIdgr([...idgr,ide]);

  
  }else{
    let o = idgr.filter((a)=> a != ide)
    setIdgr(o)

  }}





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
<h3 className='mt-3'>selectioner les groups</h3>
        {
          grtab?.data?.map((e)=>{
            return (
              <div key={e.id}>
                <Form.Check
                  value={e?.attributes?.group_name}
                  id={e.id}
                  type="switch"
                  label={e?.attributes?.group_name}
                  onChange={(e)=>datachange(e,e.id)}
                />  
              </div>
            ) 
          })
        }

<br />
        <Button as="Link" variant="success" className='mt-5 w-60' onClick={ajouterorg} >
           Ajouter
        </Button>


    </div>
  )
}
