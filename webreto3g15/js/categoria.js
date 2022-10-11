let url ="http://localhost:8082/api/Category/all";
let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let datos = document.getElementById("datos");

inicial()
traerdatos();

function inicial() {
  nuevo.style.display = "none";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "block";
}

function agregar() {

  document.getElementById("name").value=""
  document.getElementById("description").value=""
  
  nuevo.style.display = "block";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "none";

  document.getElementById("name").focus()
}

function editar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url ="localhost:8082/api/Category/";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idModif = respuesta.items[0].id
      let addressModif = respuesta.items[0].address
      let exensionModif = respuesta.items[0].exension
      let categoryIdModif = respuesta.items[0].category_id
      let nameModif = respuesta.items[0].name

      document.getElementById("idModif").value = idModif
      document.getElementById("addressModif").value = addressModif
      document.getElementById("exensionModif").value = exensionModif
      document.getElementById("categoryIdModif").value = categoryIdModif
      document.getElementById("nameModif").value = nameModif

      //modificamos el titulo para que muestre el valor del codigo de la finca
      document.getElementById("idLabel").innerHTML = "<strong>Farm id :</strong>" + idModif

      nuevo.style.display = "none";
      modificar.style.display = "block";
      borrar.style.display = "none";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();

}

function eliminar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "localhost:8082/api/Category/delete";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idModif = respuesta.items[0].id
      let addressModif = respuesta.items[0].address
      let exensionModif = respuesta.items[0].exension
      let categoryIdModif = respuesta.items[0].category_id
      let nameModif = respuesta.items[0].name

      
      document.getElementById("idDelete").value = idModif
      document.getElementById("idList").innerHTML = "<strong>Farm id :</strong>" + idModif
      document.getElementById("addressList").innerHTML = "<strong>Address :</strong>" + addressModif
      document.getElementById("exensionList").innerHTML = "<strong>Exension :</strong>" + exensionModif
      document.getElementById("category_idList").innerHTML = "<strong>Farm categoryId :</strong>" + categoryIdModif
      document.getElementById("nameList").innerHTML = "<strong>Farm Name :</strong>" + nameModif

      nuevo.style.display = "none";
      modificar.style.display = "none";
      borrar.style.display = "block";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();
}

function guardarNuevo() {

  //recuperar la informacion ingresada en el formulario
  
  let nameCategory = document.getElementById("name").value
  let descriptionCategory = document.getElementById("description").value
  

  //creo un objeto javascript
  let objeto = {
    name: nameCategory,
    description: descriptionCategory
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  url = "http://localhost:8082/api/Category/save";         

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("POST", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function guardarEditar() {

  //recuperar la informacion ingresada en el formulario
  let idFarm = document.getElementById("idModif").value
  let addressFarm = document.getElementById("addressModif").value
  let exensionFarm = document.getElementById("exensionModif").value
  let categoryIdFarm = document.getElementById("categoryIdModif").value
  let nameFarm = document.getElementById("nameModif").value

  //creo un objeto javascript
  let objeto = {
    id: idFarm,
    address: addressFarm,
    exension: exensionFarm,
    category_id: categoryIdFarm,
    name: nameFarm
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)
  url ="localhost:8082/api/Category/all";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("PUT", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function guardarBorrar() {
  //recuperar la informacion ingresada en el formulario
  let idFarm = document.getElementById("idDelete").value

  //creo un objeto javascript
  let objeto = {
    id: idFarm
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  let url = "localhost:8082/api/Category/all";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("DELETE", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function traerdatos() {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url ="http://localhost:8082/api/Category/all";
  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    //almacena el html para generar los registros de la tabla
    let registros = "";
    //valida si la peticion fue exitosa
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);
      console.log("Respuesta antes de convertir: " + this.responseText);
      console.log("Respuesta despues de convertir a JSON: " + respuesta);

      //crear html usando los datos de la respuesta que me da el servicio
      //variable 'respuesta'
      for (let i in respuesta) {
        let id = respuesta[i].id;
        registros +=
          '<tr>\
            <th scope="row">' +
                respuesta[i].id +
           "</th>\
            <td>" +
                respuesta[i].name +
            "</td>\
             <td>" +
                respuesta[i].description +
            "</td>" +            
            '<td>\
                <button class="btn btn-outline-dark" onclick="editar(' + id + ')">Modificar</button>\
                <button class="btn btn-outline-dark" onclick="eliminar(' + id + ')">Borrar</button>\
            </td>\
            </tr>';
      }

      document.getElementById("registros").innerHTML = registros;
    }
  };

  peticion.open("GET", url, true);
  peticion.send();
}
