import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import {ajouter} from '../api/organisation';
import {api} from '../api/Grou';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'
import '../Ajouter.css'




export default function AjouterOrganisation() {
    const [Norg,setNorg] = useState('')
    const [descorg,setdescorg] = useState()
    const [idgr,setIdgr] = useState([])
    const [input,setInput]=useState("");
    const [gr,setGr]=useState("")



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
          setGr(data)
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
  
  const fetchData = (value) => {
    const results=gr?.data?.filter((g)=>{
        return g && g.attributes.group_name && g.attributes.group_name.toLowerCase().includes(value);
    });
    setGrtab({data:results})
}
const handleChange=(value)=>{
setInput(value);
fetchData(value);
} 




  return (
        
     <div className="mod">  
        <div className="one">
            <h1>AJOUTER UNE NOUVELLE ORGANISATION</h1>
        </div>
                            
        <div className="inputes" id='inpt'>    
            <Form.Group id='input'>
               <Form.Label id="FormGroup">
               Nom
               </Form.Label>
            <Form.Control
               aria-label="Nom"
               aria-describedby="FormGroup"
               id="FormControl"
               value={Norg}
               onChange={(e)=>setNorg(e.target.value)}
            />
            </Form.Group>                 
            <Form.Group id='input' className="mb-3">
               <Form.Label id="FormGroup">
               Description
               </Form.Label>
            <Form.Control
               id="FormControl"
               aria-label="Prenom"
               aria-describedby="FormGroup"
               value={descorg}
              onChange={(e)=>setdescorg(e.target.value)}
            />
            </Form.Group>    
             

        </div>

        <div className="rech" id='rch'>
         <h5 className="h5gr">Selectionnez votre Groupes</h5>
                            <div className="input-wrapper">
                                <FaSearch id="search-icon"/>
                                <input 
                                    placeholder="Type to search groups..."
                                    id="placegr"
                                    value={input}
                                    onChange={(e)=>handleChange(e.target.value)}
                                />
                            </div>
                  <div className="Checkdiv">
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

                  </div>
                  </div>

                <div>
                    <Button as="Link" variant="outline-success" className='Ajt'  onClick={ajouterorg} >
                      Ajouter
                    </Button>    
                </div>
  </div>
  )
}
