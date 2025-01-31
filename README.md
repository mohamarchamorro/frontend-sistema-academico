# 📚 FRONTEND - SISTEMA ACADÉMICO

Este repositorio contiene el frontend del sistema académico, desarrollado con **Angular 17.0.5** y utilizando **Visual Studio Code** como entorno de desarrollo.

La aplicación actúa como cliente tanto de una API **REST** (para operaciones CRUD) como de un servicio **SOAP** (para consultas). Una vez ejecutada, la aplicación estará disponible en:

🔗 **http://localhost:4200/**

---

## 🚀 1. Descarga del Proyecto

Puedes obtener el código fuente de dos maneras:

### 📌 Opción 1: Clonar el repositorio con GIT
```bash
 git clone https://github.com/mohamarchamorro/frontend-sistema-academico.git
```

### 📌 Opción 2: Descargar el archivo .ZIP
1. Accede al repositorio en GitHub.
2. Descarga el archivo **.ZIP** desde la opción "Code".
3. Extrae el contenido en la ubicación deseada.

---

## 🖥️ 2. Abrir el Proyecto en Visual Studio Code

1. Abre **Visual Studio Code**.
2. Ve a **File** → **Open Folder**.
3. Selecciona la carpeta del proyecto descomprimida.

---

## 📦 3. Instalación de Dependencias

Abre una terminal en la carpeta raiz del proyecto (`frontend-sistema-academico`) y ejecuta:
```bash
npm install
```
Esto instalará todas las dependencias necesarias.

---

## ▶️ 4. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo y abrir la aplicación en el navegador, ejecuta:
```bash
ng serve -o
```

Esto iniciará la aplicación en `http://localhost:4200/` y abrirá el navegador automáticamente.

---

## 📌 Notas Adicionales

- **Asegúrate de que el backend esté ejecutándose antes de probar las funcionalidades del frontend.**

- Asegúrate de tener instalado **Node.js** y **Angular CLI** antes de ejecutar los comandos.

- **Verificar la ruta del Backend:** Si el backend se ejecuta en un puerto distinto al `8080`, debes actualizar las rutas en los servicios correspondientes. Por ejemplo:

  **Antes:**
  ```typescript
  URL: string = "http://localhost:8080/api/estudiantes";
  ```
  **Después (por ejemplo, si el backend está en el puerto 9100):**
  ```typescript
  URL: string = "http://localhost:9100/api/estudiantes";
  ```

---

## 🎯 Contacto
Para cualquier consulta o problema, no dudes en crear un issue en el repositorio o contactar al desarrollador.

🚀 ¡Disfruta del desarrollo! 🎉

📌 **Autor:** [Mohamar Chamorro](https://github.com/mohamarchamorro)\
📌 **Repositorio:** [frontend-sistema-academico](https://github.com/mohamarchamorro/frontend-sistema-academico)

