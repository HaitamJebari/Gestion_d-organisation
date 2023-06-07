import React , {useContext, useEffect , useState} from "react";
import { dataAll, getgr ,Getgroupes} from "../api/Particip";
import { Button, Card, Table } from "react-bootstrap";
import { Link, useLocation, useParams } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import utilisateur from "../images/profile.jpg"
import { data } from "autoprefixer";
import '../Modifier.css';



function Groupes(){
    const {id} = useParams()
    const [groups,setgroupes]=useState([]);
    const [multigr,setMultigr]=useState([])

    const {selectedArray}=useContext(Context)


    
    useEffect(()=>{
        const callapi = async () =>{
            let data = await Getgroupes(id); 
            // console.log(data);
            setgroupes(data);     
            
        }   
        callapi(); 
        
    },[])
    // useEffect(()=>{
    //     const callgrou = async () =>{
    //         let res = await getgr(id); 
    //         // console.log(data);
    //         setArr(res);     
         
    //     }   
    //     callgrou(); 
    //     console.log("MultiGr :",multigr);
    // },[])
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
            <h6 style={{ fontWeight: 'bold' }}>les groups :</h6><br/>
            <ul>
                 {selectedArray}
            </ul>
            </div>
            </div>
            

        </Card>

        </div>   
    </>
)
}
export default Groupes;