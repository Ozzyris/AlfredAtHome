$( document ).ready(function() {

var hours = new Date().getHours();

//Title
	if(hours < 5){document.title=('Still Awake ?');} //Entre minuit et 5h 
	else if(hours < 10){document.title=('Good Morning ☼');} // Entre 5h et 10h
	else if(hours < 12){document.title=('Food is comming soon 🎂');} // Entre 10h et midi
	else if(hours < 16){document.title=('Good Afternoon ♥');} // Entre midi et 4h
	else if(hours < 18){document.title=('Tea Time');} //Ent 4h et 6h
	else if(hours < 20){document.title=('Good Evening ♥');} //Entre 6h et 8h
	else if(hours < 24){document.title=('Time to go to sleep ☺');} //Entre 8h et midi

function organizationDay(){
	switch (new Date().getDay()) {
    case 0:
        $( ".FoodStormDay:eq(0), .FoodStormDay:eq(1), .FoodStormDay:eq(2), .FoodStormDay:eq(3), .FoodStormDay:eq(4), .FoodStormDay:eq(5)" ).addClass('disabled');
        $('#HeureofDay').css('left', '916px');
        break;
    case 1:
    	$('#HeureofDay').css('left', '46px');
        break;
    case 2:
        $( ".FoodStormDay:eq(0)" ).addClass('disabled');
        $('#HeureofDay').css('left', '191px');
        break;
    case 3:
        $( ".FoodStormDay:eq(0), .FoodStormDay:eq(1)" ).addClass('disabled');
        $('#HeureofDay').css('left', '336px');
        break;
    case 4:
        $( ".FoodStormDay:eq(0), .FoodStormDay:eq(1), .FoodStormDay:eq(2)" ).addClass('disabled');
        $('#HeureofDay').css('left', '481px');
        break;
    case 5:
        $( ".FoodStormDay:eq(0), .FoodStormDay:eq(1), .FoodStormDay:eq(2), .FoodStormDay:eq(3)" ).addClass('disabled');
        $('#HeureofDay').css('left', '626px');
        break;
    case 6:
        $( ".FoodStormDay:eq(0), .FoodStormDay:eq(1), .FoodStormDay:eq(2), .FoodStormDay:eq(3), .FoodStormDay:eq(4)" ).addClass('disabled');
        $('#HeureofDay').css('left', '771px');
        break;
	} 
	var HeureTop = (hours * 16.6) + 112;
	$('#HeureofDay').css('top', HeureTop);
}
organizationDay();




var inputAddMeal = false;
$('#inputMeal').hide();


$('.addMeal').click(function(){
  if(!inputAddMeal){
    $('#inputMeal').show();
    inputAddMeal = true;
  }else{
    $('#inputMeal').hide();
    inputAddMeal = false;
  }
});



var myDataRef = new Firebase('https://alfredbutler.firebaseIO.com/foodstorm');

      $('#inputMeal').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#inputMeal').val();
          myDataRef.push({name: name});
          $('#inputMessage').val('');
        }
      });

      
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name);
      });

      function displayChatMessage(name) {
        $(' <span class="label">' + name + '</span>').appendTo($('#MealDisponible'));

      }

});