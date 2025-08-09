
// Fonction qui choisit quel fichier JSON ouvrir selon l'URL demandée
export const mockFetchByUrl = async (url) => {
    // 1. On transforme l'URL en un objet pour lire plus facilement ses parties
    // Exemple : url = "http://localhost:3000/user/12/activity"
    const { pathname } = new URL(url, "http://fake");
    // "http://fake" est juste là car new URL a besoin d'une base


    // 2. On coupe le chemin en morceaux (split sur "/")
    // Exemple: "/user/12/activity" devient ["", "user", "12", "activity"]
    const parts = pathname.split("/");

    const ressource = parts[1] // "user"
    const id = parts[2] // "12"
    const subResource = parts[3]; // "activity" ou "average-sessions" ou "performance" ou même undefined
    // parts = ["", "user", "12", "activity"]


    // 3. On choisit dans quel dossier aller chercher le JSON
    let folder = ressource; // par défaut, on prend "user"
    if (subResource) {
        folder = subResource; // si on a un sous-dossier, on l'utilise
    }


    // 4. On importe dynamiquement le fichier JSON correspondant
    //    ./activity/12.json   OU ./user/18.json   etc.
    const file = await import(`./${folder}/${id}.json`);


    // 5. Certains bundlers mettent les données dans .default, d'autres non → on gère les 2
    // On essaye d'abord "file.default". Si ça n'existe pas, on prend "file".
    return file.default ?? file;
}