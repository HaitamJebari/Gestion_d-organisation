import React , {useEffect , useState} from "react";
import { dataAll, getgr } from "../api/Particip";
import { Table } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';


function Groupes(){
    const {id} = useParams()
    const [groups,setgroupes]=useState([]);

    
    useEffect(()=>{
        const callapi = async () =>{
            let data = await getgr(id); 
            console.log(data);
            setgroupes(data);
        }   
        callapi(); 
    },[])

return(
    <>
        <div className="table">
        <Table striped bordered hover >
               <thead>
                  <th>Les Groupes</th>
               </thead>
               <tbody>
                            {
                                    groups?.data?.map((groups)=>{
                                    return (
                                    <div key={groups.id}>
                                           {groups?.attributes?.group_name}                       
                                    </div>
                                    )
                                })
                            }
                             
               </tbody>
        </Table>
        </div>   
    </>
)
}
export default Groupes;