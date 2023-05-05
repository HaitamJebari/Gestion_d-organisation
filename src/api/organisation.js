
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

export const deleteit = async (id,setOpen)=>{

    try{    
        let Fdeleteitem = await fetch('http://192.168.1.88:1337/api/organisations/'+id,{
            method : 'DELETE',
        });
        let deleteite = await Fdeleteitem.json();
        setOpen(false)
        }catch (error) {
            console.warn(error);
            return 'walo';
        }
    }





// for add : 

export const ajouter = async (Norg,descorg,idgr)=>{

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
try{
    let dataB = {
        "data": {
                "name": Norg,
                "description": descorg,
                    "groups": {
                        "connect" : idgr
}}}
    let rawData = await fetch("http://192.168.1.88:1337/api/organisations?populate=groups",{
        method: 'POST',
        headers: myHeaders,
        body : JSON.stringify(dataB),
        redirect: 'follow',
        
    });

    let cdata = await rawData.json();
    console.log(cdata)
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

 export const showV = async (id)=>{

try{
    let rawData = await fetch("http://192.168.1.88:1337/api/organisations/"+id+"?populate=groups",{
        method: 'GET',
        
    });

    let res = await rawData.json();
    return res;


}catch (error) {
    console.warn(error);
    return 'walo';
}
}


// for update :

export const modifiedval = async (id,modification,modificationdesc,filt)=>{
    let bod = {"data": {"name": modification , "description":modificationdesc , "groups": {"set" : filt}}};
try{
    let rawData = await fetch( 'http://192.168.1.88:1337/api/organisations/'+id+'?populate=groups',{
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

export const titleshow = async (id,setTitle)=>{
    try{
        let rawData = await fetch("http://192.168.1.88:1337/api/organisations/"+id);
        let dataJson = await rawData.json();
            setTitle(dataJson.data.attributes.name);
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
}

// show groups : 


export const getgroups = async (id,setArrgroup)=>{

    try{
        let rawData = await fetch('http://192.168.1.88:1337/api/organisations/'+id+'?populate=groups');
        let dataJson = await rawData.json();
        setArrgroup(dataJson.data.attributes.groups);
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
}

export const getinfo = async (id,setgroup)=>{

    try{
        let rawData = await fetch('http://192.168.1.88:1337/api/organisations/'+id+'?populate=groups');
        let dataJson = await rawData.json();
        setgroup(dataJson);
    }catch (error) {
        console.warn(error);
        return 'walo';
    }
}


