/*
     ___       __        ______   ______     ______    __      
    /   \     |  |      /      | /  __  \   /  __  \  |  |     
   /  ^  \    |  |     |  ,----'|  |  |  | |  |  |  | |  |     
  /  /_\  \   |  |     |  |     |  |  |  | |  |  |  | |  |     
 /  _____  \  |  `----.|  `----.|  `--'  | |  `--'  | |  `----.
/__/     \__\ |_______| \______| \______/   \______/  |_______|
                                                               
*/
$(document).ready(function (){

    testInitialisation();
    $("#choisir_verres").tap(function () {
        var poids = document.getElementById('poids').value;//récupère le poids choisi par l'utilisateur
        if(isNaN(poids) == true || poids == '')
        {   
            $("#erreurPopUpAlcool").text('Veuillez indiquer votre poids');
            $("#popupDialogErreurAlcool").popup('open');
            return;
        }
        window.localStorage.setItem('Poids', poids);//stockage du genre en local pour récupérer la variable après le changement de page
        /*
        $(".contenuAlcool").hide({"slide": {direction:'left'}, "duration":600});
        $("#choix_alcool").show({"slide": {direction:'left'},"duration":600});
        */
    });

    $(".genre").bind("tap click", function () {
        //Initialisation d'une chaine vide pr recupérer le sexe de la personne
        var coeffDiffusion;
        //Homme ou Femme bouton radio
        if(formHF.btnRadio[1].checked)
        {
            coeffDiffusion=formHF.btnRadio[1].value;
            window.localStorage.setItem('Genre', coeffDiffusion);//stockage du genre en local pour récupérer la variable après le changement de page
            return;
        }

        if(formHF.btnRadio[0].checked)
        {
            coeffDiffusion = formHF.btnRadio[0].value;
            window.localStorage.setItem('Genre', coeffDiffusion);
        }
    });

/*
    $("#settings").bind("tap", function () {
        $.mobile.changePage("#page_config");
    });

    $("#resetAlcool").bind("tap", function (){
        initBoissons();
    });
*/
    /*Ajout/suppression des verres en fonction de la fleche appuyée*/
    $("#ajoutVerres").tap(function (){
        var nombre = $('#nombreVerres').html();//récupère le nombre de verre dans la pop up popupNbVerres
        nombre = parseInt(nombre);//tranforme en numérique
        if(nombre>=0 && nombre<10){//bridage du nombre de verres à 10
            nombre++;//augmente la valeur du nombre de verres dans la pop up
        }
        document.getElementById('nombreVerres').innerHTML=nombre;//affiche la version actuelle du nombre de verres
    });

    $("#enleverVerres").tap(function (){
        var nombre = $('#nombreVerres').html();//récupère le nombre de verre dans la pop up popupNbVerres
        nombre = parseInt(nombre);//tranforme en numérique
        if(nombre>0 && nombre<=10){//le nombre ne peut pas etre négatif
            nombre--;
        }
        document.getElementById('nombreVerres').innerHTML=nombre;//affiche la version actuelle du nombre de verres
    });

    $("#ajoutVerresBus").tap(function (){
        var nbVerres, tabVerresBus, boisson;
        var testBase = window.localStorage.getItem('NombreVerres');//variable pour l'envoie à la fonction simuAlcool
        var verre= window.localStorage.getItem('verre');
        verre=JSON.parse(verre);
        var verreBoisson= verre.nomV;
        var verreDegre = verre.degreV;
        var verreContenance = verre.volV;
        var existe=0;
        var cle=0;
        var vide = "";
        window.localStorage.setItem('verre', vide);//Réinitialise le stockage des caracteristiques de la boisson à vide

        nbVerres=$('#nombreVerres').html();//récupère le nombre de verres entré par l'utilisateur
               
        /*Modifie la valeur du nombre de verres dans la liste*/
        document.getElementById(verreBoisson).innerHTML=nbVerres;

        if((testBase==null)||(testBase=="")){//si l'utilisateur n'a pas encore ajouté de verres
            tabVerresBus=[];//initialisation d'un tableau
        }

        else{//si l'utilisateur a déjà entré des verres
            tabVerresBus=window.localStorage.getItem('NombreVerres');//récupère le nbr de verres de chaque boisson
            tabVerresBus=JSON.parse(tabVerresBus);//convertion au format JavaScript
        }

        boisson = {
            "boisson":verreBoisson,
            "degre":verreDegre,
            "contenance":verreContenance,
            "nbVerres": nbVerres,
        };

        /*Vérifie si l'utilisateur n'avait déjà pas mis un nombre de verre pour CETTE boisson*/
        $.each(tabVerresBus, function(key, value){//parcourt l'ensemble des boissons déjç choisies
            if((tabVerresBus[key]["boisson"])==(verreBoisson)){
                existe=1;
                cle=key;
            }
        });

        if(existe==1){//si l'utilisateur avait deja choisi cette boisson et qu'il veut modifier le nbr de verres
            tabVerresBus.splice(cle, 1);//on supprime la boisson dans la base temp
        }

        tabVerresBus.push(boisson);//on rajoute les caractéristique du verre dans le tableau
        tabVerresBus=JSON.stringify(tabVerresBus);//conversion format JSON

        //On stocke l'ensemble des boissons sélectionnées apr l'utilisateur
        window.localStorage.setItem('NombreVerres', tabVerresBus);

        //On ferme la pop up qui indique le nombre de verres
        setTimeout(function(){$("#popupNbVerres").popup("close")},290);
    });

    function afficheRes(tauxAlcool, dureeEliminationHeure, dureeEliminationMin)
    {
        if(dureeEliminationHeure==0)
        {//si le temps d'élimination est inférieur a une heure
            document.getElementById('reponse').innerHTML="<b>Taux d'alcoolémie : </b>"+tauxAlcool.toFixed(2)+" g/l.<br> <b>Temps d'élimination : </b>"+dureeEliminationMin+" min";
        }

        if(dureeEliminationHeure!=0)
        {
            document.getElementById('reponse').innerHTML="<b>Taux d'alcoolémie : </b>"+tauxAlcool.toFixed(2)+" g/l. <br> <b>Temps d'élimination : </b>"+dureeEliminationHeure+"h"+dureeEliminationMin+"min";
        }

        $("#popupgraphe").popup('open');
    }

    //simuTauxAlcool
    $("#calculerAlcool").tap(function (){
        //var genre=window.localStorage.getItem('Genre');//récupère la variable stockée en local
        var poids=window.localStorage.getItem('Poids');
        var verresBus=JSON.parse(window.localStorage.getItem('NombreVerres'));//recupère l'ensemble des verres bus et leurs caractéristiques
        var coeffDiffusion = window.localStorage.getItem('Genre');//récupère la variable stockée en local
        var tauxAlcool=0;
        var dureeEliminationD;//decimal
        var dureeEliminationH;//sous le format heure decimale
        var dureeEliminationHeure;//format heure H
        var erreur=0;//variable verifie si erreur lors de la saisie

        if(verresBus == null)
        {
            dureeEliminationHeure = 0;
            dureeEliminationMin = 0;
            afficheRes(tauxAlcool, dureeEliminationHeure, dureeEliminationMin);
            return false;
        }

        $.each(verresBus, function(key, value){//parcourt l'ensemble des verres bus
            //Récupère les caractéristiques
            var degreBoisson = verresBus[key]["degre"];
            var contenanceBoisson = verresBus[key]["contenance"];
            var nbVerres = verresBus[key]["nbVerres"];
            //Calcul du taux d'alcool
            tauxAlcool=tauxAlcool+(contenanceBoisson*(degreBoisson)*0.8*nbVerres)/(coeffDiffusion*poids);
        });

        if(tauxAlcool>=1.5)
        {
            //Change le message de la popup d'erreur
            document.getElementById('erreurPopUpAlcool').innerHTML="Vous avez dépassé les limites acceptables pour votre santé";
            //Ouvre la pop up
            $("#popupDialogErreurAlcool").popup('open');
            return;
        }

        //Si le taux est correct
        /*Definition du temps d'élémination du taux d'alcool dans le sang*/
        dureeEliminationD=tauxAlcool/0.15;
        dureeEliminationH=dureeEliminationD+"";//converti la durée en chaine de caractère
        
        //Heure
        var i=0;//compteur
        for(i=0;(dureeEliminationHeure!='.')&&(i<10);i++)
        {//tant qu'on a pas trouve la virgule
            dureeEliminationHeure=dureeEliminationH.substring(i,(i+1));//l'heure correspond a l'ensemble des chiffres placés jusqu'à la virgule
        }
        dureeEliminationHeure=dureeEliminationH.substring(0, i-1);//on recupere l'ensemble des chiffres places AVANT la virgule

        //Minute
        dureeEliminationMinD=(dureeEliminationH-dureeEliminationHeure).toFixed(2);//recupere les minutes en decimal et arrondi à la minute
        dureeEliminationMin=Math.round(dureeEliminationMinD*60);//converti les minutes decimales en minutes sous format Heure/min + arrondi à la minute
        
        afficheRes(tauxAlcool, dureeEliminationHeure, dureeEliminationMin);

        /*Représentation graphique du temps d'élimination*/
    /*
        function calculGraph(){
            var datatps=tauxAlcool.toFixed(2)+",";
            var taux=tauxAlcool.toFixed(2);

            while(taux>=0.15){
                taux=taux-0.15;
                taux=taux.toFixed(2)
                datatps=datatps+taux+",";
            }
            datatps=datatps+0.01;

            return datatps;
        }
    var calcultaux=calculGraph();
                            alert(calcultaux);

        $('#graphAlcool').highcharts({
            title: {
                text: 'Taux d\'alcoolémie en fonction du temps',
                x: -20 //center
            },
            xAxis: {
                
                categories: ['1', '2', '3', '4', '5', '6',
                    '7', '8', '9', '10', '11', '12']

            },
            yAxis: {
                title: {
                    text: 'Taux d\'alcool en g/L'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            xAxis: {
                title: {
                    text: 'Temps en heure'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Votre taux',
                showInLegend: false,               
                data: [tauxAlcool.toFixed(2)-0.0, tauxAlcool.toFixed(2)-0.15, tauxAlcool.toFixed(2)-0.3]//, tauxAlcool.toFixed(2)-0.45, tauxAlcool.toFixed(2)-0.6, tauxAlcool.toFixed(2)-0.75, tauxAlcool.toFixed(2)-0.9]
                //data: [+calcultaux]

            }],
            credits: {
                enabled: false //desactive la pub de HighChart.com
            },
            exporting: {
                enabled: false //desactive le bouton de sauvegarde de graph
            },
        });
        */

    });//fin function simuTauxAlcool

    /*Ajouter une boisson dans la base*/
    $("#ajouterBoisson").tap(function (){
        /*Récupération des caractéristiques de la nouvelle boisson*/
        var newBoisson   = document.getElementById('nvxBoisson').value;
        var newDegre     = document.getElementById('nvxDegre').value;
        var newVolume    = document.getElementById('nvxContenance').value;
        var baseActuelle = JSON.parse(window.localStorage.getItem('Boisson'));
        var erreur       = 0;
        var index        = 0;

        var expReg = /^[0-9]*$/;//expression reguliere, verifie si l'utilisateur n'entre que des chiffres
        var expRegboisson = /^[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]*$/;
        if(!expRegboisson.test(newBoisson))
        {
            $("#popUpNewBoisson").popup("close");//ferme la popup en cours car on ne peut pas ouvrir deux fenetres en meme temps
            //Change le message de la popup d'erreur
            document.getElementById('erreurPopUpAjtAlcool').innerHTML="N'utilisez que des chiffres et des lettres pour le nom des boissons";
            //Ouvre la pop up d'erreur
            window.setTimeout(function(){$("#popupDialogErreurAjtAlcool").popup('open')},200); 
            return false;
        }

        if((newDegre>100)|| !(expReg.test(newDegre))){
            $("#popUpNewBoisson").popup("close");//ferme la popup en cours car on ne peut pas ouvrir deux fenetres en meme temps
            //Change le message de la popup d'erreur
            document.getElementById('erreurPopUpAjtAlcool').innerHTML="Veuillez saisir un degré compris entre 0 et 100";
            //Ouvre la pop up d'erreur
            window.setTimeout(function(){$("#popupDialogErreurAjtAlcool").popup('open')},200); 
            return;
        }

        if((newBoisson=="")||(newDegre=="")||(newVolume=="")){//Si l'utilisateur ne remplit pas un champ
            $("#popUpNewBoisson").popup("close");//ferme la popup en cours car on ne peut pas ouvrir deux fenetres en meme temps
            //Change le message de la popup d'erreur
            document.getElementById('erreurPopUpAjtAlcool').innerHTML="Veuillez remplir les trois champs";
            //Ouvre la pop up d'erreur
            window.setTimeout(function(){$("#popupDialogErreurAjtAlcool").popup('open')},200); 
            return;
        }
        if((newVolume>2000)||(expReg.test(newVolume)==false)){
            $("#popUpNewBoisson").popup("close");//ferme la popup en cours car on ne peut pas ouvrir deux fenetres en meme temps
            //Change le message de la popup d'erreur
            document.getElementById('erreurPopUpAjtAlcool').innerHTML="Veuillez saisir un volume inférieur";

            //Ouvre la pop up d'erreur
            window.setTimeout(function(){$("#popupDialogErreurAjtAlcool").popup('open')},200); 
            return;
        }

        newBoisson = newBoisson.charAt(0).toUpperCase() + newBoisson.substring(1);

        /*Vérifie si une boisson du même nom n'est pas déjà présente dans la base*/
        $.each(baseActuelle, function(key, value){//parcourt la base actuelle des boissons
            if((baseActuelle[key]["boisson"])==(newBoisson)){
                $("#popUpNewBoisson").popup("close");//ferme la popup en cours car on ne peut pas ouvrir deux fenetres en meme temps
                //Change le message de la popup d'erreur
                document.getElementById('erreurPopUpAjtAlcool').innerHTML="Cette boisson existe déjà";
                //Ouvre la pop up d'erreur
                window.setTimeout(function(){$("#popupDialogErreurAjtAlcool").popup('open')},200);
                erreur=1;
            }
        });

        //Si tous les champs sont remplis correctement
        if(erreur==0){
            newDegre=newDegre/100;//transforme le degré en pourcentage pr la suite des caluls
            nouvelleBoisson =
            {
                "boisson"   :newBoisson,
                "degre"     :newDegre,
                "contenance":newVolume,
            };

            baseActuelle.push(nouvelleBoisson);//ajout de la nouvelle boisson dans le tableau
/*
            $.each(baseActuelle, function(key, value){
                for(i=0; (i<baseActuelle[key]["boisson"].length) && (i<nouvelleBoisson["boisson"].length); i++)
                {
                    if(baseActuelle[key]["boisson"].charCodeAt(i) == nouvelleBoisson["boisson"].charCodeAt(i))
                    {
                        console.log('idem' + baseActuelle[key]["boisson"].charAt(i) + ' ' + nouvelleBoisson["boisson"].charAt(i) + ' '+i);
                        continue;
                    }

                    if(nouvelleBoisson["boisson"].charCodeAt(i) > baseActuelle[key]["boisson"].charCodeAt(i))
                    {
                        console.log(nouvelleBoisson["boisson"].charAt(i) + ' > ' + baseActuelle[key]["boisson"].charAt(i) + ' ' +i);
                        if(nouvelleBoisson["boisson"] == baseActuelle[key]["boisson"].substring(0, nouvelleBoisson["boisson"].length))
                        {
                            console.log('here ' + baseActuelle[key]["boisson"].substring(0, nouvelleBoisson["boisson"].length));
            return false;
                        }

                        index++;
                        return true;
                    }
                    baseActuelle.splice(index, 0, nouvelleBoisson);
                    return false;
                }
                index++;
            });
*/
            //Trie du tableau par ordre alphabétique des boissons
            baseActuelle.sort(function (a,b) {
                /*
                if(a.boisson > b.boisson)
                {
                    return 1;
                }
                if(a.boisson < b.boisson)
                {
                    return -1;
                }*/
                return (a.boisson).localeCompare(b.boisson);
            });

            baseActuelle=JSON.stringify(baseActuelle);//conversion au format JSON
            window.localStorage.setItem('Boisson', baseActuelle);//enregistre le nouveau tableau dans le telephone
           
            //Ferme la pop up d'ajout de boisson
            $("#popUpNewBoisson").popup("close");

            var vide = "";
            window.localStorage.setItem('NombreVerres', vide);//Réinitialise le stockage des caracteristiques de la boisson à vide pour ne pas avoir d'ambiguité apres le rechargement de la page

            //window.location.reload();// Fonctionne sous FireFox ...
            $('#listeAlcools').html('');
            testInitialisation();
            $('#listeAlcools').listview("refresh");
        }
    });


/*


 __        ______     ______     ___       __              _______.___________.  ______   .______          ___       _______  _______ 
|  |      /  __  \   /      |   /   \     |  |            /       |           | /  __  \  |   _  \        /   \     /  _____||   ____|
|  |     |  |  |  | |  ,----'  /  ^  \    |  |           |   (----`---|  |----`|  |  |  | |  |_)  |      /  ^  \   |  |  __  |  |__   
|  |     |  |  |  | |  |      /  /_\  \   |  |            \   \       |  |     |  |  |  | |      /      /  /_\  \  |  | |_ | |   __|  
|  `----.|  `--'  | |  `----./  _____  \  |  `----.   .----)   |      |  |     |  `--'  | |  |\  \----./  _____  \ |  |__| | |  |____ 
|_______| \______/   \______/__/     \__\ |_______|   |_______/       |__|      \______/  | _| `._____/__/     \__\ \______| |_______|
                                                                                                                                      


*/
    /*Vérifie si l'utilisateur a déjà stocké les boissons de base*/
    function testInitialisation()
    {
        //Suppression des données (verres, poids, genre) saisies précédement
        window.localStorage.setItem('Genre', 0.6);//femme selectionnée par défaut
        window.localStorage.removeItem('Poids');
        window.localStorage.removeItem('NombreVerres');

        var test = window.localStorage.getItem('Boisson');
        var baseActuelle;

        if(test == null)//si la base est vide
        {
            initBoissons();//on initialise la base
            return;
        }

        //si des boissons sont déjà présentes dans le téléphone
        baseActuelle = JSON.parse(window.localStorage.getItem('Boisson'));//on récupère la base présente dans le mobile..
        afficheListe(baseActuelle, baseActuelle);//...et on l'affiche
    }

    function initBoissons(){

        /*Initialisation d'un tableau JavaScript*/
        var baseActuelle=[];

        /*Définition des boissons de base*/
        boisson1 = 
            {
                "boisson": "Biere",
                "degre":0.05,
                "contenance":250,
            };

        boisson2= 
            {   
                "boisson":"Champagne",
                "degre":0.12,
                "contenance":100,
            };

        boisson3=
            {
                "boisson":"Cidre",
                "degre":0.05,
                "contenance":250,
            };
        boisson4=
            {
                "boisson":"Digestif",
                "degre":0.45,
                "contenance":25,
            
            };
        boisson5=
            {
                "boisson":"Pastis",
                "degre":0.45,
                "contenance":25,
      
            };
        boisson6=
            {
                "boisson":"Porto",
                "degre":0.2,
                "contenance":60,           
            };
        boisson7=
            {
                "boisson":"Vin",
                "degre":0.12,
                "contenance":100,
            };
        boisson8=
            {
                "boisson":"Vodka",
                "degre":0.375,
                "contenance":40,
            };
        boisson9=
            {
                "boisson":"Whisky",
                "degre":0.45,
                "contenance":30,
     
            };

        /*Rajout de l'ensemble des boissons dans la base*/
        for(i=1; i<=9;i++)
        {
            var boisson="boisson"+i;
            baseActuelle.push(eval(boisson));//eval pour considerer boisson comme une variable et non un string
        }

        /*Affichage de l'ensemble des boissons dans la liste que peut choisir l'utilisateur*/
        //$("#listeAlcools").html("");
        afficheListe(baseActuelle, baseActuelle);

        /*Conversion au format JSON pour le stockage*/
        baseActuelle=JSON.stringify(baseActuelle);

        /*Stockage des boissons*/
        window.localStorage.setItem('Boisson', baseActuelle);

        /*Stockage une variable comme quoi la base est maintenant enregistrée en local dans le mobile*/
        /*
        initialise=1;
        window.localStorage.setItem('TestInitialisation', initialise);
        */
    }

    /*Affichage des noms de boissons dans la page pour choisir son alcool*/
    function afficheListe(liste, listeBoissons)//le premier parametre correspond au nom de la liste, le deuxieme au stockage format "parser"
    {
        //var PosixTimeStamp;
        $.each(listeBoissons, function(key, value){//parcourt l'ensemble de la liste passée en paramètre
            var listeActuelle = $("#listeAlcools").html();//récupère le contenu actuel de la liste d'alcools
            
            //document.getElementById('listeAlcools').innerHTML=listeActuelle + "<li class=\"ui-btn ui-icon-carat-r\" onClick=\"ouvrePopUpVerre('"+liste[key]["boisson"]+"','"+liste[key]["degre"]+"','"+liste[key]["contenance"]+"');\">"+liste[key]["boisson"]+"<span class=\"ui-li-count\" id=\""+liste[key]["boisson"]+"\" >"+0+"</span></li>";
            $("#listeAlcools").append("<li class=\"ui-btn ui-icon-carat-r\" >"+liste[key]["boisson"]+"<span class=\"ui-li-count\" id=\""+liste[key]["boisson"]+"\" >"+0+"</span></li>");
            
            $("#listeAlcools li #"+liste[key]["boisson"]).parents("li").bind("swipeleft", function () {
                //$(this).css('background-color', '#ffec00');
                $("#erreurPopUpSuppAlcool").text("Voulez vous supprimer cette boisson : "+liste[key]["boisson"] +" ?");
                $("#suppression_id").unbind();
                $("#suppression_id").bind("tap", function (){
                    supprimeBoisson(liste[key]["boisson"]);
                    $("#popupDialogErreurSuppAlcool").popup("close");
                    //$(this).css('background-color', '#f6f6f6');
                });
                $("#popupDialogErreurSuppAlcool").popup("open");
            });
            $("#listeAlcools li #"+liste[key]["boisson"]).parents("li").tap(function () {
               ouvrePopUpVerre(liste[key]["boisson"],liste[key]["degre"],liste[key]["contenance"]); 
            });

            /*Pour une suppression par longclick*/
    /*
            $("#listeAlcools li #"+liste[key]["boisson"]).parents("li").touchstart(function () {
                PosixTimeStamp = new Date().getTime();
            });

            $("#listeAlcools li #"+liste[key]["boisson"]).parents("li").touchend(function () {
                if(new Date().getTime()-PosixTimeStamp < 300)
                {
                    ouvrePopUpVerre(liste[key]["boisson"],liste[key]["degre"],liste[key]["contenance"]);
                    return;
                }
                $("#erreurPopUpSuppAlcool").text("Voulez vous supprimer cette boisson : "+liste[key]["boisson"] +" ?");
                $("#popupDialogErreurSuppAlcool").popup("open");
                $("#suppression_id").unbind();
                $("#suppression_id").bind("tap", function (){
                    supprimeBoisson(liste[key]["boisson"]);
                });
            });
    */
        });
    }

    function supprimeBoisson(boisson)
    {
        var listeBoissons = JSON.parse(window.localStorage.getItem('Boisson'));
        var index = 0;
        $.each(listeBoissons, function(key){
            if(listeBoissons[key]["boisson"] == boisson)
            {
                listeBoissons.splice(index, 1);
                window.localStorage.setItem('Boisson', JSON.stringify(listeBoissons));
                $('#listeAlcools').html('');
                testInitialisation();
                $('#listeAlcools').listview("refresh");
                return false;
            }
            index++;
        });
    }

    /*Boite de dialogue pour le choix du nombre de verrres*/
    function ouvrePopUpVerre(verreBoisson, verreDegre, verreContenance)
    {
        var verre;
        var vide = "";
        window.localStorage.setItem('verre', vide);//Réinitialise le stockage des caracteristiques de la boisson à vide, au cas où l'utilisateur cliquerait dans le vide au lieu d'ajouter

        /*Modifie les caractéristiques de la boisson a afficher*/
        document.getElementById('boissonAjtVerres').innerHTML=verreBoisson;
        document.getElementById('degreAjtVerre').innerHTML="<b>Degré : </b>"+verreDegre*100 +" %";
        document.getElementById('volumeAjtVerre').innerHTML="<b>Volume : </b>"+verreContenance+" mL";

    	$("#nombreVerres").text($("#"+verreBoisson).text());
        verre={
            "nomV":verreBoisson,
            "degreV":verreDegre,
            "volV":verreContenance,
        };

        verre=JSON.stringify(verre);//format JSON
        window.localStorage.setItem('verre', verre);//stock pr passer a la fonction ajout verre
      
        //Ouvre la pop Up
        $("#popupNbVerres").popup("open");
    }

});//fin document ready












//Ajax Carte de localisation

/*****************************************************************/
function affiche_carte() 
{
    var em=document.getElementById("carte_de_localisation");
    em.innerHTML='<iframe width="100%" height="93%" id="iframecarte" src="http://msr-cotesdarmor.com/wp-content/plugins/leaflet-maps-marker/leaflet-fullscreen.php?layer=5" frameborder="0"></iframe>';
}


