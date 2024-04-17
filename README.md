
# Inicialización de ChambaVision

Este repositorio contiene un proyecto que utiliza Firebase para su backend. Sigue los siguientes pasos para inicializar el proyecto en tu entorno local.

## Requisitos previos

- Tener Node.js y npm instalados en tu sistema. Puedes descargarlos desde [aquí](https://nodejs.org/).

## Pasos para inicializar el proyecto

1. Instalar Firebase CLI globalmente mediante npm:

    ```
    npm install -g firebase-tools
    ```

2. Iniciar sesión en Firebase:

    ```
    firebase login
    ```

3. Listar los proyectos disponibles en Firebase:

    ```
    firebase projects:list
    ```

4. Muevete a la carpeta llamada "functions" en la raíz del proyecto.
    
    ```
    cd functions
    ```


5. Instalar las dependencias necesarias para el backend:

    ```
    npm install express cors
    ```

## Pasos para probar que todo funcione

1. Inicia el servidor
    
    ```
    npm run serve
    ```
2. Abre postman

3. Crea una nueva coleccion

4. Crea una nueva request llamada HelloWorld

5. Asegurate que tiene la opcion de GET y luego pon este link: http://127.0.0.1:5001/chambavision/us-central1/app/hello-world

6. Si recibes Hello Wolrd! Felicidades ganaste
