# Reservación de Citas Médicas
## Integrantes
| Apellidos | Nombres | No. de Carnet |
| --------- | ------- | ------------- |
| Caneda Trujillo | Kenneth Xavier | 2025086 |
| Barahona Pasán | Carlos Emilio | 2025075 |
| Ramos López | Jancarlo Antonio | 2025162 |
| Morales Solís | Kevin Eduardo | 2025027 |
| Coy Mucía | Jose Angel | 2025161 |

## Problema
Una clínica necesita organizar las citas de sus pacientes. El equipo construirá una aplicación para programarlas, validarlas, actualizarlas y controlar su estado.

## Instalación:
1. Clonar el repositorio
2. Entrar a la carpeta del proyecto: `cd Reservacion_Medica_Angular` desde la terminal de git.
3. Instalar nuevamente los recursos necesarios para el proyecto (node_modules) utilizando `pnpm install`.
4. Iniciar el proyecto utilizando `ng serve.
5. Abrir la página desde el navegador utilizando la ruta http://localhost:4200

## Distribución de trabajo
* **Kenneth Xavier Caneda Trujillo** - Creación del formulario reactivo desde el componente form, el modelo con la interfaz de Reserva y la capa service para manejar los registros ingresados desde un arreglo. Realización de la documentación del proyecto.
* **Carlos Emilio Barahona Pasán** - Creación de la funcionalidad de listar, buscar, editar, cancelar y eliminar citas, con su respectiva vista y estilo.
* **Jancarlo Antonio Ramos López** - Diseño de la vista para el formulario y su estilo, enlazando correspondientemente los campos y validaciones del FormGroup. Realización de las pruebas del proyecto.
* **Kevin Eduardo Morales Solís `(SM)`** - Creación del repositorio con sus debidas ramas, creación de la estructura base del proyecto desde la rama develop e implementación del reto adicional (Persistencia en localStorage y Resumen General de citas).
* **Jose Angel Coy Mucía** - Implementación de validaciones en el FormGroup para cada campo con las verificaciones solicitadas en el documento, además de la implementación del método verificarChoqueHorario en el service para detectar si hay más de una reserva con el mismo horario.

## Ramas:
* main
* develop
* feature/formulario
* feature/listado
* feature/estilos-pruebas
* feature/reto-adicional