import React, { useEffect, useState } from 'react'
import {api,deleteit} from '../api/Grou';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export default function Group() {



    const [tab,setTab] = useState([])
    useEffect(()=>{
        const callapi = async () =>{
            let data = await api();
            setTab(data);
        }
        
        callapi()
    })
    
    const deleteItem = async (id) =>{
        deleteit(id);
    }

  return (
    <>
        <div className="Title">
           <h1>Gestion des Groupes</h1>
        </div>
    <Link to='/Ajoutergr'>             
           <Button as="Link" variant="outline-success" className='ajt'>
           Ajouter un Nouveau Groupe
        </Button>
    </Link>
    <div className='table'>
         <Table striped bordered hover>
        <thead>
        <tr>
          <th>ID</th>
          <th>GROUPS</th>
          <th>ACTION</th>
        </tr>
        </thead>
        <tbody>
            {
                tab?.data?.map((e)=>{
                    // console.log(e);
                    return (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.attributes.group_name}</td>
                            <td>
                            <Link to={`/ModifierGroup/${e.id}`}>             
                            <Button as="Link" variant="outline-primary">
                                Modifier
                            </Button>
                            </Link>
                            {/* <Link to={`/api/groups/${e.id}`}> */}
                                <Button as="Link" variant="outline-danger" className='ml-5'onClick={()=>deleteItem(e.id)}>
                                Supprimer
                                </Button>
                            {/* </Link> */}


                            </td>
                        </tr>    
                    )
                })
            }
        </tbody>
        
    </Table>
    </div>
    </>
  )
}
