import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {showV,modifiedval} from '../api/organisation';
import {api} from "../api/Grou";

export default function UpdateOraganisation() {
  // declaration de id :

    const {id } = useParams();

  //declaration useState :

    const [defval,setDeftval] = useState();
    const [modification,setModification] = useState();
    const [modificationdesc,setModificationdesc] = useState();
    const [defdescval,setDefdesctval] = useState();
    const [ischeck,setIscheck] = useState([]);
    const [test,setTest] = useState([]);
    const [testcheked,setTestcheked] = useState([]);
    const [restabl,setRestabl] = useState([]);


    const [group,setGroup] = useState([])
    useEffect(()=>{
      const callapi = async () =>{
          let data = await api();
          let res = await showV(id);
          setGroup(data.data);
          setDeftval(res.data.attributes.name);
          setDefdesctval(res.data.attributes.description);
          setIscheck(res.data.attributes.groups.data);
          let result = []
          let oldN = []
          data?.data?.map((e) => {
            if (res?.data?.attributes?.groups?.data?.find((i)=>i.id === e.id)){
              result.push({"id" : e.id , "group_name": e.attributes.group_name , "checked" : true });
              oldN.push(e.id);
          }else{
              result.push({"id" : e.id , "group_name": e.attributes.group_name , "checked" : false})              
          }
          setTest(result);    
          setTestcheked(oldN);
      })
      }
      callapi();
      
    },[])


    const change = (index) =>{
      const Ntab = [...test];
      Ntab[index].checked = !Ntab[index].checked;
      setTest(Ntab);
    }
    // method for the modifier button insite it has method of operation :

    const modifier =()=>{
      let filt = test.filter((e)=>e.checked == true)
      modifiedval(id,modification,modificationdesc,filt); 

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
        Value={defval}
        onChange={(e)=>setModification(e.target.value)}
      />
    <Form.Control
        type="text"
        className='w-50 mt-3'
        Value={defdescval}
        onChange={(e)=>setModificationdesc(e.target.value)}
      />
    {
          test.map((e,index)=>{
            return (
              <div key={e.id}>
                <Form.Check
                  onChange={()=>change(index)}
                  checked = {e.checked}
                  value={e.group_name}
                  id={e.id}
                  type="switch"
                  label={e.group_name}
                />  
              </div>
            ) 
          })
        }
      <Button as="Link" variant="outline-success" className='mt-5 w-60' onClick={()=>modifier()} >
           Modifier
      </Button>
    </div>
  )
}
