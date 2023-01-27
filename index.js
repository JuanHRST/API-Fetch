console.log("API-Fetch");

const solicitar = (url = "https://reqres.in/api/users?delay=3") => {  //Imprime los datos de la URL
    let fechaCaducidad = localStorage.getItem("fechaCaducidad");
    if (Object.is(null, fechaCaducidad) || new Date().getTime() > fechaCaducidad) {
        console.log("Fetch");
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                localStorage.setItem("users", JSON.stringify(users.data));
                localStorage.setItem("fechaCaducidad", (new Date().getTime()) + 60_000);
                insertUsers(users.data);
            })
            .catch((error) => console.log(error));
    } else {
        insertUsers(JSON.parse(localStorage.getItem("users")));
        console.log("Datos locales");
    }
};

//Mostrar usuarios
function insertUsers(users) {
    let container = document.querySelector(".tbody");   
    container.innerHTML = "";
    localStorage.setItem("users", JSON.stringify(users));
    //console.log(users);
    for (let user of users) {
        const dom = document.createElement("tr");
        dom.classList.add("table-group-divider");
        dom.innerHTML = `
            <td><img src="${user.avatar}" alt="profile picture" class="rounded-circle"></td>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            `
        container.appendChild(dom);
    }
}



