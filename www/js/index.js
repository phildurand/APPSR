var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 3000);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function () {
    $(".simulateur").bind("tap", function () {
        switch ($(this).data("simu"))
        {
            case    'taux_dalcoolemie' :
                    $("#titre_avert").text('Taux d\'alcoolémie');
                    $("#msg_avert").text('Attention, les résultats des simulateurs sont donnés à titre indicatif.');
                    $("#continue_avert").attr('href','#page_taux_dalcoolemie');
                    break;
            case    'distance_de_freinage' :
                    $("#titre_avert").text('Distance de freinage');
                    $("#msg_avert").text('Attention, les résultats des simulateurs sont donnés à titre indicatif.');
                    $("#continue_avert").attr('href','#page_distance_de_freinage');
                    break;
            case    'comparateur_vitesse' :
                    $("#titre_avert").text('Comparateur de vitesse');
                    $("#msg_avert").text('Attention, les résultats des simulateurs sont donnés à titre indicatif.');
                    $("#continue_avert").attr('href','#page_comparateur_vitesse');
                    break;
        }
        $('#popupMsgAvert').popup('open');
    }); 

    $("#continue_avert").tap(function () {
        $(this).css({'background-color': '#ffd700', 'color' : 'black'});
        setTimeout(function () {$("#continue_avert").css('background-color', 'white');}, 300);
    });

    //Gestion de la fermeture de popup
    $(".closepopup").tap(function () {
        var objid = $(this).parents('[data-role=popup]').attr('id');

        setTimeout(function () {
            $("#"+objid).popup('close')
        }, 300);

        if(objid == "popupDialogErreurAjtAlcool")
        {
            setTimeout(function(){
                $("#popUpNewBoisson").popup('open');
            },410);
        }
    });

    $("#liencarteid").tap(function () 
    {
        var em=document.getElementById("carte_de_localisation");
        em.innerHTML='<iframe width="100%" height="93%" id="iframecarte" src="http://le-denmat.com/wp-content/plugins/leaflet-maps-marker/leaflet-fullscreen.php?layer=5" frameborder="0"></iframe>';
    });
/*
    function affiche_carte() 
{
    var em=document.getElementById("carte_de_localisation");
    em.innerHTML='<iframe width="100%" height="93%" id="iframecarte" src="http://le-denmat.com/wp-content/plugins/leaflet-maps-marker/leaflet-fullscreen.php?layer=5" frameborder="0"></iframe>';
}
*/
//UTILISER PLUGIN CORDOVA !
/*
    $(".checkCo").tap(function ()
    {
        var page_demande = $(this);
         $.getScript("http://jacxl.free.fr/cours_xl/inetok.js", function () {
//alert('inet');
//alert(inet);  

            if(typeof(inet) == 'undefined')
            {
                document.location.href = './index.html';
                $('#titre_avert').text('Erreur');
                $('#msg_avert').text('La page demandée requiert une connection internet.');
                $('#continue_avert').text('Ok');
                $("#continue_avert").attr('href','#');
                $('#continue_avert').tap(function () {
                    $('#popupMsgAvert').popup('close');
                });
                $('#popupMsgAvert').popup('open');
                return;
            }

            switch (page_demande.data("lien"))
            {
                case 'carte' :
                    $.mobile.changePage('#carte');
                    $('#carte_de_localisation').html('').append('<iframe width="100%" height="93%" id="iframecarte" src="http://le-denmat.com/wp-content/plugins/leaflet-maps-marker/leaflet-fullscreen.php?layer=5" frameborder="0"></iframe>');
                    break;

            }
         })
         
    });
*/
});
