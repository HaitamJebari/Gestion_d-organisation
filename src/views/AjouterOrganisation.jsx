import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import {ajouter} from '../api/organisation';
import {api} from '../api/Grou';
import {Link} from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'
import Select from 'react-select';
import { FaSearch , FaArrowLeft} from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'
import '../Ajouter.css'




export default function AjouterOrganisation() {
    const [Norg,setNorg] = useState('')
    const [descorg,setdescorg] = useState()
    const [idgr,setIdgr] = useState([])
    const [input,setInput]=useState("");
    const [gr,setGr]=useState("")
    const [options, setOptions] =useState([]);

useEffect(()=>{
  const getg = [];
  const getcountrydata= async()=>{
    const reqData= await api();
    reqData.data.map((e)=>{
      getg.push(e.attributes.group_name)
    })
    setOptions(getg);
  }
getcountrydata();
},[]);

    // afficher le checkbox avec les valeur de table group  

    
    const [grtab,setGrtab] = useState([])
    useEffect(()=>{
      const callapi = async () =>{
          let data = await api();
          setGrtab(data);
          setGr(data);
      }
      
      callapi()
  },[])

  // put the cheched chaeckboxes to an array 
  
let datachange = (e)=>{
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

    // ajouter organisation 

    const ajouterorg = ()=>{
      ajouter(Norg,descorg,idgr)
  }


  return (
        
     <div className="mod">  
        <div className="one">
            <h1>AJOUTER UNE NOUVELLE ORGANISATION</h1>
        </div>
        <div className="Arr">
              <Link to='/organisation'>
              <FaArrowLeft/>
              </Link>
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
        <React.Fragment>
         <Container className="content ">
        <div className="row">
          <div className="col-sm-12">
         <form className="row g-3" method='post'>
             <div className="col-md-5">
                <label  className="form-label"> </label>
                    <div className="text-dark">
                      <Multiselect
                      isObject={false}
                      onRemove={(event)=>{  console.log(event)} }
                      onSelect={(e)=>datachange(e)}
                      options={ options }
                      />
                    </div>
                    </div>
        </form>
        </div>
        </div>
        </Container>
    </React.Fragment>
                  </div>

                <div>
                    <Button as="Link" variant="outline-success" className='Ajt'  onClick={ajouterorg} >
                      Ajouter
                    </Button>    
                </div>
  </div>
  )
}
