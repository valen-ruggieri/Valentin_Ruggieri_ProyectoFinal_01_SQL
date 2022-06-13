# Valentin_Ruggieri_ProyectoFinal_01

## Funcionamiento

![Video de funcionamiento de la App](https://media.giphy.com/media/OgKHI1g8jpomp6K9VK/giphy.gif)

## Inicio
En esta primer entrega del proyecto utilizaremos todos los contenidos aprendidos hatsa el momento para crear un ecommerce.
Nuestro ecommerce presenta una vista de home inicial que redirige hacia la pagina de usuario donde podremos registrarnos.
Alli completaremos un formulario en el cual especificamos nuestros datos y ademas el tipo de permiso con el que ingresaremos.

## Permisos
Los tipos de permisos sirven para poder acceder a difernetes vistas como asi tambien funcionalidades.
Nuestro ecommerce consta de dos tipos de permisos: Cliente y Administrador.

### Cliente
Con este tipo de permiso podremos acceder a las funciones de:
 - La tienda dondde podremos agregar los productos disponibles a nuestro carrito.
 - El carrito donde podremos revisar nuestros productos, como asi tambien eliminar alguno de ellos o todo el carrito.
 - El chat donde podremos enviar mensajes con nuestro nombre de usuario.

### Administrador 
Con este tipo de permiso podremos acceder a las funciones de:
 - El panel de administradores donde podremos visializar los productos que ya estan agregados en la tienda cmos asi tambien editar, agregar o eliminar alguno.
 - El formulario de agregar producto donde podremos ingresar todos los datos necesarios para introducir un nuevo producto a la tienda.
 - El formulario de actualizacion de un producto donde podremos actualizar todos los datos de un producto ya existente.

## Validaciones
Las validaciones de los formularios, ya sea a la hora de registrarse o de agregar/actualizar un producto estan realizadas mediante un 
esquema determinado  creado a partir de yup y  un middleware que valida dicho esquema, lo cual nos brinda la garantia de que antes de enviar
nuestros formularios chequeara que los datos enviados sean los requeridos.

## Errores 
Los errores contemplados en nuestro ecommerce son:
 - Ingresar a una ruta que requiere unos permisos diferentes a los que se poseen.
 - Completar y enviar un formulario con datos erroneos o que no sean los requeridos.
 Estos tipos de errores se manejaran medianta la renderizacion de una pagina de erorr 400 en la cual se especifiacara dicho error
 cmos asi tambien se brindara las diferentes posibilidades de continuar navegando.
 
 ## Herraminetas y su uso en la app
 Para la creacion de este ecommerce hemos utilizado estas herramientas:
  - Multer para poder agregar imagenes en los productos que sean agregados como aquellos que sean actualizados.
  - Socket.io para poder crear el chat de la pagina del cliente.
  - Css y Bootstrap para poder realizar el maquetado, diseno y animaciones de nuestro proyecto.
  - Yup para poder crear los esquemas de validaciones.
  - Firestore Database para poder almacenar alli nuestros datos de usuarios, carritos y productos.
 
 ## Especificaciones extras
  - Para poder realizar un inicio de sesion utilizamos la informacion brindada en el registro del usuario, la cual es almacenada en firestore para luego ser accedida y de alli poder obtener el id de usuario y los permisos del mismo y guardarlos en una variable la cual usaremos para validar las rutas y mostar informacion del mismo.
  - Utilizamos plantillas para pooder manejar renderizados condicionales en algunas vistas y el renderizado de nuestros productos en otras.
  - El carrito de productos solo puede ser creado por el usuario cliente y esta alejado del alcance del administrador, este mismo carrito sera guardado dentro de usuario en la base de datos.

## Tecnologías
- Node Js
- Express Js
- Multer
- EJS
- Bootstrap
- Css
- Yup
- Socket.io
- Firestore Database


