let nuevo = document.getElementById("nuevo")
let modificar = document.getElementById("modificar")
let borrar = document.getElementById("borrar")
let datos = document.getElementById("datos")
let url = "http://localhost:8082/api/Farm/all"

inicial()
traerdatos()
traecategorias()

function inicial() {
  nuevo.style.display = "none"
  modificar.style.display = "none"
  borrar.style.display = "none"
  datos.style.display = "block"
}

function agregar() {
  document.getElementById("address").value = "";
  document.getElementById("extension").value = "";
  document.getElementById("categoryId").value = "";
  document.getElementById("name").value = "";
  
  nuevo.style.display = "block"
  modificar.style.display = "none"
  borrar.style.display = "none"
  datos.style.display = "none"
  document.getElementById("name").focus() 
}

function editar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://localhost:8082/api/Farm";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);

      let idModif = respuesta.id;
      let nameModif = respuesta.name;
      let categoryIdModif = respuesta.category.id;
      let extensionModif = respuesta.extension;
      let addressModif = respuesta.address;
      let descriptionModif = respuesta.description;
      
      document.getElementById("idModif").value = idModif;
      document.getElementById("nameModif").value = nameModif;
      document.getElementById("categoryIdModif").value = categoryIdModif;
      document.getElementById("extensionModif").value = extensionModif;
      document.getElementById("addressModif").value = addressModif;
      document.getElementById("descriptionModif").value = descriptionModif;
      
      //modificamos el titulo para que muestre el valor del codigo de la finca
      document.getElementById("idLabel").innerHTML =
        "<strong>Id :</strong>" + idModif;

      nuevo.style.display = "none";
      modificar.style.display = "block";
      borrar.style.display = "none";
      datos.style.display = "none";
      document.getElementById("nameModif").focus()
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();
}

function eliminar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  let url = "http://localhost:8082/api/Farm";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);

      let idModif = respuesta.id;
      let nameModif = respuesta.name;
      let categoryIdModif = respuesta.category.name;
      let extensionModif = respuesta.extension;
      let addressModif = respuesta.address;
      let descriptionModif = respuesta.description;

      document.getElementById("idDelete").value = idModif;
      document.getElementById("idList").innerHTML =
        "<strong>Id :</strong>" + idModif;
      document.getElementById("nameList").innerHTML =
        "<strong>Name :</strong>" + nameModif;
      document.getElementById("categoryList").innerHTML =
        "<strong>Categoría :</strong>" + categoryIdModif;
      document.getElementById("extensionList").innerHTML =
        "<strong>Extension :</strong>" + extensionModif;
      document.getElementById("addressList").innerHTML =
        "<strong>Dirección :</strong>" + addressModif;
      document.getElementById("descriptionList").innerHTML =
        "<strong>Descripción :</strong>" + descriptionModif;

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
  let addressFarm = document.getElementById("address").value;
  let exensionFarm = document.getElementById("extension").value;
  let categoryIdFarm = document.getElementById("categoryId").value;
  let nameFarm = document.getElementById("name").value;
  let descriptionFarm = document.getElementById("description").value;

  //creo un objeto javascript
  let objeto = {
    address: addressFarm,
    extension: exensionFarm,
    category: {id: parseInt(categoryIdFarm) },
    name: nameFarm,
    description: descriptionFarm
  };

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto);

  url = "http://localhost:8082/api/Farm/save";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      //Configura el aspecto de la pagina
      traerdatos();
      inicial();
    }
  };

  peticion.open("POST", url, true);
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  peticion.send(objetoJson);
}

function guardarEditar() {
  //recuperar la informacion ingresada en el formulario
  let idFarm = document.getElementById("idModif").value;
  let addressFarm = document.getElementById("addressModif").value;
  let extensionFarm = document.getElementById("extensionModif").value;
  let categoryIdFarm = document.getElementById("categoryIdModif").value;
  let nameFarm = document.getElementById("nameModif").value;
  let descriptionModif = document.getElementById("descriptionModif").value;

  //creo un objeto javascript
  let objeto = {
    id: idFarm,
    address: addressFarm,
    extension: extensionFarm,
    category_id: categoryIdFarm,
    name: nameFarm,
    description: descriptionModif
  };

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto);

  url = "http://localhost:8082/api/Farm/update";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      //Configura el aspecto de la pagina
      traerdatos();
      inicial();
    }
  };

  peticion.open("PUT", url, true);
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  peticion.send(objetoJson);
}

function guardarBorrar() {
  //recuperar la informacion ingresada en el formulario
  let idDelete = document.getElementById("idDelete").value;

  //creo un objeto javascript
  /*
  let objeto = {
    id: idDelete,
  };
  */
  //convierto el objeto de javascript a formato json
  //let objetoJson = JSON.stringify(objeto);

  url = "http://localhost:8082/api/Farm/delete";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {
      //Configura el aspecto de la pagina
      traerdatos();
      inicial();
    }
  };

  peticion.open("DELETE", url + "/" + idDelete, true);
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  peticion.send(objetoJson);
}

function traerdatos() {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://localhost:8082/api/Farm/all";

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
          respuesta[i].address +
          "</td>\
                        <td>" +
          respuesta[i].extension +
          "</td>\
                        <td>" +
          respuesta[i].category.name +
          "</td>\
                        <td>" +
          respuesta[i].name +
          '</td>\
                        <td>\
                             <button class="btn btn-outline-dark" onclick="editar(' +
          id +
          ')" disabled>Modificar Finca</button>\
                            <button class="btn btn-outline-dark" onclick="eliminar(' +
          id +
          ')" disabled>Borrar Finca</button>\
                        </td>\
                        </tr>';
      }

      document.getElementById("registros").innerHTML = registros;
    }
  };

  peticion.open("GET", url, true);
  peticion.send();
}

function traecategorias(){
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://localhost:8082/api/Category/all";
  let id;
  let nombre;
  let respuesta;
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
      respuesta = JSON.parse(this.responseText)

      //crear html usando los datos de la respuesta que me da el servicio
      //variable 'respuesta'
      for (let i in respuesta) {
        id = respuesta[i].id;
        nombre = respuesta[i].name;
        registros += '<option value="' + id + '">' + nombre + "</option>"
      }

      document.getElementById("categoryId").innerHTML = registros
      document.getElementById("categoryIdModif").innerHTML = registros
    }
  };

  peticion.open("GET", url, true)
  peticion.send();  
}
