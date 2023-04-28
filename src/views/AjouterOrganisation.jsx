import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import {ajouter} from '../api/organisation';
import {api} from '../api/Grou';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'




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
    <div>
            
            
                <h1 className='mt-4'>Nom de Organisation</h1>
                
       <form action="" method="post">
            <InputGroup id='input'>
               <InputGroup.Text id="inputGroup">
               Nom
               </InputGroup.Text>
            <Form.Control
               aria-label="Nom"
               aria-describedby="inputGroup"
               value={Norg}
               onChange={(e)=>setNorg(e.target.value)}
            />
            </InputGroup>                 
            <InputGroup id='input' className="mb-3">
               <InputGroup.Text id="inputGroup">
               Description
               </InputGroup.Text>
            <Form.Control
               aria-label="Prenom"
               aria-describedby="inputGroup"
               value={descorg}
              onChange={(e)=>setdescorg(e.target.value)}
            />
            </InputGroup>    
             

       </form>


       <div className='search'>


                            <div className="input-wrapper">
                                <FaSearch id="search-icon"/>
                                <input 
                                    placeholder="Type to search groups..."
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


            <br />
                    <Button as="Link" variant="success" id='mod' className='mt-5 w-60' onClick={ajouterorg} >
                      Ajouter
                    </Button>

      </div>

    </div>
  )
}
