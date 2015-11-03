$( document ).ready(function() {

var hours = new Date().getHours();

// Css Switch
/*if(hours > 5 && hours < 18){
	$("link.Stylesheetapp").attr("href", 'css/appJour.css')
}else{
	$("link.Stylesheetapp").attr("href", 'css/appNuit.css')
}*/
//Title
	if(hours < 5){document.title=('Still Awake ?');} //Entre minuit et 5h 
	else if(hours < 10){document.title=('Good Morning ☼');} // Entre 5h et 10h
	else if(hours < 12){document.title=('Food is comming soon 🎂');} // Entre 10h et midi
	else if(hours < 16){document.title=('Good Afternoon ♥');} // Entre midi et 4h
	else if(hours < 18){document.title=('Tea Time');} //Ent 4h et 6h
	else if(hours < 20){document.title=('Good Evening ♥');} //Entre 6h et 8h
	else if(hours < 24){document.title=('Time to go to sleep ☺');} //Entre 8h et midi

});