import React, { useState , useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { Getgroupes } from "../api/Particip";
import { api } from "../api/Grou";
import { useParams, Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import '../Modifier.css';
import { FaSearch } from "react-icons/fa";

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
            const results = result

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
            <form action="" method="put">
              <InputGroup className="mb-6">
               <InputGroup.Text id="inputGroup">
                 Nom
               </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={nom}
                    onChange={(e)=>{setnom(e.target.value)}}
                />
              </InputGroup>
              <InputGroup className="mb-6">
              <InputGroup.Text id="inputGroup">
                 Prenom
               </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={prenom}
                    onChange={(e)=>{setprenom(e.target.value)}}
                />
                </InputGroup>
                <InputGroup className="mb-6">
                <InputGroup.Text id="inputGroup">
                  Telefone
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    value={Tel}
                    onChange={(e)=>{setTel(e.target.value)}}
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
                 
                
                   <Button as="Link" variant="outline-success" className='ajt' onClick={modify}>
                    Enregistrer
                  </Button>
                
            </form>
        </>
    )
}


