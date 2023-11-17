let users=[];

function RegisterUser(event){
    event.preventDefault();

    const fname= document.getElementById("firstName").value;
    const lname= document.getElementById("lastName").value;
    const gender=document.getElementById("Gender").value;
    const email= document.getElementById("mailid").value;
    const usrname= document.getElementById("username").value;
    const passwd= document.getElementById("password").value;
    const role =document.getElementById("roles").value;

    const newUser={
        firstName: fname,
        lastName: lname,
        Gender: gender,
        Email: email,
        Username: usrname,
        Password: passwd,
        Role: role
    };
    let oldUsers = sessionStorage.getItem('A');
    // console.log("one", oldUsers);

    let oldU = oldUsers ? JSON.parse(oldUsers) : [];
    // console.log(oldU);
    
    const existingUser = oldU.find(user => user.Email === email && user.Username === usrname);
    if (existingUser) {
        alert("User already exists");
        return;
    }

    oldU.push(newUser);
    alert("You are registered successfully");

    // console.log(users);
    const sendStr= JSON.stringify(oldU);
    sessionStorage.setItem('A',sendStr);
    window.location.href="index.html";
}


let validateUser;



function LoginUsers(event){
    event.preventDefault();

    const getStr = sessionStorage.getItem('A');
    const users2 = JSON.parse(getStr);
    // console.log(users2);

    const lusername= document.getElementById("Ausername").value;
    const lpassword= document.getElementById("Apassword").value;

    // console.log(lusername);
    
    validateUser = users2.find(user => user.Username === lusername && user.Password === lpassword);
    console.log(users2.Username);
    console.log(users2.Password);
    console.log(validateUser);

    if(validateUser){
        alert("Hurray! You are logged in. Welcome");

        sessionStorage.setItem('loginCheck', true)
        // const sendArr= JSON.stringify(users2);
        // sessionStorage.setItem('A',sendArr);
        window.location.href="welcome.html";
    }
    else{
        alert("Invalid details or Not a Registered User");
        sessionStorage.setItem('loginCheck', false)
    }
}



function displayUsers(){
    // const loginCheck = sessionStorage.getItem('loginCheck');
    // console.log('Is logged in:', loginCheck);
    const getArr = sessionStorage.getItem('A');
    let users3 = JSON.parse(getArr);
    console.log(users3[0].Role);
    

    if(users3[0].Role === "admin"){
    // console.log("Hello:");
    const userItems= document.getElementById("users");
    userItems.innerHTML="";
    // console.log("Hello:");
    users3.forEach(usr => {
        const items=document.createElement("li");
        items.textContent= `first_name: ${usr.firstName}, last_name: ${usr.lastName}, Gender: ${usr.Gender}, Email: ${usr.Email}, Username: ${usr.Username}, Role: ${usr.Role}`;
        userItems.appendChild(items);
    });
    } 
  else if(users3[0].Role === "operations"){
    const userItems= document.getElementById("users");
    userItems.innerHTML="";
    users3.forEach(usr => {
        if(usr.Role ==="operations"){
        const items=document.createElement("li");
        items.textContent= `first_name: ${usr.firstName}, last_name: ${usr.lastName}, Gender: ${usr.Gender}, Email: ${usr.Email}, Username: ${usr.Username}, Role: ${usr.Role}`;
        userItems.appendChild(items);}
    });
    }
    else{
        const userItems= document.getElementById("users");
        // console.log("User Items:", userItems);
        userItems.innerHTML="";
        // console.log("users3:", users3);
        users3.forEach(usr => {
            if(usr.Role==="sales"){
            const items=document.createElement("li");
            items.textContent= `first_name: ${usr.firstName}, last_name: ${usr.lastName}, Gender: ${usr.Gender}, Email: ${usr.Email}, Username: ${usr.Username}, Role: ${usr.Role}`;
            userItems.appendChild(items);}
        });
    }
 } 