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

    let oldU = oldUsers ? JSON.parse(oldUsers) : [];
    
    const existingUser = oldU.find(user => user.Email === email && user.Username === usrname);
    if (existingUser) {
        alert("User already exists");
        return;
    }

    oldU.push(newUser);
    alert("You are registered successfully");

    const sendStr= JSON.stringify(oldU);
    sessionStorage.setItem('A',sendStr);
    window.location.href="index.html";
}


let validateUser;

function LoginUsers(event){
    event.preventDefault();

    const getStr = sessionStorage.getItem('A');
    const users2 = JSON.parse(getStr);

    const lusername= document.getElementById("Ausername").value;
    const lpassword= document.getElementById("Apassword").value;

    validateUser = users2.find(user => user.Username === lusername && user.Password === lpassword);
    
    if(validateUser){
        alert("Hurray! You are logged in. Welcome");

        sessionStorage.setItem('loginCheck', true)
        sessionStorage.setItem('userRole', validateUser.Role); 
        window.location.href="welcome.html";
    }
    else{
        alert("Invalid credentials or Not a Registered User");
        sessionStorage.setItem('loginCheck', false)
    }
}



function displayUsers(){
  
    const currentUserRole = sessionStorage.getItem('userRole');
    const getArr = sessionStorage.getItem('A');
    let users3 = JSON.parse(getArr);
    
    // console.log(currentUserRole);
    

    if(currentUserRole === "admin"){
    const userItems= document.getElementById("users");
    userItems.innerHTML="";
    users3.forEach(usr => {
        const items=document.createElement("li");
        items.textContent= `first_name: ${usr.firstName}, last_name: ${usr.lastName}, Gender: ${usr.Gender}, Email: ${usr.Email}, Username: ${usr.Username}, Role: ${usr.Role}`;
        userItems.appendChild(items);
    });
    } 
  else if(currentUserRole === "operations"){
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
        userItems.innerHTML="";
        users3.forEach(usr => {
            if(usr.Role==="sales"){
            const items=document.createElement("li");
            items.textContent= `first_name: ${usr.firstName}, last_name: ${usr.lastName}, Gender: ${usr.Gender}, Email: ${usr.Email}, Username: ${usr.Username}, Role: ${usr.Role}`;
            userItems.appendChild(items);}
        });
    }
 } 
