import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState({})  // Permet le stockage de la réponse de l'API
    const [isLoading, setLoading] = useState(true) // Indique si la requête est en cours
    const [error, setError] = useState(false) // Permet de suivre l’état d’une erreur

    useEffect(() => {
        console.log('url', url);
        
        if(!url){
            console.log( 'Aucun url donné', url);
            return;
        }

        const fetchData = async () => {
            
            try {
                const response = await fetch(url)
                const json = await response.json() // Les données sont bien au format JSON.
                setData(json); // donc je les stocks
            } catch (err) {
                console.log('Erreur', err);
                setError(true) // indication si il y a un problème 
            } finally {
                console.log("Fin de recherche");
                setLoading(false)
            }
        }
        fetchData()
    }, [url]);
        
    return { isLoading, data, error}
}

export default useFetch