import React, { useState , useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { Getgroupes } from "../api/Particip";
import { api } from "../api/Grou";
import { useParams, Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import '../Modifier.css';
import { FaSearch , FaArrowLeft} from "react-icons/fa";

export default function Modifier() {
    const {id} = useParams();
    const [nom,setnom]=useState("");
    const [prenom,setprenom]=useState("");
    const [Tel,setTel]=useState("");
    const [groupe,setgroupe]=useState("");
    const [groups,setgroupes]=useState([]);
    const [test,setTest]=useState([]);
    const [input,setInput]=useState("")
    const [gr,setGr]=useState("")
    const [aff, setaff]=useState([])
    const [testchecked,setTestchecked]=useState([])


    
    useEffect(()=>{
        const callapi = async () =>{
            let data = await api(); 
            let res = await Getgroupes(id);
            setgroupe(data.data);
            setnom(res.data.attributes.Nom);
            setprenom(res.data.attributes.Prenom);
            setTel(res.data.attributes.Tel);
            setgroupes(res.data.attributes.groups);
            let result = []
            let oldN = []
            data?.data?.map((e)=>{
                if (res?.data?.attributes?.groups?.data?.find((i)=>i.id === e.id)){
                    result.push({"id":e.id , "group_name": e.attributes.group_name, "checked": true})
                    oldN.push(e.id);
                }else{
                    result.push({"id":e.id , "group_name": e.attributes.group_name, "checked": false})
                }
                setTest(result)
                setaff(result)
                setTestchecked(oldN)
            })
            //===============search==================
        }   
        callapi();
    },[])



    const handleCheckboxClick = (index) => {
        const newTest = [...test];
        newTest[index].checked = !newTest[index].checked;
        setTest(newTest);
    }  
 
    useEffect(() => {
        fetch("http://192.168.1.88:1337/api/groups")
        .then((response) => response.json())
        .then((data) => {setgroupes(data) ; setGr(data)})
        .catch((error) => console.error(error));
    }, []);
 
        const fetchData = (value) => {
            const results=test.filter((g)=>{
                return g && g.group_name && g.group_name.toLowerCase().includes(value);
            });
            console.log("RESULTS :",results);
            setaff(results)
        }
        const handleChange=(value)=>{
            setInput(value);
            fetchData(value);
        }  

   
    function modify (){
        let filt = test.filter((e)=>e.checked == true)
        console.log(filt)
        const myheaders = new Headers();
        myheaders.append("Content-Type","application/json");
        const mydt={ "data" : {
            "Nom":nom,
            "Prenom":prenom,
            "Tel":Tel,
            "groups":{"set" : filt}
        }
        };

        fetch(`http://192.168.1.88:1337/api/participants/${id}?populate=groups` ,{ 
            method: 'PUT' , 
            headers: myheaders,
            body:JSON.stringify(mydt),
        })
        .then(response => {
            if (!response.ok) {
                alert(`Erreur lors de la modification`);
            }else{
                window.location.replace('/Participants')
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
                    <h1>MODIFICATION DU PARTICIPANTS</h1>
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
                    type="text"
                    id="FormControl"
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
                    type="text"
                    value={prenom}
                    onChange={(e)=>{setprenom(e.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label id="FormGroup">
                  Telefone
                </Form.Label>
                <Form.Control
                    id="FormControl"
                    type="text"
                    value={Tel}
                    onChange={(e)=>{setTel(e.target.value)}}
                />
                </Form.Group>
            </div>   


                <div className="rech">
                <h5 className="h5gr">Selectionnez votre Groupes</h5>
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
                                    aff.map((i,index)=>{
                                    return (
                                    <div className="check2" key={i.id}>
                                            <Form.Check 
                                                value={i.group_name}
                                                type="switch" 
                                                label={i.group_name} 
                                                id={i.id}
                                                checked={i.checked} 
                                                onChange={() => handleCheckboxClick(index)}
                                            />                        
                                    </div>
                                    )
                                 })
                            }                     
                </div>
                 
            </div>
                   <Button as="Link" variant="outline-success" className="Ajt" onClick={modify}>
                    Enregistrer
                  </Button>
            </div>
        </>
    )
}


