$( document ).ready(function() {
    var myDataRef = new Firebase('https://alfredbutler.firebaseIO.com/chat');

      $('#inputMessage').keypress(function (e) {
        if (e.keyCode == 13) {
          var name ='Alex';
          var date = new Date().getTime();
          var text = $('#inputMessage').val();
          myDataRef.push({name: name, date: date, text: text});
          $('#inputMessage').val('');
        }
      });

      
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        var timedate = timeConverter(message.date);
        displayChatMessage(message.name, timedate, message.text);
      });

      function displayChatMessage(name, date, text) {
        $('<span class="messgageContent messsagede' + name + '"> <img class="img' + name + '" src="img/' + name +'.png" alt="' + name +'"> <span class="messageDate">' + date + '</span> <p class="messagetext">' + text + '</p></span>').appendTo($('#messageContentChat'));

      };


      function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = 'The ' + date + ' of ' + month + ' @ ' + hour + 'h' + min + '' ;
        return time;
    }
});


