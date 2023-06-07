import React, { useState, useEffect  } from "react";
import { dataAll } from "../api/Particip";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Confirm,useRecordContext,useDelete} from 'react-admin';
import '../Participants.css';
import ReactPaginate from "react-paginate";
import axios from "axios";
function Participants () {
    const [Participants,setparticipants]=useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    // useEffect(()=>{
    //     const data = async () =>{
    //         let dt = await dataAll();
    //         setparticipants(dt)
    //     }
    //     data();

    // },[]);

    useEffect(() => {
        axios
          .get(`http://192.168.1.88:1337/api/participants?pagination[page]=${currentPage}&pagination[pageSize]=3`)
          .then((response) => {
            console.log(response);
            // let res = response.json();
            setparticipants(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [currentPage]);
    
    
    const delt = (itemId) =>{
        //groups
        //192.168.1.88
      fetch(`http://192.168.1.88:1337/api/participants/${itemId}`+`?populate=group` ,{ method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression des données');
        }
        let a = Participants.data.filter(item => item.id !== itemId)
        setparticipants({data:a});
        setOpen(false);
       })
        .catch(error => {
           console.error(error);
       });
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
            <h1>Gestion des Participants</h1>
        </div>
        <div className="cnt">
            
            <Link to={`/Ajouter`}>
                <Button as="Link" variant="outline-success" className='ajt' >
                    Ajouter un Nouveau Participant
                </Button>
            </Link>
            
            {/* //Pagination */}
            {/* <div className="pag">
              
            </div> */}
        <div className="table">
        <ReactPaginate
                pageCount={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination ml-5"}
                activeClassName={"active"}
            />
         <Table striped bordered hover >
               <thead>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Telefone</th>
                  <th>Action</th>
               </thead>
               <tbody>
                  {Participants?.data?.data?.map((Participants) => (
                      <tr key={Participants?.attributes.id}>
                          <td>{Participants.attributes.Nom}</td>
                          <td>{Participants.attributes.Prenom}</td>
                          <td>{Participants.attributes.Tel}</td>
                          <td>
                          <Link to={`/modifier/${Participants.id}`}>
                                <Button as="Link" id="Button" variant="outline-primary">
                                    Modifier
                                </Button>
                          </Link>
                          <Link to={`/Groupes/${Participants.id}`}>
                                <Button as="Link" id="Button" variant="outline-info">
                                    consulter
                                </Button>
                          </Link>
                            <Button as="Link" id="Button" variant="outline-danger" className='ml-5' onClick={handleClick}>
                                Supprimer
                            </Button>
                            <Confirm
                                    isOpen={open}
                                    title={`Delete le participant : `+ Participants.attributes.Nom + Participants.attributes.Prenom}
                                    content="Are you sure you want to delete this item?"
                                    onConfirm={()=>delt(Participants.id)}
                                    onClose={handleDialogClose}
                            />
                          </td>
                      </tr>
                 ))}
               </tbody>
            </Table>
            
        </div>
        </div>
       
        </>
    );
}
export default Participants;