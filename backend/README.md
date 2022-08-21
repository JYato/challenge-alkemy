# Alkemy - Challenge - Backend
 Backend de Solución a Alkemy Challenge usando Node (Express)

 # Tecnologías usadas
    * Express
    * Sequelize
    * Mysql
    * Librerías como nodemailer, jsonwebtoken
 
 # Pasos para correr de manera local
 1. `cd backend`
 2. `npm install`
 3. Configurar variables de entorno. En el archivo .env.example se pasan las variables necesarias. Borrar la extensión .example y que solo quede .env
 4. Configurar las variables BD_ con la configuración local del dispositivo con respecto a mysql (nombre de la base de datos, usuario, contraseña, host).
 5. En la variable FRONTEND_URL colocar como valor la dirección del frontend o dejar en su defecto el existente. Las variables de Nodemailer necesitan de sus datos de email, para ello es necesario:
    * Ir a su cuenta de Google.
    * Gestionar tu cuenta de Google
    * Seguridad
    * Verificación de dos pasos 
    * Ingresar contraseña
    * Contraseñas de aplicaciones
    * Generar Aplicación => otra (nombre personalizado)
    * Copiar su contraseña como valor de la variable de entorno EMAIL_PASS, luego colocar su correo como valor de la variable EMAIL_USER.
 6. `npm run dev`
 
 