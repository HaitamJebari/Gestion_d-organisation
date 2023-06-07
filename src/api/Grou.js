import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// fetch for affichage :


export const api = async ()=>{

try{
    let rawData = await fetch('http://192.168.1.88:1337/api/groups');
    let dataJson = await rawData.json();
    return dataJson;

}catch (error) {
    console.warn(error);
    return 'walo';
}
}





// fetch for delete :


export const deleteit = async (id,setOpen)=>{

try{    
    let Fdeleteitem = await fetch('http://192.168.1.88:1337/api/groups/'+id,{
        method : 'DELETE',
    });
    let deleteite = await Fdeleteitem.json();
    console.log(deleteite);
    setOpen(false)
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
}



// fetch for Add :


export const ajt = async (groupName)=>{

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
try{
    let dataB = {"data":{"group_name": groupName}};
    let rawData = await fetch('http://192.168.1.88:1337/api/groups',{
        method: 'POST',
        headers: myHeaders,
        body : JSON.stringify(dataB),
        redirect: 'follow',
        
    });

    let cdata = await rawData.json();
    if (cdata.data === null){
        alert('ce nom est deja exists dans le tableau')
    }else{
        alert('group name is Added ');
        window.location.replace('/gr');
    }
}catch (error) {
    console.warn(error);
    return 'walo';
}
}


// fetch to show default value :

export const ft = async (id,setDefaultval)=>{
    useEffect(()=>{
    fetch("http://192.168.1.88:1337/api/groups/"+id).then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res)
        setDefaultval(res.data.attributes.group_name);
    })
    })
}



// fetch for update :


export const upd = async (modifs,id)=>{
    let bod = {"data": {"group_name": modifs}};
try{
    //192.168.1.88
    let rawData = await fetch( 'http://192.168.0.180:1337/api/groups/'+id,{
        method: 'PUT',        
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bod)
    });
    let cdata = await rawData.json();
    if (cdata.data === null){
        alert('ce nom est deja exists dans le tableau')
    }else{
        alert('group name is modified ');
        window.location.replace('/gr');
    }
    // console.log(cdata)
       


}catch (error) {
    console.warn(error);
    return 'walo';
}
}





