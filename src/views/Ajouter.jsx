import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {FaSearch , FaArrowLeft , FaTimes} from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
import '../Ajouter.css'
import { dataAll } from "../api/Particip";

function Ajouter(){
    const [nom,setnom]=useState();
    const [prenom,setprenom]=useState();
    const [tel,settel]=useState();
    const [groups,setgroupes]=useState([]);
    const [ide,setide] = useState([]);
    const [input,setInput]=useState("");
    const [gr,setGr]=useState("");
    const [bdg, setbdg]=useState(false)

    useEffect(()=>{
        const callapi = async () =>{
            let data = await dataAll(); 
            console.log("Les Datas :",data)
        }   
        callapi(); 
    },[])

   //BADGE
   const handleSwitchClick = () => {
      //       let switches = []
//       gr?.data?.map((e)=>{
//          return(
//              switches.push({"group_name": e.attributes.group_name, "checked":bdg})
//          )
//    });
//    console.log('SWITCHES',switches);
  }

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
                   <div className="badg">
                    
                    </div>             
                    

            </div>
            <div>
                <Link to={`/Participants`}>
                    <Button variant="outline-success" className="Ajt" onClick={()=>add(nom,prenom,tel)}>Ajouter</Button>
                </Link>
            </div>       
            </div>  
        </>
    )
}
export default Ajouter;
