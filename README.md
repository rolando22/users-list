# Repositorio proyecto List of Users con React & TypeScript

El proyecto fue creado mientras realizaba el curso de React 2023 de Midudev [RESUELVO PRUEBA TÉCNICA de €55K AL AÑO en Europa | React + TypeScript](https://www.youtube.com/@midulive).

Este repositorio contiene el código de una aplicación de una prueba técnica que lista usuarios de la API https://randomuser.me/api, poder ordenarlos por nombre, apellido o país, filtrar por país, eliminar usuarios, poder restaurar la lista original y pintar las celdas de la tabla.

- Desarrollada con React para manipulación del DOM y reactividad de la aplicación.
- Vite como empaquetador y SWC como transpilador.
- TypeScript para el tipado del código.
- Uso de useMemo para memoizar el cálculo del filtro y del ordenador.
- Uso de useRef para guardar una referencia de la lista de usuarios original y poder restaurarlo.
- Uso de customHooks para el manejo del estado de users.

Puedes ver el demo aquí: ().

# Prueba técnica con TypeScript y React

Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.

El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: https://midu-react-11.surge.sh/. Para lograr esto, debe usar la API proporcionada por https://randomuser.me/.

Los pasos a seguir:

- [] Fetch 100 rows of data using the API.
- [] Display the data in a table format, similar to the example.
- [] Provide the option to color rows as shown in the example.
- [] Allow the data to be sorted by country as demonstrated in the example.
- [] Enable the ability to delete a row as shown in the example.
- [] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [] Handle any potential errors that may occur.
- [] Implement a feature that allows the user to filter the data by country.
- [] Avoid sorting users again the data when the user is changing filter by country.
- [] Sort by clicking on the column header.
