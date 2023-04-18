import React, { useState } from 'react'
import {titleshow,getgroups} from '../api/organisation';
import { Link, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
export default function ShowGroups() {
    const {id} = useParams()
    const [title,setTitle] = useState();
    titleshow(id,setTitle);

    const [arrgroup,setArrgroup] = useState([]);
    getgroups(id,setArrgroup);
  return (
    <div>
        <h1 className='mt-3'>the groups of {title}</h1>
        <Table striped bordered hover className='mt-2'>
        <thead>
        <tr className=''>
          <th>group name</th>
        </tr>
        </thead>
        <tbody>
            {
                arrgroup?.data?.map((e)=>{
                    return (
                        <tr key={e.id}>
                            <td>{e.attributes.group_name}</td>
                        </tr>    
                    )
                })
            }
        </tbody>
    </Table>
    <Link to="/organisation">
        <Button as="Link" variant="outline-success" className='ml-5'>
            retour
        </Button>
    </Link>
    </div>
  )
}
