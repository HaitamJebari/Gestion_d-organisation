import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { getOraganisation,deleteit } from '../api/organisation';
import '../Organisation_liste.css';
import { Confirm,useRecordContext,useDelete} from 'react-admin';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';




export default function Organisation_liste() {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ortabl,setOrtabl] = useState([]);
    useEffect(() => {
        axios
          .get(`http://192.168.1.88:1337/api/organisations?pagination[page]=${currentPage}&pagination[pageSize]=3`)
          .then((response) => {
            console.log(response);
            // let res = response.json();
            setOrtabl(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [currentPage]);

    
    // getOraganisation(setOrtabl);

   const deleteorg = (id)=>{
        deleteit(id,setOpen);
    }

    const record = useRecordContext();
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
      };
  return (
    <>
        <div className="Title">
           <h1>Gestion d'organisation</h1>
        </div>
    <Link to='/AjouterOrganisation'>             
           <Button as="Link" variant="outline-success" className='ajt'>
           Ajouter Une Nouvelle Organisation
        </Button>
    </Link>
    <div className="cnt">
    <div className='table'>
            <ReactPaginate
                pageCount={3}
                limit={20}
                onPageChange={handlePageChange}
                containerClassName={"pagination ml-5"}
                activeClassName={"active"}
                ellipsis={1}
            />
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
                ortabl?.data?.data?.map((e)=>{
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
                                consulter
                            </Button>
                            </Link>
                                <Button as="Link" className='Butt' variant="outline-danger" onClick={handleClick}>
                                Supprimer
                                </Button>
                                <Confirm
                                    isOpen={open}
                                    title={`Delete la organisation : `+ e.attributes.name}
                                    content="Are you sure you want to delete this item?"
                                    onConfirm={()=>deleteorg(e.id)}
                                    onClose={handleDialogClose}
                            />
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
