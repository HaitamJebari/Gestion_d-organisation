import React , {useEffect , useState} from "react";
import { dataAll, getgr ,Getgroupes} from "../api/Particip";
import { Button, Card, Table } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import utilisateur from "../images/profile.jpg"
import { data } from "autoprefixer";
import '../Modifier.css';



function Groupes(){
    const {id} = useParams()
    const [groups,setgroupes]=useState([]);
    const [arr,setArr]=useState([]);

    
    useEffect(()=>{
        const callapi = async () =>{
            let data = await Getgroupes(id); 
            // console.log(data);
            setgroupes(data);     
            
        }   
        callapi(); 
        
    },[])
    useEffect(()=>{
        const callgrou = async () =>{
            let res = await getgr(id); 
            // console.log(data);
            setArr(res);     
         
        }   
        callgrou(); 
        console.log(arr);
    },[])

return(
    <>
        <div className="mod">
        <div className="one">
            <h1>À propos du Participant : {groups?.data?.attributes?.Nom}</h1>
        </div>
        <div className="Arr">
              <Link to='/Participants'>
              <FaArrowLeft/>
              </Link>
        </div>    
        <Card className="card">
            <div className="d-flex ">
            <div>
                <Card.Img src={utilisateur} className="w-60 h-60"/>
            </div>
            <div>
            <Card.Body>
                <h6 style={{  fontWeight: 'bold' }}>Nom est prenom :</h6><br />
                <Card.Title> {groups?.data?.attributes?.Nom} {groups?.data?.attributes?.Prenom}</Card.Title> <br />
                <Card.Text>
                <h6 style={{  fontWeight: 'bold' }}>telefone :</h6> <br />
                {groups?.data?.attributes?.Tel}
                </Card.Text>
            </Card.Body>
            </div>
            <div className="ml-10 mt-3">
            <h6 style={{  fontWeight: 'bold' }}>les groups :</h6>
            <ul>
            {
            //    console.log() 
                arr?.data?.map((e)=>{
                    return (
                    <li key={e.id}>
                        {e?.attributes?.group_name}                       
                    </li>
                    )
                })
            }
            </ul>
            </div>
            </div>
            

        </Card>

        </div>   
    </>
)
}
export default Groupes;