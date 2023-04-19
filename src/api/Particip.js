

export const dataAll = async () =>{
    try{
    let fetchdata = await fetch('http://192.168.1.88:1337/api/participants?populate=groups')
    let data = await fetchdata.json();
    return (data)
    }catch(e){
        console.log(e)
        return 'ERROR'
    }
}