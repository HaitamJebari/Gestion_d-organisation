import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getOraganisation,deleteit } from '../api/organisation';
import '../Organisation_liste.css';




export default function Organisation_liste() {
    const [ortabl,setOrtabl] = useState([]);
    getOraganisation(setOrtabl);

   const deleteorg = (id)=>{
        deleteit(id);
    }
  return (
    <>
     <div className="cnt">
        <div className="Title">
           <h1>Gestion d'organisation</h1>
        </div>
           <Link to='/AjouterOrganisation'>             
                <Button as="Link" variant="outline-success" className='ajt'>
                Ajouter Une Nouvelle Organisation
                </Button>
           </Link>
        <div className='table'>
         <Table striped bordered hover>
        <thead>
        <tr className=''>
          <th>Nom</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {
                ortabl?.data?.map((e)=>{
                    // console.log(e);
                    return (
                        <tr key={e.id}>
                            <td>{e.attributes.name}</td>
                            <td>{e.attributes.description}</td>
                            <td>
                            <Link to={`/UpdateOrganisation/${e.id}`}>             
                            <Button className='Butt' as="Link" variant="outline-primary">
                                Modifier
                            </Button>
                            </Link>
                            <Link to={`/showGroups/${e.id}`}>             
                            <Button className='Butt' as="Link" variant="outline-info">
                                Consulter
                            </Button>
                            </Link>
                                <Button as="Link" className='Butt' variant="outline-danger" onClick={()=>deleteorg(e.id)}>
                                Supprimer
                                </Button>

                            </td>
                        </tr>    
                    )
                })
            }
        </tbody>
        
    </Table>
    </div>
    </div>
    </>
  )
}
