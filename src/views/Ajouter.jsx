import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import {FaSearch} from "react-icons/fa";
import '../Ajouter.css'
import { dataAll } from "../api/Particip";

function Ajouter(){
    const [nom,setnom]=useState();
    const [prenom,setprenom]=useState();
    const [tel,settel]=useState();
    const [groups,setgroupes]=useState([]);
    const [ide,setide] = useState([]);
    const [input,setInput]=useState("");
    const [gr,setGr]=useState("")



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
   
      useEffect(()=>{
        const callapi = async () =>{
            let data = await dataAll(); 
            console.log("Les Datas :",data)
        }   
        callapi(); 
    },[])


    
    
    useEffect(() => {
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
        fetch('http://192.168.1.88:1337/api/participants?populate=groups' ,{ 
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
         <div className="Title">
            <h1>AJOUTER UN NOUVEAU PARTICIPANT</h1>
         </div>
            
         <form action="" method="POST">
                           
            <InputGroup className="mb-6">
               <InputGroup.Text id="inputGroup">
               Nom
               </InputGroup.Text>
            <Form.Control
               aria-label="Nom"
               aria-describedby="inputGroup"
               value={nom} 
               onChange={(e)=>{setnom(e.target.value)}}
            />
            </InputGroup>                 
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
               Prenom
               </InputGroup.Text>
            <Form.Control
               aria-label="Prenom"
               aria-describedby="inputGroup"
               value={prenom} 
               onChange={(e)=>{setprenom(e.target.value)}}
            />
            </InputGroup>    
            <InputGroup className="mb-3">
               <InputGroup.Text id="inputGroup">
                Telefone
               </InputGroup.Text>
            <Form.Control
               aria-label="Telefone"
               aria-describedby="inputGroup"
               value={tel} 
               onChange={(e)=>{settel(e.target.value)}}
            />
            </InputGroup>   



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
                                
                                    gr?.data?.map((group)=>{
                                    return (
                                    <div className="check2" key={group.id}>
                                            <Form.Check 
                                                value={group?.attributes?.group_name}
                                                type="switch" 
                                                label={group?.attributes?.group_name}
                                                onChange={(e)=>handleCheckboxChange(e,group.id)}
                                            />                        
                                    </div>
                                    )
                                })
                            }
                        
                    </div>
                
                <Link to={`/Participants`}>
                    <Button variant="outline-success" className="ajt" onClick={()=>add(nom,prenom,tel)}>Ajouter</Button>
                </Link>
                        
            </form>
        </>
    )
}
export default Ajouter;
