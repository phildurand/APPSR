
/*
  ______   ______   .___  ___. .______      ___      .______          ___   .___________. _______  __    __  .______      
 /      | /  __  \  |   \/   | |   _  \    /   \     |   _  \        /   \  |           ||   ____||  |  |  | |   _  \     
|  ,----'|  |  |  | |  \  /  | |  |_)  |  /  ^  \    |  |_)  |      /  ^  \ `---|  |----`|  |__   |  |  |  | |  |_)  |    
|  |     |  |  |  | |  |\/|  | |   ___/  /  /_\  \   |      /      /  /_\  \    |  |     |   __|  |  |  |  | |      /     
|  `----.|  `--'  | |  |  |  | |  |     /  _____  \  |  |\  \----./  _____  \   |  |     |  |____ |  `--'  | |  |\  \----.
 \______| \______/  |__|  |__| | _|    /__/     \__\ | _| `._____/__/     \__\  |__|     |_______| \______/  | _| `._____|
                                                                                                                          
*/

function simuDistanceGtps()
{
    var distance;
    var vitesseActuelle, vitesseAutorisee, differenceVitesse;
    /*Récupération des données utilisateur*/
    distance          = document.getElementById('distanceSimuGtps').value;
    vitesseActuelle   = document.getElementById('vitesseActuelleSimuGtps').value;
    vitesseAutorisee  = document.getElementById('vitesseAutoriseeSimuGtps').value;
    differenceVitesse = vitesseActuelle - vitesseAutorisee;

    //Si l'utilisateur entre d'autres caractères que des chiffres
    if(isNaN(distance) == true || isNaN(vitesseActuelle) == true || isNaN(vitesseAutorisee) == true)
    {
        //Change le message de la popup d'erreur
        document.getElementById('erreurPopUpComp').innerHTML= "Utilisez seulement les chiffres digitaux pour remplir les champs demandés";
        //Affiche la pop up
        $('#popupDialogErreurComp').popup('open');
        document.getElementById('gainTps').innerHTML="";
        return;
    }

    //S'il entre une distance trop grande
    if(distance>2000)
    {
        //Change le message de la popup d'erreur
        document.getElementById('erreurPopUpComp').innerHTML= "Veuillez entrer une distance inférieure";
        //Affiche la pop up
        $('#popupDialogErreurComp').popup('open');
        document.getElementById('gainTps').innerHTML="";
        return;
    }

    //S'il n'entre pas de distance
    if(distance=='' || vitesseActuelle=='' || vitesseAutorisee=='')
    {
        //Change le message de la popup d'erreur
        document.getElementById('erreurPopUpComp').innerHTML= "Veuillez n'indiquer que des nombres";
        //Affiche la pop up
        $('#popupDialogErreurComp').popup('open');
        document.getElementById('gainTps').innerHTML="";
        return;
    }

    $("#consommation_p").hide();

    gain_Tps(distance, vitesseActuelle, vitesseAutorisee);
    contravention(differenceVitesse);
    /*******************************A tester au chargement de la page !!********************/
    vehicules_local();


		//Calcul de la consommation
	var conso = consommationCarburant(vitesseActuelle);
	document.getElementById('consoCarburant').innerHTML = " " + conso + "L / 100km";
	$("#consommation_p").show();
		
		
		//Calcul de la consommation à la vitesse autorisée
	var consoVitAutorisee = consommationCarburant(vitesseAutorisee);	
		
		//Affichage de la différence entre le cout du trajet réel, et le cout à vitesse autorisé	
	var prix = cout_trajet(conso, consoVitAutorisee, distance);
	
		//Si le cout reel est inférieur au cout à vitesse autorisé
		if(prix < 0){
			var prix1 = - prix;
			document.getElementById('gain_perte_cout_trajet').innerHTML = "<b>Économies : </b>" + prix1 + "€";
		}
		
		//Si le cout reel est supérieur au cout à vitesse autorisé
		if(prix > 0){
			document.getElementById('gain_perte_cout_trajet').innerHTML = "<b>Surcoût : </b>" + prix + "€";
		}
		
		//Si le cout réel est supérieur au cout à vitesse autorisée, on ne fait rien
		if(prix == 0){
			document.getElementById('gain_perte_cout_trajet').innerHTML = "";
		}

    /*Affiche les résultats*/
    $("#GainTpsPopUp").popup('open');
}

function gain_Tps(distance, vitesseActuelle, vitesseAutorisee)
{
    var gainTps, gainTpsH, gainTpsMin;
        document.getElementById('gainTps').innerHTML="<b>Perte de temps : </b> 0 Min";

    /*Calcul du gain de temps*/
    gainTps = distance*(parseFloat(vitesseActuelle)-parseFloat(vitesseAutorisee))/(parseFloat(vitesseActuelle)*parseFloat(vitesseAutorisee));//parseFloat-> string to float

    /*Convertion heure décimale/heure format H min*/
    gainTps=gainTps+"";//converti la durée en chaine de caractère
    //Heure
    var i=0;//compteur
    for(i=0;(gainTpsH!='.')&&(i<10);i++){//tant qu'on a pas trouve la virgule
        gainTpsH=gainTps.substring(i,(i+1));//l'heure correspond a l'ensemble des chiffres placés jusqu'à la virgule
    }
    gainTpsH=gainTps.substring(0, i-1);//on recupere l'ensemble des chiffres places AVANT la virgule

    //Minute
    gainTpsMin=(gainTps-gainTpsH).toFixed(2);//recupere les minutes en decimal et arrondi à la minute
    gainTpsMin=Math.round(gainTpsMin*60);//converti les minutes decimales en minutes sous format Heure/min + arrondi à la minute

    /*Gestion de l'affichage*/
    //Affiche du temps perdu/gagné
        console.log('h'+gainTpsH+'min'+gainTpsMin);

    if(gainTpsH==0 && gainTpsMin>0){
        document.getElementById('gainTps').innerHTML="<b>Gain de temps : </b>"+gainTpsMin+" Min";
        return;
    }

    if((gainTpsH==0)&&(gainTpsMin<0)){
        document.getElementById('gainTps').innerHTML="<b>Perte de temps : </b>"+gainTpsMin*(-1)+" Min";//ne pas afficher d'heure negative
        return;
    }

    if((gainTpsMin<=0)&&(gainTpsH<0)){
        document.getElementById('gainTps').innerHTML="<b>Perte de temps : </b>"+gainTpsH*(-1)+" H "+gainTpsMin*(-1)+" Min";//ne pas afficher d'heure negative
        return;
    }

    if((gainTpsMin>=0)&&(gainTpsH>0)){
        document.getElementById('gainTps').innerHTML="<b>Gain de temps : </b>"+gainTpsH+" H "+gainTpsMin+" Min";
        return;
    }
}

function contravention(differenceVitesse)
{
    if(differenceVitesse<=0){//si l'excès de vitesse est inférieur ou égal à 0
        document.getElementById('amendeEuros').innerHTML="0";
        document.getElementById('amendePoints').innerHTML="0 point";
        return;
    }
    if(differenceVitesse>0 && differenceVitesse<20){//si l'excès de vitesse est inférieur à 20 km/h
        document.getElementById('amendeEuros').innerHTML="45";
        document.getElementById('amendePoints').innerHTML="-1 point";
        return;
    }
    if(differenceVitesse>=20 && differenceVitesse<30){//si l'excès de vitesse est compris entre 20 et 30 km/h
        document.getElementById('amendeEuros').innerHTML="90";
        document.getElementById('amendePoints').innerHTML="-2 points";
        return;
    }
    if(differenceVitesse>=30 && differenceVitesse<40){//si l'excès de vitesse est compris entre 30 et 40 km/h
        document.getElementById('amendeEuros').innerHTML="90";
        document.getElementById('amendePoints').innerHTML="-3 points";
        return;
    }
    if(differenceVitesse>=40 && differenceVitesse<50){//si l'excès de vitesse est compris entre 40 et 50 km/h
        document.getElementById('amendeEuros').innerHTML="90";
        document.getElementById('amendePoints').innerHTML="-4 points";
        return;
    }
    if(differenceVitesse>=50){//si l'excès de vitesse est supérieur à 50 km/h
        document.getElementById('amendeEuros').innerHTML="<1500";
        document.getElementById('amendePoints').innerHTML="-6 points";
        return;
    }
}

function consommationCarburant(vitesseActuelle)
{	
    var voiture, conso, conso_fixe;
	var vitesse_fixe = "110";
    var liste_voiture = JSON.parse(window.localStorage.getItem('Voiture'));
    for(i=0; i<3; i++)
    {
        if(formConso.btnRadio[i].checked)
        {
            voiture = formConso.btnRadio[i].value;
        }
    }

    $.each(liste_voiture, function(key, value){
        if(liste_voiture[key]["voiture"] == voiture)
        {
            conso_fixe = liste_voiture[key][vitesse_fixe];
			conso = vitesseActuelle*conso_fixe/vitesse_fixe;
			conso = conso.toFixed(2);
            return false; //Sort du each
        }
    });
    return conso;
}

function cout_trajet(conso, consoVitAutorisee, distance){
	var prix_carburant = 1.40; //€ par litre
	var reel = (((conso/100)*distance)*prix_carburant).toFixed(2);
	var autorise = (((consoVitAutorisee/100)*distance)*prix_carburant).toFixed(2);
	return (reel - autorise).toFixed(2);
}

function vehicules_local()
{
    liste_voiture = [];

    var v1 =
    {   
        "voiture" : "citadine",
        "90" : 5.4,
        "110": 6.6,
        "130": 7.8
    };

    var v2 =
    {
        "voiture" : "monospace",
        "90" : 6.5,
        "110": 8.0,
        "130": 9.4
    };

    var v3 =
    {
        "voiture" : "berline",
        "90" : 5.6,
        "110": 6.8,
        "130": 8.1
    };

    //Ajout de l'ensemble des véhicules dans la liste
    for(i=1; i<=3; i++)
    {
        var voiture = "v"+i;
        liste_voiture.push(eval(voiture));
    }

    liste_voiture = JSON.stringify(liste_voiture);

    //Stockage en local de la lsite
    window.localStorage.setItem('Voiture', liste_voiture); 
}