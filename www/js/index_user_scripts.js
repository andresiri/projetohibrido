(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {        
    
     function listarContatos() {
         $("#listview-contatos").empty();
        
        var options = new ContactFindOptions();
        options.multiple = true;
        options.filter = "";
        
        var filter = ["*"];
        
        navigator.contacts.find(filter, function(contatos) {
           for (var i=0; i < contatos.length; i++) {
               var contato = contatos[i];               
               var nome = contato.name.givenName;
               var telefone = "...";
               var email = "...";
               
               if (contato.phoneNumbers) telefone = contato.phoneNumbers[0].value;
               if (contato.emails) email = contato.emails[0].valeu;
               
               var item = '<li>' +
                            '<a>' +
                                '<h3>' + nome + '</h3>' +
                                '<p><i class="icon phone"></i>' + telefone + '</p>' +
                            '</a>' +
                            '</li>';
               
               $("#listview-contatos").append(item);                                  
           } 
        });
     }
     
     listarContatos();
         
        /* button  #btn-capturar-gps */
    $(document).on("click", "#btn-capturar-gps", function(evt)
    {                             
        var fnCapturar = function(position) 
        {                                    
            var coords = position.coords;                        
                                                            
            var map = new google.maps.Map(
                document.getElementById("map"),
                {
                    center: new google.maps.LatLng(coords.latitude, coords.longitude),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
            );                    
            
            var marker = new google.maps.Maker(
                {
                    title: "VOCE ESTA AQUI: " +coords.latitude+ ", " +coords.longitude,
                    position: new google.maps.LatLng(coords.latitude, coords.longitude)
                }
            );
               
        marker.setMap(map);
        };                  
        
        var fnFalhar = function(error)
        {
            navigator.notification.alert("Erro ao capturar posiçao: "+error.message, "INFORMAÇÃO");            

        };
     
        var opcoes = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };             
        
        navigator.geolocation.getCurrentPosition(fnCapturar, fnFalhar, opcoes);
    });
       
        /* button  #btn-gps */
    $(document).on("click", "#btn-gps", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_4"); 
    });
    
        /* button  #btn-sms */
    $(document).on("click", "#btn-sms", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_5"); 
    });
    
        /* button  #btn-contato */
    $(document).on("click", "#btn-contato", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_2");                 
    });
    
        /* button  #btn-foto */
    $(document).on("click", "#btn-foto", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_3"); 
    });
    
        /* button  #btn-take-picture */
    $(document).on("click", "#btn-take-picture", function(evt)
    {
        var fnCapturar = function(imageSrc){
            var item = '<li><img src="data:image/jpeg;base64,'+imageSrc+'" style="width:100%!important"/></li>';
            $("#listFiles").append(item);
        };
        
        var fnFalhar = function(error){
            navigator.notification.alert("Erro ao capturar: " + error, null, "INFORMAÇÃO");
        };
        
        var opcoes = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL
        };                                 
        
        navigator.camera.getPicture(fnCapturar, fnFalhar, opcoes);
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
