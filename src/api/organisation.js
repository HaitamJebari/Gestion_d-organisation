
// for show elements : 

import { data } from "autoprefixer";
import { useEffect } from "react";


export const getOraganisation = async (setOrtabl)=>{

    try{
        let rawData = await fetch('http://192.168.1.88:1337/api/organisations');
        let dataJson = await rawData.json();
        return setOrtabl(dataJson);
    
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
    }
    

// for delete :

export const deleteit = async (id)=>{

    try{    
        let Fdeleteitem = await fetch('http://localhost:1337/api/organisations/'+id,{
            method : 'DELETE',
        });
        let deleteite = await Fdeleteitem.json();
        }catch (error) {
            console.warn(error);
            return 'walo';
        }
    }


// for add : 

export const ajouter = async (Norg,descorg)=>{

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
try{
    let dataB = {"data":{"name": Norg , "description" : descorg}};
    let rawData = await fetch('http://localhost:1337/api/organisations',{
        method: 'POST',
        headers: myHeaders,
        body : JSON.stringify(dataB),
        redirect: 'follow',
        
    });

    let cdata = await rawData.json();
    if (cdata.data === null){
        alert('ce organisation est deja exists dans le tableau')
    }else{
        alert('organisation name is Added ');
        window.location.replace('/organisation');
    }
}catch (error) {
    console.warn(error);
    return 'walo';
}
}

//show value for update :

 export const showV = (id,setDeftval,setDefdesctval)=>{
    useEffect(()=>{
        fetch("http://localhost:1337/api/organisations/"+id).then((res)=>{
            return res.json();
        }).then((res)=>{
            setDeftval(res.data.attributes.name);
            setDefdesctval(res.data.attributes.description);
        }).catch( (error)=> {
            console.warn(error);
            return 'walo';
        })
    })
}

// for update :

export const modifiedval = async (id,modification,modificationdesc)=>{
    let bod = {"data": {"name": modification , "description":modificationdesc}};
try{
    let rawData = await fetch( 'http://localhost:1337/api/organisations/'+id,{
        method: 'PUT',        
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bod)
    });
    let cdata = await rawData.json();
    if (cdata.data === null){
        alert('cette organisation est deja exists dans le tableau')
    }else{
        alert('organisation is modified ');
        window.location.replace('/organisation');
    }
    // console.log(cdata)
       


}catch (error) {
    console.warn(error);
    return 'walo';
}
}


// show value for the title of groups liste : 

export const titleshow = (id,setTitle)=>{
    useEffect(()=>{
        fetch("http://localhost:1337/api/organisations/"+id).then((res)=>{
            return res.json();
        }).then((res)=>{
            setTitle(res.data.attributes.name);
        }).catch( (error)=> {
            console.warn(error);
            return 'walo';
        })
    },[])
}

// show groups : 


export const getgroups = async (id,setArrgroup)=>{

    try{
        let rawData = await fetch('http://localhost:1337/api/organisations/'+id+'?populate=groups');
        let dataJson = await rawData.json();
        return setArrgroup(dataJson.data.attributes.groups);
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
    }


