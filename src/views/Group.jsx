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
    <div>
         <Table striped bordered hover>
        <thead>
        <tr className=''>
          <th className='w-7'>ID</th>
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
                            <Link to={`/Modfier/${e.id}`}>             
                            <Button as="Link" variant="primary">
                                Modfier
                            </Button>
                            </Link>
                            {/* <Link to={`/api/groups/${e.id}`}> */}
                                <Button as="Link" variant="danger" className='ml-5'onClick={()=>deleteItem(e.id)}>
                                Supprimer
                                </Button>
                            {/* </Link> */}


                            </td>
                        </tr>    
                    )
                })
            }
        </tbody>
        <Link to='/Ajouter'>             
           <Button as="Link" variant="success" className='mt-5'>
           Ajouter Nouvelle Group
        </Button>
        </Link>
    </Table>
    </div>
  )
}
