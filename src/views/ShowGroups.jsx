import React from 'react';
import {titleshow,getgroups,getinfo} from '../api/organisation';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import{ useEffect, useState } from 'react';
import organ from "../images/kisspng-hierarchical-organization-computer-icons-organizat-human-organization-5addcda32d2799.731398251524485539185.jpg"
export default function ShowGroups() {
    const {id} = useParams()
    const [title,setTitle] = useState();
    titleshow(id,setTitle); 


    const [arrgroup,setArrgroup] = useState([]);
    getgroups(id,setArrgroup); 

    

    const [group,setgroup] = useState([]);
     getinfo(id,setgroup); 

    
  return (
    <div>
        <div className="Title">
            <h1>consulter organisation : {title}</h1>
        </div>
        <Card className='mt-3'>
            <div className="d-flex">
            <div>
                <Card.Img src={organ} className="w-60 h-100"/>
            </div>
            <div>
            <Card.Body>
                <h6 style={{  fontWeight: 'bold' }}>Nom de organisation :</h6><br />
                <Card.Text> {title} </Card.Text> <br />
                <Card.Text>
                <h6 style={{  fontWeight: 'bold' }}>Description :</h6> <br />
                {group?.data?.attributes?.description}
                </Card.Text>
            </Card.Body>
            </div>
            <div className="ml-10 mt-3">
            <h6 style={{  fontWeight: 'bold' }}>les groups :</h6>
            <ul>
            {
            //    console.log() 
                arrgroup.data?.map((e)=>{
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
    <Link to="/organisation">
        <Button as="Link" variant="outline-success" className='ml-5 mt-4'>
            retour
        </Button>
    </Link>
    </div>
  )
}
