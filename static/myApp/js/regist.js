$(document).ready(function () {
    var account = document.getElementById("usernamesignup");  // 用户名
    var accunterr = document.getElementById("accunterr");
    var checkerr = document.getElementById("checkerr");

    var passwd = document.getElementById("passwordsignup");  // 密码
    var passerr = document.getElementById("passerr");

    var passwd_confirm = document.getElementById("passwordsignup_confirm");  // 第二次输入密码
    var passwderr = document.getElementById("passwderr");

    var button = document.getElementById("regist_button");

    //给用户输入的用户名添加聚焦以及离焦事件
    account.addEventListener("focus",function () {  //  聚焦事件
        accunterr.style.display = "none";
        checkerr.style.display = "none";
    },false);

    account.addEventListener("blur",function () {  //  离焦，并做一些验证，验证用户名是否已经被注册过
        // 判断长度
        instr = this.value;
        if (instr.length < 4 || instr.length > 12){
            accunterr.style.display = "block";
            return 0
        }
        // 判断是否已经被注册过，需要通过发起ajax请求来判断，如下：
        $.post("/checkuserid/",{"userid":instr},function (data) {
            // 如果返回error,表示该用户名已经被注册
            if(data.status == 'error'){
                checkerr.style.display = "block";
                return 0
            }
        });
    },false);


    // 给用户输入的密码添加聚焦，离焦事件
    passwd.addEventListener("focus",function () {
        passerr.style.display = "none";
    },false);
    passwd.addEventListener("blur",function () {
        instr1 = this.value;
        if (instr1.length < 6 || instr1.length > 16) {
            passerr.style.display = "block";
            return 0
        }
    },false);


    // 给用户第二次输入的密码添加聚焦，离焦事件
    passwd_confirm.addEventListener("focus",function () {
        passwderr.style.display = "none"
    },false);
    passwd_confirm.addEventListener("blur",function () {
        instr2 = this.value;
        if (instr2 != passwd.value){
            passwderr.style.display = "block";
            return 0
        }
        button.removeAttribute("disabled");  // 只需要在最后一次解除禁用按钮即可
    },false);
});









