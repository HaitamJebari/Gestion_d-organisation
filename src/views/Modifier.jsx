import React, { useState , useEffect} from "react";
import { useParams, Link } from "react-router-dom";

function Modifier() {
    const {id} = useParams();
    const [num,setnum]=useState("");
    const [nom,setnom]=useState("");
    const [prenom,setprenom]=useState("");
    const [groupe,setgroupe]=useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.88:1337/api/participants/${id}`);
            const datav = await response.json();
            setnum(datav.data.attributes.Nombre);
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
            "Nombre":num,
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
                <label>Nombre :</label> 
                <input type="text" name="num" value={num} onChange={(e)=>{setnum(e.target.value)}}/>
                <label>Nom :</label> 
                <input type="text" name="nom" value={nom} onChange={(e)=>{setnom(e.target.value)}}/>
                <label>Prenom :</label> 
                <input type="text" name="prenom" value={prenom} onChange={(e)=>{setprenom(e.target.value)}}/>
                <label>Groupe :</label> 
                <input type="text" name="groupe" value={groupe} onChange={(e)=>{setgroupe(e.target.value)}}/>
                <button id="buttA" type="button" onClick={modify}>Modifier</button>
            </form>
        </>
    )
}

export default Modifier;
