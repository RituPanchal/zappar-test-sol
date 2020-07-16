import $ from "jquery";
import '../Lib/fonts/fonts.css';
import 'bootstrap';
import '../scss/app.scss';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import Faker from "faker";

const empTable = document.getElementById("emp_table");

function employeeController(argument) {

    //Private Method
    let getUserData = async function(){
        try {
            return await new Promise(function (resolve) {
                addUser();

                return resolve(true);
            })    
        }       
        catch(ex){
            throw ex;
        }  
    } 

    //Public Method
    this.getData = async function(){
        try{
            return await new Promise(async (resolve) => {
                await getUserData();

                return resolve(true);
            });
        }
        catch(ex){
            console.log(message.ex);
            console.log(stack.ex);
        }
    }
}

//counts the no. of active users 
function rowCounter() {
    const tbodyRowCount = empTable.tBodies[0].rows.length-1;
    if (tbodyRowCount > 1) {
        $("#active_members").html(tbodyRowCount + " active members.");
    }
    else {
        $("#active_members").html(tbodyRowCount + " active member.");
    
    }
}

//adds a new user 
function addUser(){
    let fullName = Faker.name.findName();
    let emailAdd = Faker.internet.exampleEmail(fullName);

    let p = ['Owner', 'Admin', 'Standard'];
    let rP = Math.floor(Math.random() * p.length);
    let permission = p[rP];

    let currentRow = empTable.insertRow(-1);

    let profileImage = document.createElement("img");
    profileImage.setAttribute("src", Faker.image.avatar());
    profileImage.setAttribute("class", "user_image");


    let userName = document.createElement("span");
    userName.innerHTML = fullName;

    let emailAddress = document.createElement("div");
    emailAddress.innerHTML = emailAdd;

    let permissions = document.createElement("div");
    permissions.innerHTML = permission;

    let removeUser = document.createElement("i");
    removeUser.setAttribute("class", "fa fa-trash");

    let currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(profileImage);
    currentCell.appendChild(userName);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(emailAddress);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(permissions);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(removeUser);

    $('i[class="fa fa-trash"]').click(function (e) {
        $(this).closest('tr').remove();
        rowCounter();
    });

    rowCounter();
}

export function addUserEvent(){
    let employeeControllerObj = new employeeController();
    employeeControllerObj.getData()
    .then((resolve) => {

        if(resolve === true){

            console.log("Added Successfully!"); //for logging purpose only
        }
    })
}

function onLoadEvent() {
    for (let i = 1; i <= 5; i++){
        addUser();
    }
}

onLoadEvent();