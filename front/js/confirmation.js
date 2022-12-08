let onPageUrl = window.location;
//je récupère l'Id dans l'URL
let url = new URL(onPageUrl);
let id = url.searchParams.get("orderId");
//Puis je l'ajoute directement dans le fichier html ayant pour Id orderId
document.getElementById("orderId").innerText = id;