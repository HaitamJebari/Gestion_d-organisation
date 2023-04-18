import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getOraganisation,deleteit } from '../api/organisation';



export default function Organisation_liste() {
    const [ortabl,setOrtabl] = useState([]);
    getOraganisation(setOrtabl);

   const deleteorg = (id)=>{
        deleteit(id);
    }
  return (
    <div>
         <Table striped bordered hover>
        <thead>
        <tr className=''>
          <th className='w-7'>ID</th>
          <th>name</th>
          <th>description</th>
          <th>action</th>
        </tr>
        </thead>
        <tbody>
            {
                ortabl?.data?.map((e)=>{
                    // console.log(e);
                    return (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.attributes.name}</td>
                            <td>{e.attributes.description}</td>
                            <td>
                            <Link to={`/UpdateOrganisation/${e.id}`}>             
                            <Button as="Link" variant="primary">
                                Modfier
                            </Button>
                            </Link>
                            <Link to={`/showGroups/${e.id}`}>             
                            <Button as="Link" variant="info" className='ml-5'>
                                voir les groupes
                            </Button>
                            </Link>
                                <Button as="Link" variant="danger" className='ml-5'onClick={()=>deleteorg(e.id)}>
                                Supprimer
                                </Button>

                            </td>
                        </tr>    
                    )
                })
            }
        </tbody>
        <Link to='/AjouterOrganisation'>             
           <Button as="Link" variant="success" className='mt-5'>
           Ajouter Nouvelle organisation
        </Button>
        </Link>
    </Table>
    </div>
  )
}
