/* ----------------------------------- MIDDLEWARE ----------------------------------- */
const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/setCookie', (req, res) => {
    res.cookie('username', 'Maddie', {maxAge: 5000});
    res.send('A Cookie with your name has been set! YAY!');
});

app.get('/useCookie', (req, res) => {
    let username = req.cookies.username;
    res.send(`Welcome to the Use Cookie page, ${username} !`);
});

/* ----------------------------------- USER DATA ----------------------------------- */
let filename = __dirname + '/user_data.json';

let user_reg_data = {};

if (fs.existsSync(filename)){
    let data = fs.readFileSync(filename, 'utf-8');

    user_reg_data = JSON.parse(data);

    let user_data_stats = fs.statSync(filename);

    let stats_size = user_data_stats.size;

    console.log(`The file name ${filename} has ${stats_size} characters`);

} else {
    console.log(`The file name ${filename} does not exist.`);
}

// Part 4 of Lab14
let username = 'newuser';
user_reg_data[username] = {};
user_reg_data[username].password = 'newpass';
user_reg_data[username].email = 'newuser@user.com';

fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');


/* ----------------------------------- LOGIN FORM ----------------------------------- */
app.get("/login", function (request, response) {

    // Give a simple login form
    str = `
        <script>
            let params = (new URL(document.location)).searchParams;
            window.onload = function() {
                if (params.has('error')) {
                    login_form['username'].value = params.get('username');
                    document.getElementById("errMsg").innerHTML = params.get("error");
                }
            }
        </script>

        <body>
        <div id="errMsg"></div>
        <form action="" method="POST" name="login_form">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

// Process login form POST and redirect to logged in page if ok, back to login page if not
app.post("/login", function (request, response) {

    // Retrieve the user's entered information
    let username_entered = request.body['username'];
    let password_entered = request.body['password'];

    let response_msg = "";
    let errors = false;

    let params = new URLSearchParams(request.body);

    // Check if the username exists in user_reg_data
    if (typeof user_reg_data[username_entered] != 'undefined') {

        if (password_entered == user_reg_data[username_entered].password) {
            response_msg = `${username_entered} is logged in.`;
        } else {
            response_msg = `Incorrect password.`;
            errors = true;
        }
    } else {
        response_msg = `${username_entered} does not exist.`;
        errors = true;
    }

    if (!errors) {
        response.send(response_msg);
    } else {
        response.redirect(`./login?error=${response_msg}&${params.toString()}`)
    }

});

/* --------------------------------- REGISTRATION FORM --------------------------------- */
// Extra credit
app.get("/register", function (request, response) {

    // Give a simple register form
    str = `
        <script>
            let params = (new URL(document.location)).searchParams;
            window.onload = function() {
                if (params.has('error)) {
                    reg_form['username'].value = params.get('username');
                    reg_form['email'].value = params.get('email');
                    reg_form['name'].value = params.get('name');
                }
            }
        </script>

        <body>

        <form action="" method="POST" name="reg_form">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
        <input type="email" name="email" size="40" placeholder="enter email"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

 app.post("/register", function (request, response) {
    // Process a simple register form
    let new_user = request.body.username;
    let errors = false;
    let resp_msg = "";

    let params = new URLSearchParams(request.body);

    if (typeof user_reg_data[new_user] != 'undefined') {
        resp_msg = 'Username unavailable. Please enter a different username.';
        errors = true;
    } 

    else if (request.body.password == request.body.repeat_password) {
        user_reg_data[new_user] = {};
        user_reg_data[new_user].name = request.body.name;
        user_reg_data[new_user].password = request.body.password;
        user_reg_data[new_user].email = request.body.email;

        fs.writeFileSync(filename, JSON.stringify(user_reg_data), 'utf-8');
        response.redirect(`./login`);
    } else {
        resp_msg = 'Repeat password does not match with password.'
        errors = true;
    }

    if (errors) {
        response.redirect(`./register?error=${resp_msg}&${params.toString()}`);
        // response.send(resp_msg);
        // response.redirect(`./register?error=${resp_msg}&${params.toString()}`);
    }   
 });

 /* ----------------------------------- PORT 8080 ----------------------------------- */
 app.listen(8080, () => console.log(`listening on port 8080`));