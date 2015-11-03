//Creation des BDD
var BDDSerie = new Firebase('https://alfredbutler.firebaseIO.com/serieDigest');
var BDDEpisode = new Firebase('https://alfredbutler.firebaseIO.com/EpForserieDigest');


(function ($) {
  //Variable GLobal
  var numberEP = 1,
      Episode = [];


/*

AFFICHAGE DU CONTENU

*/


  //Recherche et affichage des éléments innactif
  BDDSerie.orderByChild('status').on('child_added', function(snapshot) {
    var message = snapshot.val();

    if(message.status == "finit"){
      displayChatMessage(message.id, message.name, message.saison, message.status, message.img, message.lien, false);
    }else if(message.status == "encours"){
      displayChatMessage(message.id, message.name, message.saison, message.status, message.img, message.lien, true);
      createtable(message.id, message.name, message.saison, message.status, message.img, message.lien);
      
    }
    
  });

  //Création et affichage des éléments actif et de leur tableau
  function createtable(id, name, saison, status, img, lien){
      var stringdatatableau;
      var datatableau = '';

        BDDEpisode.orderByChild('id').startAt(id).endAt(id).once('child_added', function(snapshot) {
              var episodedisplay = snapshot.val();

              episodedisplay.episode.forEach(function(childSnapshot) {
                var time = timestamptodate(childSnapshot.date);
                var duration = timestamptonbjour(childSnapshot.date);

                if(childSnapshot.etat == "vu"){
                  datatableau = datatableau + '<tr class=""><td>' + childSnapshot.nombre + '</td><td>' + childSnapshot.Name + '</td><td onmouseover="this.innerHTML = \'' + duration + ' Jours\'" onmouseleave="this.innerHTML = \'' + time + '\'">' + time + '</td><td><button onclick="vu();" class="buttonVu active"></button></td></tr>';
                }else{
                  datatableau = datatableau +'<tr class="new"><td>' + childSnapshot.nombre + '</td><td>' + childSnapshot.Name + '</td><td onmouseover="this.innerHTML = \'' + duration + ' Jours\'" onmouseleave="this.innerHTML = \'' + time + '\'">' + time + '</td><td><button onclick="vu();" class="buttonVu"></button></td></tr>';
                }
              });

              stringdatatableau = '<table><tbody>' + datatableau + '</tbody></table>';
              $('#tableau_' + id).after(stringdatatableau);
        });        
    }

  //Affichage du contenu dans le html
  function displayChatMessage(id, name, saison, status, img, lien, table) {
    if(table){
      $('<div class="item ' + status + '" ><a href="' + lien + '" target="_blank" ><img class="cover" src="../img/series/' + img + '"></a><a class="modificationButton" onclick="modificationSerie(' + id + ');"><img class="cogbutton" src="../img/cog.svg" /></a><h3>' + name + ' - Saison ' + saison + '</h3><span id="tableau_' + id + '"></span></div>').appendTo($('#SeriesContaineurs'));
    }else{
      $('<div class="item ' + status + '" ><a href="' + lien + '" target="_blank" ><img class="cover" src="../img/series/' + img + '"></a><a class="modificationButton" onclick="modificationSerie(' + id + ');"><img class="cogbutton" src="../img/cog.svg" /></a><h3>' + name + ' - Saison ' + saison + '</h3><h4 class="timer_tempsrestant"></h4></div>').appendTo($('#SeriesContaineurs'));
    }
  }


  /*

  PRODUCTION DU CONTENU

  */


  //Lancement du modal au clic du bouton ajouté
  $('.addBtn').click(function(){
    $( "#btnaddserie" ).data( "role", "new" );
    $('#AddSerieModal').modal('show');
  });

  //Création de l'array pour l'ajout des épisodes
  $('#buttonNext').click(function(){
    var episode_Date = datetotimestamp($('#addDateEpisode').val());

    if(episode_Date === false){
      alert('Wrong');
    }else{
      var EpisodeData = {Name:$('#addNomEpisode').val(), date: (episode_Date-1), nombre:numberEP, etat:'pasvu'};
      Episode.push(EpisodeData);
      numberEP = numberEP + 1;
      $('#addNomEpisode').val('');
      $('#addDateEpisode').val('');
      $('.formaddepisode h2').text('Episode ' + numberEP);
    }
  });

  //Envois du formulaire au server
  $('#btnaddserie').click(function(){
      var name = $('#addserieNom').val();
      var saison = $('#addserieSaison').val();
      var status = $('#addserieStatus').val();
      var img = $('#addserieImage').val();
      var lien = $('#addserieLien').val();

      if($( "#btnaddserie" ).data( "role" ) == "new"){
        var id = new Date().getTime();

        BDDSerie.push({id: id, name: name, saison: saison, status: status, img: img, lien: lien});
        BDDEpisode.push({id: id, saison: saison, episode: Episode});
      }else if($( "#btnaddserie" ).data( "role" ) == "edit"){
        var id = $('#addserieId').val();

        var BDDUpdateEpisode = new Firebase('https://alfredbutler.firebaseIO.com/EpForserieDigest/' + $('#addepisodeKey').val());
        BDDUpdateEpisode.update({saison: saison, episode: Episode});

        var BddUpdateSerie = new Firebase('https://alfredbutler.firebaseIO.com/serieDigest/' + $('#addserieKey').val());
        BddUpdateSerie.update({name: name, saison: saison, status: status, img: img, lien: lien});
        }
      $('#AddSerieModal').modal('hide');

      $('#addserieKey').val('');
      $('#addserieId').val('');
      $('#addserieNom').val('');
      $('#addserieSaison').val('');
      $('#addserieImage').val('');
      $('#addserieLien').val('');
      $('#addserieStatus').val('');
  });

})(jQuery);

  //Remplissage des champs du modal pour la modification
  function modificationSerie(id){
    $( document ).ready(function() {
      BDDSerie.orderByChild('id').startAt(id).endAt(id).once('child_added', function(snapshot) {
        $( "#btnaddserie" ).data( "role", "edit" );

        $('#addserieId').val(snapshot.val().id);
        $('#addserieNom').val(snapshot.val().name);
        $('#addserieSaison').val(snapshot.val().saison);
        $('#addserieImage').val(snapshot.val().img);
        $('#addserieLien').val(snapshot.val().lien);
        $('#addserieStatus').val(snapshot.val().status);
        $('#addserieKey').val(snapshot.ref().key());
        $('#AddSerieModal').modal('show');
      });

      BDDEpisode.orderByChild('id').startAt(id).endAt(id).once('child_added', function(snapshot) {
        $('#addepisodeKey').val(snapshot.ref().key());
      });
    });
  }


/*

FONCTION TIERS

*/

//VUS/PASVUS
function vu(){

}


//Gestion des timestamps
function timestamptodate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var year = a.getFullYear();
  var month;
  if(a.getMonth()+1 < 10){
     month = '0' + (a.getMonth()+1)
  }else{
    month = a.getMonth()+1
  };
  var date;
  if(a.getDate()+1 < 10){
     date = '0' + (a.getDate()+1)
  }else{
    date = a.getDate()+1
  }
  var time = date + '/' + month + '/' + year;
  return time;
}

function timestamptonbjour(UNIX_timestamp){
  var timestampactuel = new Date().getTime();
  var diff = Math.floor(((((UNIX_timestamp/1000) - ((new Date().getTime()/1000)-1)) / (60*60*24))-1));
  if(diff < 0){
    return diff +3;
  }else if(diff >= 0){
    return diff +3;
  }
}

function datetotimestamp(date){
    var day_Task_date = date.slice(0,2); 
    var month_Task_date = date.slice(3,5); 
    var year_Task_date = date.slice(6,10);
    var Complet_date = month_Task_date + '/' + day_Task_date + '/' + year_Task_date;

    if(day_Task_date >= 1 && day_Task_date <= 31 && month_Task_date >= 01 && month_Task_date <= 12){
        return new Date(Complet_date).getTime();
    }else{
      return false;
    }
}


 
