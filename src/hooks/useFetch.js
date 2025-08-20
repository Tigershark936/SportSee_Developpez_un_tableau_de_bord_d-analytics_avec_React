import { useState, useEffect } from "react";
import { mockFetchByUrl } from "../mock/router";

// true = lit les fichiers JSON du dossier /mocks (utile si le backend est down)
// false = appelle la vraie API avec fetch(url)
const USE_MOCK_ALL = false;

//ID qui doit TOUJOURS être mock (peu importe USE_MOCK_ALL)
const MOCK_ONLY_IDS = new Set(["55"]);


const useFetch = (url) => {
    // États du hook
    const [data, setdata] = useState({})  // Permet le stockage de la réponse de l'API
    const [isLoading, setLoading] = useState(true) // Indique si la requête est en cours
    const [error, setError] = useState(false) // Permet de suivre l’état d’une erreur

    useEffect(() => {
        // console.log('URL reçue', url);
        
        if(!url){
            // console.warn('⚠️ Aucun url donné', url);
            setLoading(false);
            return;
        }

        let canceled = false;

        const fetchData = async () => {
            try {
                let json;

                // Récupère juste l'ID depuis l'URL
                const pathname = new URL(url, "http://fake").pathname; 
                const id = pathname.split("/")[2];

                // Décision de la source : MOCK forcé OU MODE MOCK global
                const mustMock = USE_MOCK_ALL || MOCK_ONLY_IDS.has(id);

                if (mustMock) {
                    // console.log(" 🟢 MODE MOCK ACTIVÉ ");
                    json = await mockFetchByUrl(url);
                } else {
                    // console.log(" 🟣 MODE API RÉEL ");
                    const response = await fetch(url)
                    console.log("Réponse brute fetch :", response);

                    if (!response.ok) {
                        json = await mockFetchByUrl(url);
                    } else {
                        json = await response.json() // Les données sont bien au format JSON.
                    }
                }

                console.log("✅ Données stockées :", json);
                if (!canceled) {
                    setdata(json);  // donc je les stocks
                    setError(false);
                }
            } catch (errApi) {
                console.log(' ❌ Erreur pendant le fetch API', errApi);
                try {
                    const json = await mockFetchByUrl(url);
                    if (!canceled) {
                        setdata(json);
                        setError(false);
                    }   
                } catch (errMock)  {
                    console.log(' ❌ Erreur côté MOCK ', errMock);
                    if (!canceled) {
                        setError(true); // indication si il y a un problème 
                    }
                }
            } finally {
                if (!canceled) {
                    // console.log("Fin de recherche de la requête useFetch");
                    setLoading(false)
                }
            }
        }

        fetchData()
        return () => {canceled = true; };
    }, [url]);
        
    return { isLoading, data, error}
}

export default useFetch