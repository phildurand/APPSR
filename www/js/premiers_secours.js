//Premiers secours
var donner_alerte=1;
var etouffement=1;
var inconscience=1;
var saignement=1;
var arret_cardiaque=1;

function affiche_reponse_premier_secours(id_reponse){
	var count;
	var elements=document.getElementById(id_reponse);
	switch (id_reponse)
    {
	case 'reponse_donner_alerte' : 
		var btn_libelle=document.getElementById('boutonDonnerAlerte');
		if(donner_alerte == 3)
        {
			donner_alerte = 1;
		}
		count = donner_alerte;
		donner_alerte++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_etouffement').className="invisible";
			document.getElementById('reponse_inconscience').className="invisible";
			document.getElementById('reponse_saignement').className="invisible";
			document.getElementById('reponse_arret_cardiaque').className="invisible";
			etouffement=1;
			inconscience=1;
			saignement=1;
			arret_cardiaque=1;
			document.getElementById('boutonEtouffement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonInconscience').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonSaignement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonCardiaque').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_etouffement' :
		var btn_libelle=document.getElementById('boutonEtouffement');
		if(etouffement == 3)
        {
			etouffement = 1;
		}
		count = etouffement;
		etouffement++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_donner_alerte').className="invisible";
			document.getElementById('reponse_inconscience').className="invisible";
			document.getElementById('reponse_saignement').className="invisible";
			document.getElementById('reponse_arret_cardiaque').className="invisible";
			donner_alerte=1;
			inconscience=1;
			saignement=1;
			arret_cardiaque=1;
			document.getElementById('boutonDonnerAlerte').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonInconscience').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonSaignement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonCardiaque').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#boutonDonnerAlerte";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_inconscience' : 
		var btn_libelle=document.getElementById('boutonInconscience');
		if(inconscience == 3)
        {
			inconscience = 1;
		}
		count = inconscience;
		inconscience++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_donner_alerte').className="invisible";
			document.getElementById('reponse_etouffement').className="invisible";
			document.getElementById('reponse_saignement').className="invisible";
			document.getElementById('reponse_arret_cardiaque').className="invisible";
			donner_alerte=1;
			etouffement=1;
			saignement=1;
			arret_cardiaque=1;
			document.getElementById('boutonDonnerAlerte').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonEtouffement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonSaignement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonCardiaque').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#boutonEtouffement";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_saignement' :
		var btn_libelle=document.getElementById('boutonSaignement');
		if(saignement == 3)
        {
			saignement = 1;
		}
		count = saignement;
		saignement++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_donner_alerte').className="invisible";
			document.getElementById('reponse_etouffement').className="invisible";
			document.getElementById('reponse_inconscience').className="invisible";
			document.getElementById('reponse_arret_cardiaque').className="invisible";
			donner_alerte=1;
			etouffement=1;
			inconscience=1;
			arret_cardiaque=1;
			document.getElementById('boutonDonnerAlerte').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonEtouffement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonInconscience').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonCardiaque').style.backgroundColor="#CDCDCD";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#boutonInconscience";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	case 'reponse_arret_cardiaque' : 
		var btn_libelle=document.getElementById('boutonCardiaque');
		if(arret_cardiaque == 3)
        {
			arret_cardiaque = 1;
		}
		count = arret_cardiaque;
		arret_cardiaque++;
		if(count==1)
        {
			elements.className="visible";
				//Fermeture des autres affichages
			document.getElementById('reponse_donner_alerte').className="invisible";
			document.getElementById('reponse_etouffement').className="invisible";
			document.getElementById('reponse_inconscience').className="invisible";
			document.getElementById('reponse_saignement').className="invisible";
			donner_alerte=1;
			etouffement=1;
			inconscience=1;
			saignement=1;
			document.getElementById('boutonDonnerAlerte').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonEtouffement').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonInconscience').style.backgroundColor="#CDCDCD";
			document.getElementById('boutonSaignement').style.backgroundColor="#CDCDCD";
			btn_libelle.style.backgroundColor="#FFD700";
			
			btn_libelle.style.backgroundColor="#FFD700";
			//document.location.href="#boutonSaignement";
		}
		
		if(count==2)
        {
			elements.className="invisible";
			btn_libelle.style.backgroundColor="#CDCDCD";
		}
		break;
	}	
}