$(document).ready(function () {
   username = document.getElementById("username");
   password = document.getElementById("password");

   invalid_account = document.getElementById("invalid_account");
   invalid_passwd = document.getElementById("invalid_passwd");

   var get_passwd = 0;

   login_button = document.getElementById("login_button");


   username.addEventListener("focus", function () {
      invalid_passwd.style.display = "none";
      invalid_account.style.display = "none";
   },false);
   username.addEventListener("blur", function () {
      user = this.value;
      $.post("/check_username/", {"username": user}, function (data) {
         if (data.status == "success") {
            get_passwd = data.passwd;
         } else {
            invalid_account.style.display = "block";
         }
      })
   },false);

   password.addEventListener("focus",function () {
      invalid_passwd.style.display = "none";
      invalid_account.style.display = "none";
   },false);
   password.addEventListener("blur",function(){
      passwd = this.value;
      if (passwd != get_passwd){
         invalid_passwd.style.display = "block";
         login_button.disabled = "disabled";
         return 0
      }
      // 解除禁用标签
   login_button.removeAttribute("disabled");
   },false);

});












