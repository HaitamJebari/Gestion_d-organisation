import React, { useEffect, useState } from 'react'
import {api,deleteit} from '../api/Grou';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Confirm, useRecordContext } from 'react-admin';
export default function Group() {

    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tab,setTab] = useState([])
    const [tab2,setTab2] = useState([])

    useEffect(()=>{
        const callapi = async () =>{
            let data = await api(); 
            setTab2(data)
        }   
        callapi(); 
    },[])
    
    useEffect(() => {
        //192.168.1.88
        axios
          .get(`http://192.168.1.88:1337/api/groups?pagination[page]=${currentPage}&pagination[pageSize]=5`)
          .then((response) => {
            console.log(response);
            // let res = response.json();
            setTab(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [currentPage]);
    
    const deleteItem = async (id) =>{
        deleteit(id,setOpen);
    }

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
      };

      const record = useRecordContext();
      const handleClick = () => setOpen(true);
      const handleDialogClose = () => setOpen(false);
  
      console.log('tab2',tab2)

  return (
    <>
    <div className="Title">
        <h1>Gestion des Groupes</h1>
    </div>
    <div className="cnt">
    <Link to='/Ajoutergr'>             
           <Button as="Link" variant="outline-success" className='ajt'>
           Ajouter un Nouveau Groupe
           </Button>
    </Link>
    <div className='table'>
    <ReactPaginate
                pageCount={tab2?.data?.length /5}
                onPageChange={handlePageChange}
                containerClassName={"pagination ml-5"}
                activeClassName={"active"}
            />
    <Table id='table' striped bordered hover>
        <thead>
        <tr>
          <th>ID</th>
          <th>GROUPS</th>
          <th>ACTION</th>
        </tr>
        </thead>
        {/* ici tbody */}
        {/* <tbody>
            <tr><td>1</td><td>GroupNum1</td><td><Button as="Link" variant="outline-primary"> Modifier</Button><Button as="Link" variant="outline-danger" className='ml-5'onClick={handleClick}>Supprimer</Button></td></tr>
            <tr><td>2</td><td>GroupNum2</td><td><Button as="Link" variant="outline-primary"> Modifier</Button><Button as="Link" variant="outline-danger" className='ml-5'onClick={handleClick}>Supprimer</Button></td></tr>
            <tr><td>3</td><td>GroupNum3</td><td><Button as="Link" variant="outline-primary"> Modifier</Button><Button as="Link" variant="outline-danger" className='ml-5'onClick={handleClick}>Supprimer</Button></td></tr>
            <tr><td>4</td><td>GroupNum4</td><td><Button as="Link" variant="outline-primary"> Modifier</Button><Button as="Link" variant="outline-danger" className='ml-5'onClick={handleClick}>Supprimer</Button></td></tr>

        </tbody> */}
 <tbody>
            {
                tab?.data?.data?.map((e)=>{
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
                                <Button as="Link" variant="outline-danger" className='ml-5'onClick={handleClick}>
                                Supprimer
                                </Button>
                                <Confirm
                                    isOpen={open}
                                    title={`Delete le group : `+e.attributes.group_name}
                                    content="Are you sure you want to delete this item?"
                                    onConfirm={()=>deleteItem(e.id)}
                                    onClose={handleDialogClose}
                            />
                            {/* </Link> */}


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


