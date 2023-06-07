import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, Button, Collapse, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {showV,modifiedval} from '../api/organisation';
import InputGroup from 'react-bootstrap/InputGroup'
import {api} from "../api/Grou";
import {Link} from 'react-router-dom'
import { FaSearch , FaArrowLeft} from 'react-icons/fa';
import '../Organisation_liste.css'
import Multiselect from 'multiselect-react-dropdown';


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
    const [content,setcontent]=useState([])
    const [cheked,setcheked]=useState([])




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
          let cont = []
          let chek = []
          let oldN = []
          data?.data?.map((e) => {
            if (res?.data?.attributes?.groups?.data?.find((i)=>i.id === e.id)){
              result.push({"id" : e.id , "group_name": e.attributes.group_name , "checked" : true });
              oldN.push(e.id);
              chek.push(e.attributes.group_name)
              cont.push(e.attributes.group_name)
          }else{
              result.push({"id" : e.id , "group_name": e.attributes.group_name , "checked" : false})     
              cont.push(e.attributes.group_name)         
          }
          setTest(result);  
          setaff(result)  
          setTestcheked(oldN);
          setcontent(cont);
          setcheked(chek)
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
    <>
    <div className="mod"> 
                 <div className="one">
                        <h1>MODIFICATION D'ORGANISATION</h1>
                  </div>
                  <div className="Arr">
                        <Link to='/organisation'>
                        <FaArrowLeft/>
                        </Link>
                  </div> 
            <Form.Group className="mb-6">
               <Form.Label id="FormGroup">
               Nom
               </Form.Label>
            <Form.Control
               aria-label="Nom"
               id="FormControl"
               aria-describedby="FormGroup"
               Value={defval}
               onChange={(e)=>setModification(e.target.value)}
            />
            </Form.Group>                 
            <Form.Group id='input' className="mb-3">
               <Form.Label id="FormGroup">
               Prenom
               </Form.Label>
            <Form.Control
               id="FormControl"
               aria-label="Prenom"
               aria-describedby="FormGroup"
               Value={defdescval}
               onChange={(e)=>setModificationdesc(e.target.value)}
            />
            </Form.Group>    
             




     <div id='rechOrg'>
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
                    onSelect={ (event)=>{ console.log(event) }}
                    options={ content }
                    selectedValues={cheked}
                    />
                    </div>

              
                </div>
        </form>
        </div>
        </div>
        </Container>
    </React.Fragment>


     </div>   
      <Button as="Link" variant="outline-success" className='ajt'  onClick={()=>modifier()} >
           Modifier
      </Button>
    
      </div>
    </>
  )
}
