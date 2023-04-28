import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, Button, Collapse, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {showV,modifiedval} from '../api/organisation';
import InputGroup from 'react-bootstrap/InputGroup'
import {api} from "../api/Grou";
import { FaSearch } from 'react-icons/fa';
import '../Organisation_liste.css'


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
    const [aff, setaff]=useState([])
    const [input,setInput]=useState("")




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
          setaff(result)  
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




    const fetchData = (value) => {
      const results=test?.filter((g)=>{
          return g && g.group_name && g.group_name.toLowerCase().includes(value);
      });
      setaff(results)
  }
  const handleChange=(value)=>{
  setInput(value);
  fetchData(value);
  } 
  

return (
    <div>
      <h1 className='mt-3'>Modification :</h1>




<form action="" method="post">
            <InputGroup id='input'>
               <InputGroup.Text id="inputGroup">
               Nom
               </InputGroup.Text>
            <Form.Control
               aria-label="Nom"
               aria-describedby="inputGroup"
               Value={defval}
               onChange={(e)=>setModification(e.target.value)}
            />
            </InputGroup>                 
            <InputGroup id='input' className="mb-3">
               <InputGroup.Text id="inputGroup">
               Prenom
               </InputGroup.Text>
            <Form.Control
               aria-label="Prenom"
               aria-describedby="inputGroup"
               Value={defdescval}
               onChange={(e)=>setModificationdesc(e.target.value)}
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

      <div className="checkdiv">
        {
          aff?.map((e,index)=>{
            return (
              <div className='check2' key={e.id}>
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
      </div>


        
      <Button as="Link" variant="outline-success" id='mod' className='mt-5 w-60' onClick={()=>modifier()} >
           Modifier
      </Button>
      </div>
    </div>
  )
}
