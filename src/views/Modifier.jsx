import React, { useState , useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

function Modifier() {
    const {id} = useParams();
    const [nom,setnom]=useState("");
    const [prenom,setprenom]=useState("");
    const [groupe,setgroupe]=useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.88:1337/api/participants/${id}`);
            const datav = await response.json();
            setnom(datav.data.attributes.Nom);
            setprenom(datav.data.attributes.Prenom);
            setgroupe(datav.data.attributes.Groupe);
        };
        fetchData();
    }, [id]);

    


    function modify (){
        const myheaders = new Headers();
        myheaders.append("Content-Type","application/json");
        const mydt={ "data" : {
            "Nom":nom,
            "Prenom":prenom,
            "Groupe":groupe
        }
        };

        fetch(`http://192.168.1.88:1337/api/participants/${id}` ,{ 
            method: 'PUT' , 
            headers: myheaders,
            body:JSON.stringify(mydt),
        })
        .then(response => {
            if (!response.ok) {
                alert(`Erreur lors de la modification`);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }


    
    return(
        <>
            <form action="" method="put">
                <label>Nom :</label> 
                <Form.Control
                    type="text"
                    className='w-50 mt-3'
                    value={nom}
                    onChange={(e)=>{setnom(e.target.value)}}
                />
                <label>Prenom :</label> 
                <Form.Control
                    type="text"
                    className='w-50 mt-3'
                    value={prenom}
                    onChange={(e)=>{setprenom(e.target.value)}}
                />
                <label>Groupe :</label> 
                <Form.Control
                    type="text"
                    className='w-50 mt-3'
                    value={groupe}
                    onChange={(e)=>{setgroupe(e.target.value)}}
                />
                <Button as="Link" variant="outline-success" className='mt-5 w-60' onClick={modify}>
                    Modifier
                </Button>
            </form>
        </>
    )
}

export default Modifier;
