import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import {FaSearch , FaArrowLeft , FaTimes} from "react-icons/fa";
import '../Ajouter.css'
import { api } from "../api/Grou";
import { dataAll } from "../api/Particip";

function Ajouter(){
    const [nom,setnom]=useState();
    const [prenom,setprenom]=useState();
    const [tel,settel]=useState();
    const [groups,setgroupes]=useState([]);
    const [ide,setide] = useState([]);
    const [input,setInput]=useState("");
    const [gr,setGr]=useState("");
    {/* The LASTE MODIFICATION */}
    // const [idgr,setIdgr] = useState([])

    
    
    
    const [options, setOptions] =useState([]);
    useEffect(()=>{
        const callapi = async () =>{
            let data = await api();
            setOptions(data);
        }  
        callapi()
    },[])


    const [multigr,setMultigr]=useState([])


// MULTISELECT
    useEffect(()=>{
        const getGrpMulti = async()=>{
            const getMulti= []
            let rawData = await fetch('http://192.168.1.88:1337/api/groups');
            let dataJson = await rawData.json();
               console.log('DATAJSON :',dataJson.data);
            for(let key in dataJson.data){
                getMulti.push([dataJson.data[key].attributes.group_name])
            }
               console.log('GETMULTI :',getMulti);
            setMultigr(getMulti);
        }
        getGrpMulti();
    },[])



    // useEffect(() => {
    //     fetch("http://192.168.1.88:1337/api/groups")
    //     .then((response) => response.json())
    //     .then((dataG) => {setMultigroupes(dataG) ; setMultigr(dataG)})
    //     .catch((error) => console.error(error));
    //     console.log('Groupes : ',multigr);
    //     for(let i=0; i<)
    // }, []);


   



    useEffect(()=>{
        const callapi = async () =>{
            let data = await dataAll(); 
            console.log("Les Datas :",data)
        }   
        callapi(); 
    },[])

  

    const handleCheckboxChange = (e, id) => {
        const isChecked = e.target.checked
        if (isChecked == true){
            let a = [...ide,id]
            setide(a)     
        }else{
            let b = ide.filter((a)=>a!=id)
            setide(b)       
        }
    };
   
      
  {/* The LASTE MODIFICATION */}
    // let datachange = (e,id)=>{
    //     const activdata = e.target.checked ;
    //     const ide = e.target.id;
    //     if(activdata == true){
      
    //       setIdgr([...idgr,ide]);
      
        
    //     }else{
    //       let o = idgr.filter((a)=> a != ide)
    //       setIdgr(o)
      
    //     }}

    
    
    useEffect(() => {
        ///192.168.1.88
          fetch("http://192.168.1.88:1337/api/groups")
          .then((response) => response.json())
          .then((data) => {setgroupes(data) ; setGr(data)})
          .catch((error) => console.error(error));
      }, []);

   
  
      

      
    const fetchData = (value) => {
            const results=groups?.data?.filter((g)=>{
                return g && g.attributes.group_name && g.attributes.group_name.toLowerCase().includes(value);
            });
            setGr({data:results})
    }
    const handleChange=(value)=>{
        setInput(value);
        fetchData(value);
    }  
    const deltB=()=>{

    }


    function add (nom,prenom,tel){
        let myheaders=new Headers();
        myheaders.append("Content-Type","application/json")
        let mydt= {
                "data":
                        {   
                        "Nom":nom,
                        "Prenom":prenom,
                        "Tel":tel,
                        "groups": {
                            "connect":ide
                        }
                        }
                }

           console.log(mydt); 
           //192.168.1.88    
        fetch('http://192.168.0.180:1337/api/participants?populate=groups' ,{ 
               method: 'POST' , 
               headers:myheaders,
               body: JSON.stringify(mydt),
               redirect : "follow"
                })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout`);
            }
            else{
                alert('Ajouter avec Succes');
            }
               })
            .catch(error => {
               console.error(error);
           });
           

    }
    
    return(
        <>
         <div className="mod"> 
            <div className="one">
                <h1>AJOUTER UN NOUVEAU PARTICIPANT</h1>
            </div>
            <div className="Arr">
              <Link to='/Participants'>
              <FaArrowLeft/>
              </Link>
            </div>
          <div className="inputes">                           
            <Form.Group className="mb-6">
               <Form.Label id="FormGroup">
               Nom
               </Form.Label>
            <Form.Control
               aria-label="Nom"
               aria-describedby="FormGroup"
               id="FormControl"
               placeholder="Entrez Votre Nom"
               value={nom} 
               onChange={(e)=>{setnom(e.target.value)}}
            />
            </Form.Group>                 
            <Form.Group className="mb-3">
               <Form.Label id="FormGroup">
               Prenom
               </Form.Label>
            <Form.Control
               id="FormControl"
               aria-label="Prenom"
               aria-describedby="FormGroup"
               placeholder="Entrez Votre Prenom"
               value={prenom} 
               onChange={(e)=>{setprenom(e.target.value)}}
            />
            </Form.Group>    
            <Form.Group className="mb-3">
               <Form.Label id="FormGroup">
                Telefone
               </Form.Label>
            <Form.Control
               aria-label="Telefone"
               aria-describedby="inputGroup"
               id="FormControl"
               placeholder="Entrez Votre Telefone"
               value={tel} 
               onChange={(e)=>{settel(e.target.value)}}
            />
            </Form.Group>   
            </div>

            <div className="rech">
                
                           <h5 className="h5gr">Selectionnez votre Groupes</h5>

                                {/* <FaSearch id="search-icon"/>
                                <input 
                                    placeholder="Type to search groups..."
                                    id="placegr"
                                    value={input}
                                    onChange={(e)=>handleChange(e.target.value)}
                                /> */}


                                {/* //MultiSelect */}
                                {/* The LASTE MODIFICATION */}
                                {/* {
                                    options?.data?.map((e)=>{
                                    return(
                                      <div key={e.id}>
                                         
                                      </div>
                                    )    
                                   })
                                } */}
                                 <Multiselect 
                                            isObject={false}
                                            onRemove={(event)=>{  console.log('EVENT ONREMOVE',event)} }
                                            onSelect={ (event)=>{ console.log('ENENT ONSELECT',event) }}
                                            options={multigr}
                                            id="Multiselect"  //Groupes              
                                 />
                     <div>
                     
                    </div>         
                    

            </div>
            <div className="Ajouter">
                <Link to={`/Participants`}>
                    <Button variant="outline-success"  onClick={()=>add(nom,prenom,tel)}>Ajouter</Button>
                </Link>
            </div> 
            
                
            </div>  
        </>
    )
}
export default Ajouter;
