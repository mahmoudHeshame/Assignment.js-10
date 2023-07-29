


var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')





var loginUp = location.pathname.split('/');
var loginUrl = ''
for (var i = 0; i < loginUp.length; i++) {
    loginUrl += '/' + loginUp[i]
}
console.log(loginUrl);


var username = localStorage.getItem('loginUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}



var loginArray = []
if (localStorage.getItem('user') == null) {
    loginArray = []
} else {
    loginArray = JSON.parse(localStorage.getItem('user'))
}

function Empty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

function EmailExist() {
    for (var i = 0; i < loginArray.length; i++) {
        if (loginArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}


function signUp() {
    if ( Empty() == false) {
        document.getElementById('exit').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
   
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (loginArray.length == 0) {
        loginArray.push(signUp)
        localStorage.setItem('user', JSON.stringify(loginArray))
        document.getElementById('exit').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (EmailExist() == false) {
        document.getElementById('exit').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        loginArray.push(signUp)
        localStorage.setItem('user', JSON.stringify(loginArray))
        document.getElementById('exit').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}

function LoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (LoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < loginArray.length; i++) {
        if (loginArray[i].email.toLowerCase() == email.toLowerCase() && loginArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('loginUsername', loginArray[i].name)
            if (loginUrl == '/') {
                location.replace('https://' + location.hostname +'' )

            } else {
                location.replace(loginUrl +'' )

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

function logout() {
    localStorage.removeItem('loginUsername')
}