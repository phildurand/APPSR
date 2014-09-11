//Premiers secours
var cas_accident=1;
var jamais_faire=1;
var agents_service=1;

function btn_retour(){
	var nb_page = history.length-1;
	nb_page = -nb_page;
	history.go(nb_page);

}

function affiche_reponse_securite_routiere(id_reponse){
	var count;
	var elements=document.getElementById(id_reponse);
	switch (id_reponse)
    {
	case 'reponse_cas_accident' : 
		var btn_libelle=document.getElementById('btn_cas_accident');
		if(cas_accident == 3)
        {
			cas_accident = 1;
		}
		count = cas_accident;
		cas_accident++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_jamais_faire').className="invisible";
			jamais_faire=1;
			document.getElementById('btn_jamais_faire').style.backgroundColor="#CDCDCD";
			
			document.getElementById('reponse_agent_intervention').className="invisible";
			agents_service=1;
			document.getElementById('agent_intervention').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_jamais_faire' :
		var btn_libelle=document.getElementById('btn_jamais_faire');
		if(jamais_faire == 3)
        {
			jamais_faire = 1;
		}
		count = jamais_faire;
		jamais_faire++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_cas_accident').className="invisible";
			cas_accident=1;
			document.getElementById('btn_cas_accident').style.backgroundColor="#CDCDCD";			
			
			document.getElementById('reponse_agent_intervention').className="invisible";
			agents_service=1;
			document.getElementById('agent_intervention').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#btn_cas_accident";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_agent_intervention' : 
		var btn_libelle=document.getElementById('agent_intervention');
		if(agents_service == 3)
        {
			agents_service = 1;
		}
		count = agents_service;
		agents_service++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_cas_accident').className="invisible";
			cas_accident=1;
			document.getElementById('btn_cas_accident').style.backgroundColor="#CDCDCD";
			
			document.getElementById('reponse_jamais_faire').className="invisible";
			jamais_faire=1;
			document.getElementById('btn_jamais_faire').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#btn_jamais_faire";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	}	
}