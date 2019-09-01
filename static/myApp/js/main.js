$(document).ready(function () {
   username = document.getElementById("username");
   login = document.getElementById("login");
   quit = document.getElementById("quit");

   user =  username.innerText.split(' ')[0];

   if (user == '游客'){
       login.style.display = 'block';
       quit.style.display = 'none';
   }
   else {
       login.style.display = 'none';
       quit.style.display = 'block';
   }
});














