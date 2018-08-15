# Documentación del curso Express.js Node.js & MongoDB

Documentación del curso llevado a cabo de la plataforma de Udemy.

## ¿Qué es express.js?
`Express.js` es un Framework para Node.js para aplicaciones web, minimalista y flexible, que provee un robusto conjunto de características para aplicaciones web y móviles.

## ¿Qué es Node Package Manager (npm)
Npm es el manejador de paquetes de Node.js, npm registra una colección de paquetes públicos de open-source para Node.js, front-end web apps, mobile apps, robots, routers y demás.

---

## Creación de la aplicación
Para iniciar un proyecto es necesario crear una carpeta y dentro de ella ejecutar el siguiente comando:

>`npm init`

Que creará un archivo de nombre `package.json` que es un archivo donde reciden los datos de la aplicación, configuración de comandos y dependencias que usará el proyecto, cuando se descargue el proyecto en otra computadora, `npm` tomará en cuenta este archivo e instalará las dependencias que se registraron en este archivo.

Después, se crea un simple archivo llamado `app.js` que es el que se ejecutará desde `Node.js`, con el siguiente contenido.

```javascript
console.log('Hello World with Node and Express');
```

Y para configurar el comando que se ejecutará desde `Node.js` se abre el archivo `package.json` y se configura el comando `start` y deja similar a lo siguiente: 

```json
{
  "name": "learning-mevn",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node ./app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/AngelGuerrero/learning-mevn.git"
  },
  "author": "Ángel Guerrero",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/AngelGuerrero/learning-mevn/issues"
  }
}

```
Lo siguiente es instalar las dependencias que nos permitirán usar ES6, ejecutando lo siguiente desde una terminal:

> `npm i -D babel-cli babel-preset-env babel-preset-stage-0`


Lo siguiente es modificar el comando `start` dentro del archivo `package.json` para comenzar a utilizar babel, lo cual el comando quedaría de la siguiente forma:

`"start": "node ./app.js --exec babel-node -e js",`

Así tenemos la posibilidad de usar ES6.

Una cosa más que se tiene que hacer es crear un archivo de nombre `.babelrc` y ahí se configura de la siguiente manera:

```json
{
    "presets": [
        "env",
        "stage-0"
    ]
}
```


### Instalando Express.js

Primero se instala un paquete de nombre `nodemon` que sirve para el hot-reload, con el siguiente comando:

>`npm i -D nodemon`

Y en el archivo de configuración `package.json` cambiar la siguiente línea del comando `start`.

`"start": "nodemon ./app.js --exec babel-node -e js",`

Para instalar Express.js simplemente hay que ingresar desde la terminal lo siguiente:

>`npm i -S express`

E instalará los paquetes necesarios y la versión más actual.

Ahora se puede probar el siguiente código en el archivo `app.js`.

```javascript
import express from 'express';

const PORT = 3000;

const server = express();

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

![Servidor corriendo](./docs/images/express_start.png)

---

# 2 Rutas en Express.js

Por el monento en el código anterior si se intenta acceder desde el navegador al `localhost:3000` se mostrará un error y es porque no se han definido las rutas.

Para definir una ruta y que retorne algo es necesario modificar el archivo `app.js` y agregar lo siguiente:

```javascript
import express from 'express';

const PORT = 3000;

const server = express();

// Configuración de las rutas
server.get('/', (req, res) => console.log("Hola mundo desde Express"));

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

Donde server llama a la función get a la cual se le pasan dos parámetros, el primero es la ruta a la cual se querrá acceder y el otro parámetro es un callback que recibe un _request_ y un _response_.

![Hola_mundo](./docs/images/hello_world.PNG)

Mas sin embargo es importante notar que en el navegador siempre está esperando una respuesta, esto es porque desde Node no le hemos dado una respuesta que pueda manejar.

![unresolve_response](./docs/images/unresolve_response.PNG)

Para ello es necesario modificar el código de la siguiente manera: 

```javascript
import express from 'express';

const PORT = 3000;

const server = express();

// Configuración de las rutas
server.get('/', (req, res) => {
    res.send("Hola mundo desde Express");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

Y se podrá ver el contenido en el navegador correctamente.

![hello_world_express](./docs/images/hello_world_express.PNG)

---

# 3 Sirviendo JSON

La idea de servir un Json es simplemente que Express retorne la información para que otra aplicación pueda hacer uso de esa información.

Lo primero es definir los datos que vamos a retornar, en este caso específico se creó una carpeta de nombre `data` dentro de la cual se crearon dos archivos de formato json de nombres `students.json` y `careers.json`.

Dentro de los cuales se tiene la siguiente información.

Para el archivo de students.json
```json
[
    {
        "id": "1",
        "name": "Ana",
        "course": "Computer Science"
    },
    {
        "id": "2",
        "name": "Sophia",
        "course": "Software Engineering"
    },
    {
        "id": "3",
        "name": "Wendy",
        "course": "Telematics"
    }
]
```

Para el archivo careers.json
```json
[
    {
        "id": 1,
        "name": "Nuclear Engineering"
    },
    {
        "id": 2,
        "name": "Software Engineering"
    },
    {
        "id": 3,
        "name": "Electronics and Communications Engineering"
    },
    {
        "id": 4,
        "name": "Computer Science Engineering"
    },
    {
        "id": 5,
        "name": "Electrical Engineering"
    }
]
```

Lo siguiente es definir las rutas para las cuales se servirán los datos de cada archivo, respectivamente.

```javascript
import students from './data/students.json';
import careers from './data/careers.json';
import express from 'express';

const server = express();
const PORT = 3000;

// RUTAS

// Función para construir una ruta
const buildUrl = (version, path) => `/api/${version}/${path}`;

// Root path
server.get('/', (req, res) => res.send('Hola mundo desde Express'));

// API's

// api/v1/students.json
server.get(buildUrl('v1', 'students'), (req, res) => res.json(students));

// api/v1/careers.json
server.get(buildUrl('v1', 'careers'), (req, res) => res.json(careers));

// Inicia el servidor
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

Se puede notar que primero se importan los datos de cada archivo Json, se crea una función para construir la URL, después se definen las rutas a las que responderán cada petición.

Respuesta de `api/v1/students`

![students_json](./docs/images/students_json.PNG)

Respuesta de `api/v1/careers`

![careers_json](./docs/images/careers_json.PNG)

# 4 Paso de parámetros por ruta

En base a una ruta específica podemos pasar parámetros para administrar la respuesta del servidor, en este caso específico para buscar los datos de un alumno por medio de su `id`, lo que se busca es lo siguiente.

`http://localhost:3000/api/v1/student/1`

De acuerdo a esta ruta nos arroje los datos del estudiante con el id igual a 1, para realizar esto se comienza agregando una nueva ruta con el verbo `get` de la siguiente forma:

```javascript
// api/v1/student/:id
server.get(buildUrl('v1', 'student/:id'), (req, res) => {
    console.log(`Estás buscando al estudiante con el id: ${req.params.id}`);
    res.end();
});
```

Ya que se tiene una función para _crear una URL_ simplemente se modifica para obtener la ruta deseada, cuando se entra al navegador con la siguiente ruta:

![parameter_browser_log](./docs/images/parameter_browser_log.PNG)

Y no se muestra nada porque aún no se ha enviado nada al navegador, mas sin embargo en la consola de la terminal se puede apreciar lo siguiente, que es el mensaje que se estableció.

![parameter_terminal_log](./docs/images/parameter_terminal_log.PNG)

Y se puede apreciar que se puede ver el parámetro `1` que se le había enviado desde la ruta.

## Instalación de lodash
Como ayuda para el manejo de datos se hará uso de la librería de nombre [lodash](https://lodash.com/).

### Instalación lodash
Para la instalación de la librería sólo es necesario escribir lo siguiente en la terminal.

`npm i -S lodash`

Una vez instalado lodash, se procede a probar el siguiente código:
```javascript
// api/v1/student/:id
server.get(buildUrl('v1', 'student/:id'), (req, res) => {
    const student = _.find(students, student => student.id === req.params.id);

    if (student) {
        res.json(student);
    } else {
        console.log(`No existe el estudiante con el id: ${req.params.id}`);
    }
    res.end();
});
```

Se puede observar que de acurdo a un parámetro enviado se busca en la colección de datos que se tiene de `students` para verificar si el estudiante con tal id existe, si es así, responde con los datos del estudiante encontrado, si no, sólo muestra un mensaje en consola.

Si se entra a buscar los datos del estudiante 1, se obtendrá una respuesta como la siguiente.
![student_one_json](./docs/images/student_one_json.PNG)

Mas sin embargo si se busca un elemento que no existe se obtiene el siguiente mensaje.
![student_four_json](./docs/images/student_four_json.PNG)


# 5 Express Router
Un `router` en Express no es más que un objeto aislado de middleware y rutas, se puede pensar en ello como una mini-aplicación capaz de mejorar el rendimiento del middleware y de las funciones de ruteo.

Con eso en mente se puede refactorizar el código que se tiene hasta ahora en el archivo `app.js` donde se establecen las rutas.

Para ello se crea un archivo llamado routes, y dentro de este se crea un archivo llamado `StudentRoutes.js` para almacenar las rutas de este modelo en específico.

A lo cual el archivo `app.js` quedó de la siguiente forma:

```javascript
import express from 'express';
import StudentRoutes from './routes/StudentRoutes';
import CareerRoutes from './routes/CareerRoutes';

const server = express();
const PORT = 3000;

// Función para construir una ruta
const buildUrl = (version, path = '') => `/api/${version}/${path}`;

// RUTAS
server.use(buildUrl('v1'), StudentRoutes);
server.use(buildUrl('v1'), CareerRoutes);

// Root path
server.get('/', (req, res) => res.send('Hola mundo desde Express'));

// Inicia el servidor
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

Y el archivo de `StudentRoutes.js` queda de la siguiente forma:
```javascript
import students from '../data/students.json';
import express from 'express';
import _ from 'lodash';

const router = express.Router();

// API's

// api/v1/students.json
router.get('/students', (req, res) => res.json(students));

// api/v1/student/:id
router.get('/student/:id', (req, res) => {
    const student = _.find(students, student => student.id === req.params.id);

    if (student) {
        res.json(student);
    } else {
        res.send(`No existe el estudiante con el id: ${req.params.id}`);
    }
    res.end();
});

module.exports = router;
```

Así también como para el archivo `CareerRoutes.js`:
```javascript
import careers from '../data/careers.json';
import express from 'express';

const router = express.Router();

// api/v1/careers.json
router.get('/careers', (req, res) => res.json(careers));

module.exports = router;
```

Y el funcionamiento sigue siendo el mismo, sólo que ahora el código tiene más estructura y así puede ser mejor mantenido.

# 6 Creación de datos con body-parser
Este middleware realiza un _"parseo"_ de las peticiones entrantes antes de que lleguen a los manejadores, disponible bajo la propiedad `req.body` property.

Al inicio de la aplicación o de iniciar el servidor cuando se solicita la información de los estudiantes se obteiene la siguiente información, que es información que se encuentra estática en un documento `json`.

![students_init_get_postman](./docs/images/students_init_get_postman.PNG)

Para conseguir agregar otro objeto en el documento es necesario primero definir la ruta específica que se utilizará para realizar dicho procedimiento.

Entonces la ruta para crear un nuevo objeto en el archivo `json`queda de la siguiente forma:

```javascript
// api/v1/students/new
router.post('/students/new', (req, res) => {
    console.log("Solicitando registro de nuevo estudiante.");
    console.log(req.body);

    const student = _.find(studentsArray, { "id": req.body.id });

    if (student) {
        console.log(`Ya existe un estudiante con el id: ${req.body.id}`);
        res.end();
    } else {
        studentsArray.push(req.body);
        res.status(200).send("OK");
    }
});
```

Con la ayuda de la librería `lodash` hace una búsqueda dentro del array `studentsArray` que se ha convertido en una variable temporal para almacenar y mostrar los datos de los estudiantes.

Entonces ahora cuando se realiza una petición a la dirección: `/students/new` para agregar un nuevo estudiante mostrará lo siguiente:

![students_first_new_postman](./docs/images/students_first_new_postman.PNG)

En la imagen anterior se puede ver como se retorna un mensaje de OK.

Si se realiza entonces de nuevo una petición `GET` para ver los datos de todos los estuiantes se podrá ver lo siguiente:

![students_after_get_postman](./docs/images/students_after_get_postman.PNG)

Se puede ver que el objeto que se le ha pasado se ha agregado correctamente y si se intenta realizar de nuevo la petición `POST` se obtiene un mensaje como el siguiente:

![student_second_post](./docs/images/student_second_post.PNG)

Esto es porque se realizó una mínima validación sobre el `id` de un objeto que ya se encontraba en la fuente de datos.

Más sin embargo hasta este punto aún los datos se vuelven a borrar, así es que aún no son persistentes.

# 7 Persistencia de datos
Ahora que se puede mandar y obtenrer información, es necesario que esta información se guarde en algún lado.

Para ello registré una cuenta en `mLab` que trabaja con MongoDB.

![registro_mlab](./docs/images/registro_mlab.PNG)

Después del registro y de crear una base de datos con un provedor se obtiene la siguiente información que es la información para la conexión a la base de datos con MongoDB.

![datos_db_mongo](./docs/images/datos_db_mongo.PNG)

## Instalando paquetería necesaria para conexión con BD
Para la conexión a la base de datos se utilizará el siguiente paquete de nombre: `mongoose`.

comando: `npm i -S mongoose`

## Configuración de datos para conexión
Una vez que se ha instalado el paquete mongoose, se procede a realizar la conexión con la base de datos en este caso del archivo de `StudentRoutes.js`
se importa el paquete `mongoose` y se agrega lo siguiente:

```javascript
const DB_USER = '';
const DB_USER_PASSWD = '';
const DB_URL = `mongodb://${DB_USER}:${DB_USER_PASSWD}@ds119692.mlab.com:19692/angelguerreroprojects`;

// Database connection
mongoose.connect(DB_URL);
const DB = mongoose.connection;
DB.once('open', () => console.log('Successfully connection.'));
```

Simplemente se agregan las variables para la conexión a la base de datos de mlab.

## Verbos REST
Se le conoce como REST a la arquitectura que maneja los estados de transferencia, los cuales también se les conoce como verbos los cuales principalmente son los siguientes:

- POST: Se utiliza para insertar información.
- GET: Se utiliza para solicitar información.
- PUT: Se utiliza para actualizar información.
- DELETE: Se utiliza para borrar información.

Dada esta teoría fue necesario modificar las rutas para concordar con esta arquitectura y poder realizar un CRUD (Create, Read, Update, Delete) las cuales quedaron de la siguiente forma:

Antes de continuar, es necesario notar que mongoose trabaja con un Schema, es decir se tiene qué definir un esquema para poder realizar operaciones con él, de acuerdo a este caso el esquema para mongoose quedaría de la siguiente forma, se ha creado un archivo llamado modelo para especificar el esquema y el modelo para trabajar. 

Archivo: `models/student.js`
```javascript
import mongoose from 'mongoose';

// Schema
const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});

// Model
const studentModel = mongoose.model('Student', studentSchema);

module.exports = { studentSchema, studentModel };
```
---

### CREATE
```javascript
// /new
router.post('/new', (req, res) => {
    const id = new mongoose.Types.ObjectId();

    const studentToPersist = Object.assign({
        _id: id,
    }, req.body);

    const student = new studentModel(studentToPersist);
    student.save().then((err, student) => {
        if(err) res.status(500).json(err);

        res.status(200).json(student);
    });

});
```
El código anterior se modificó para que concuerde con el modelo y el esquema que trabaja mongoose, pero básicamente primero se asigna un tipo de objeto para la constante `id`, y se asigana a los valores de un objeto aisgnando el id y el cuerpo del request.

#### Pruebas guardando datos
Si se lanza una petición a la ruta para craer un nuevo objeto en la base de datos, la respuesta sería la siguiente:

![nuevo_objeto_mlab](./docs/images/nuevo_objeto_mlab.PNG)

En la imagen puede apreciarse que no es necesario establecer un id, ya que se le ha dicho que se defina un id de acuerdo al esquema y al modelo que se definió con mongoose.

Se puede ver también que hay una persistencia de datos revisando la base de datos.

![mlab_primer_objeto](./docs/images/mlab_primer_objeto.PNG)

---

### READ
Se ha modificado el código para leer los datos desde el servidor donde se encuentra la base de datos de Mongo.
```javascript
// /
router.get('/', (req, res) => {
    studentModel.find((err, students) => {
        if (err) res.status(500).json(err);

        res.json(students);
    });
});

// /show/:id
router.get('/show/:id', (req, res) => {
    studentModel.findById(
        // id of the item to find
        req.params.id, 
        
        // the callback function
        (err, student) => {
            if (err) res.status(500).json(err);
        
            res.json(student);
        });
});
```
El código anterior corresponde a la acción de lectura de datos, petición GET que se hace al servidor para obtener los datos.

---

### UPDATE

De igual forma para actualizar un elemento se ha modificado el código para buscar por un id en específico utilizando `studentModel`.

```javascript
// /edit/:id
router.put('/edit/:id', (req, res) => {
    studentModel.findByIdAndUpdate(
        // id of the item to find
        req.params.id, 
        
        // the change to be made
        req.body,

        // asks to mongoose to return the updated version
        { new: true},

        // the callback function
        (err, student) => {
        
            if (err) res.status(500).json(err);
            
            res.status(200).json(student);
        });
});
```

En la siguiente imagen puede verse los datos que se encuentran actualmente.
![datos_antes_editar](./docs/images/datos_antes_editar.PNG)

Si se envía una petición de tipo PUT para editar ese objeto, se obtiene lo siguiente.

![respuesta_editar](./docs/images/respuesta_editar.PNG)
---

### DELETE

Al igual que para actualizar un item de la colección se utilizó una función dada por mongoose para mejorar estas operaciones, de tal forma que el código para eliminar un objeto quedaría de la siguiente forma:

```javascript
// /delete/:id
router.delete('/delete/:id', (req, res) => {
    studentModel.findByIdAndRemove(
      req.params.id,
      
      // the callback function
      (err, student) => {
          if (err) return res.status(500).json(err);

          const response = {
              message: "Student successfully deleted",
              id: student._id
          };
          return res.status(200).json(response);
      });
});
```
Para eliminar el objeto simplemente es necesario pasar el id por la URL haciendo una petición del tipo DELETE.

![respuesta_borrar](./docs/images/respuesta_borrar.PNG)

Nótese que se están utilizando los verbos POST, PUT y DELETE que generalmente se usan en aplicaciones con arquitectura REST.