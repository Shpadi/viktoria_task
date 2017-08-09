 var global_count=0;
  $('.no__data').css('display','none'); //не хотел создавать для єтого сss файл (лень ) так что простите пожалуйста за такое (((
  //доступ к апи должен быть прописан на сервере , так что выкручивался как мог
  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    
    x.send(options.data);
  }
  (function() {
    document.getElementById('send').onclick = function(e) {
    var urlField ='http://universities.hipolabs.com/search?country='+$('#country').val();
    console.log(urlField);
      e.preventDefault();
      doCORSRequest({
        method: this.id === 'post' ? 'POST' : 'GET',
        url: urlField,
      }, function printResult(result) {
          var final= result.split('\n');
          var uniArray=JSON.parse(final[3]);
          console.log(uniArray);
          if (uniArray.length!=0)
             $('.no__data').css('display','none');
          else
             $('.no__data').css('display','inline-block');
          for (var i=0; i<uniArray.length; i++)
          {
              global_count++;
              $('.table table').append('<tr class="new__tr"><td>'+global_count+'</td><td>'+uniArray[i].alpha_two_code+'</td><td>'+uniArray[i].country+'</td><td>'+uniArray[i].domain+'</td><td>'+uniArray[i]. name+'</td><td><a href="'+uniArray[i].web_page+'">'+uniArray[i].web_page+'</a></td></tr>')
          }
      });
    };
  })();
  
  $('#delete').click(function(){
      $('.new__tr').remove();
      $('#country').val('');
      global_count=0;
  });
