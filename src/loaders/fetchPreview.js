const {REACT_APP_API_HOST: host, REACT_APP_API_VERSION: version, REACT_APP_API_TOKEN: token} = process.env

export default async function fetchPreview({params}){
    const url = `${host}/${version}/core/preview-courses/${params.id ?? ''}`

    try{        
        const response = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}})
        if (!response.ok){
            console.error(response)
        }
        return await response.json()
    }catch(error){
        console.error(error)
    }
}