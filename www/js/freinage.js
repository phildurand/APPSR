/*

 _______ .______       _______  __  .__   __.      ___       _______  _______ 
|   ____||   _  \     |   ____||  | |  \ |  |     /   \     /  _____||   ____|
|  |__   |  |_)  |    |  |__   |  | |   \|  |    /  ^  \   |  |  __  |  |__   
|   __|  |      /     |   __|  |  | |  . `  |   /  /_\  \  |  | |_ | |   __|  
|  |     |  |\  \----.|  |____ |  | |  |\   |  /  _____  \ |  |__| | |  |____ 
|__|     | _| `._____||_______||__| |__| \__| /__/     \__\ \______| |_______|
                                                                              

*/

function simuDistanceArret()
{
    var vitessem;
    var dtr;//distance de reaction
    var df;//distance de freinage
    var da;//distance d'arret

    vitessem = (document.getElementById('vitesseSimuArret').value)*1000;//recupere la vitesse en m/H

    if(isNaN(vitessem) || vitessem =='')
    {
        document.getElementById('erreurPopUpFrein').innerHTML="Veuillez entrer une vitesse";
        $("#popupDialogErreurFrein").popup('open');
        return;
    }

    dtr = distanceReaction(vitessem);
    df  = distanceFreinage(vitessem);
    da  = distanceArret(dtr, df);

    $("#DistancesPopUp").popup('open');  
}

function distanceReaction(vitessem)
{
    /*Temps de réaction en fontion de l'état de l'utilisateur*/
    var etat = document.getElementById('etatSimuDA').value;

    switch(etat)
    {
        case 'N'://"normal"
            etat = 1;//seconde de reaction
            break;
        case 'F'://fatigué
            etat = 2;
            break;
        case 'A'://alccolisé
            etat = 3;
            break;
    }

    var dtr = (vitessem*etat/3600).toFixed(2);//calcul la distance de reaction
    document.getElementById('distReaction').innerHTML="<b>Réaction : </b>"+dtr+" m";

    return dtr;
}

function distanceFreinage(vitessem)
{
    var chausse;

    if(formWeather.btnRadio[1].checked)
    {
        chausse=formWeather.btnRadio[1].value;
    }

    if(formWeather.btnRadio[0].checked)
    {
        chausse=formWeather.btnRadio[0].value;
    }

    switch(chausse)
    {
        case 'S'://seche
            df = ((Math.pow((vitessem/3600),2)/14)).toFixed(2);//math.pow : élevé à la puissance
            break;
        case 'M' ://mouillée
            df = ((Math.pow((vitessem/3600),2)/7)).toFixed(2);
    }

    document.getElementById('distFreinage').innerHTML="<b>Freinage : </b>"+df+" m";
    return df;
}

function distanceArret(dtr, df)
{
    da = (parseFloat(dtr) + parseFloat(df)).toFixed(2);//empeche la concatenation des nombres
    document.getElementById('distArret').innerHTML="<b>Arrêt : </b>"+da+" m";
}