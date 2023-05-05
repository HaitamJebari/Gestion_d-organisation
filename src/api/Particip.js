

export const dataAll = async () =>{
    try{
    let fetchdata = await fetch('http://localhost:1337/api/participants?populate=groups')
    let data = await fetchdata.json();
    return (data)
    }catch(e){
        console.log(e)
        return 'ERROR'
    }
}

export const getgr = async (id) =>{
    try{
    let fetchdata = await fetch(`http://localhost:1337/api/participants/${id}?populate=groups`)
    let data = await fetchdata.json();
    return (data.data.attributes.groups)
    }catch(e){
        console.log(e)
        return 'ERROR'
    }
}
export const Getgroupes = async (id) =>{
    try{
    let fetchdata = await fetch(`http://localhost:1337/api/participants/${id}?populate=groups`)
    let data = await fetchdata.json();
    return (data)
    }catch(e){
        console.log(e)
        return 'ERROR'
    }
}


