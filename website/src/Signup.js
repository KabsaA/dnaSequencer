import Header from './components/Header';


function Signup() {
    return (
        <><Header />

        
        <div class="form-container">
        <center><h3>DNSAR Sign Up</h3></center>

            <form method="post" action="signupData" class="register-form">

                <input id="firstName" class="form-field" type="text" placeholder="First Name" name="firstName" />

                <input id="lastName" class="form-field" type="text" placeholder="Last Name" name="lastName" />

                <input id="email" class="form-field" type="text" placeholder="Email" name="email" />
                
                <input id="password" class="form-field" type="text" placeholder="Password" name="Password" />

                <input id="password_1" class="form-field" type="text" placeholder="Confirm Password" name="Password" />

                <button class="form-field" type="submit" onClick= {() => {
                    var firstname = document.getElementById("firstName").value.toLowerCase();
                    var lastname = document.getElementById("lastName").value.toLowerCase();
                    var email = document.getElementById("email").value;
                    var password = document.getElementById("password").value;

                    var sequence = JSON.stringify({firstname: firstname,
                    lastname: lastname, email: email, password: password});

                    fetch(`http://localhost:8000/signupData`, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: sequence})
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json.message);
                    })
                    .catch((error) => {
                        console.error('error: ', error);
                    });
                }}> Create Account</button>
            </form>
        </div></>
    );
}



export default Signup;

