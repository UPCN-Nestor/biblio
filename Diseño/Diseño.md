# Aplicación para gestionar libros (y quizás otros artículos) para una librería de usados / espacio cultural.
- La aplicación va a estar exclusivamente en español.
- Por favor sugerir nombres para la app, en español.

# Plataformas
- PC
- Android

# Estética
- Minimalista, limpia, modo oscuro.
- Debe estar inspirada en una acogedora librería antigua, pero con vibras revolucionarias bolcheviques.

# Características
- La filosofía es la de un trabajo en progreso, por lo que debe ser fácil agregar nuevas características y eliminar las que no funcionan.
- Inventario de libros: título, imagen de portada, etc.
- Funciones de búsqueda, filtros, etc.
- Importante: Debe poder escanear códigos de barras u OCR de ISBNs y encontrar información en bases de datos de acceso público y motores de búsqueda.
- Debe poder resumir libros usando servicios de IA gratuitos, pero solo bajo demanda para reducir costos (y luego se guardaría en la entidad).
    - En cualquier caso, sería ideal si pudiéramos usar un servicio de IA gratuito para esto, tal vez "scrapeando" un chat gratuito (ChatGPT, Anthropic, DeepSeek, etc.)
- Debe tener una función de "exportar a Instagram", con una plantilla basada en la estética descrita y texto editable (sugiriendo algo con IA). Debe crear una imagen para que el usuario pueda compartirla en Instagram, no una publicación directa. Debe tener la opción de hacer una imagen del tamaño de una historia o una imagen cuadrada para post.
    - Esta función debe mostrar el nombre de esta app y su creador en la parte inferior, en texto pequeño.
- Debe tener una página web con landing page, blog y formulario de contacto.
    - Y un espacio para navegar el catálogo y comprar libros con MercadoPago y otros métodos de pago.

# Tecnologías
- Estoy en Windows y se va a usar en Windows.

- Frontend:
    - **React + TypeScript**: 
        - Más liviano que Angular
        - Mejor para aplicaciones móviles con React Native
        - Curva de aprendizaje más suave que Angular
        - Excelente ecosistema de librerías
        - TypeScript para mayor seguridad y mantenibilidad

- Backend:
    - **Node.js + Express + TypeScript**:
        - JavaScript/TypeScript en todo el stack
        - Muy liviano y rápido de desarrollar
        - Excelente para APIs REST
        - Gran cantidad de librerías para todo lo necesario (OCR, escaneo de códigos de barras, etc.)
        - Fácil de desplegar

- Base de datos:
    - **PostgreSQL** (principal):
        - SQL robusto y confiable
        - Excelente para copias de seguridad automáticas
        - Fácil de hostear (ej: Railway, Supabase, etc.)
        - Mejor para sincronización entre dispositivos
        - Permite búsquedas de texto completo nativas
        - Gratis en varios servicios de hosting
    
    - **SQLite** (local):
        - PC:
            - Se instala como parte de la aplicación
            - El archivo .db se guarda en AppData o similar
            - Perfecto para modo sin conexión
            - Muy liviano (~1MB)
            - No requiere instalación separada
        - Android:
            - Nativo en el sistema
            - Se guarda en el almacenamiento interno de la app
        - Sincronización:
            - Implementar cola de cambios sin conexión
            - Sincronización bidireccional con PostgreSQL
            - Resolución de conflictos básica (gana el último cambio)
            - Copia de seguridad local automática a archivo

- Móvil:
    - **React Native**:
        - Reutilización de código con el frontend web
        - Acceso nativo a la cámara para escaneo de códigos
        - Buen rendimiento
        - Una sola base de código para Android (y potencialmente iOS)

# Arquitectura del Sistema

## Estructura Multi-capa
1. **Capas Principales**
   - Frontend Web
   - Frontend Móvil
   - Frontend Core (compartido entre web y móvil)
   - API Backend
   - Capa de Base de Datos (PostgreSQL + SQLite)
   - Capa de Integración de Servicios Externos

2. **Componentes Principales**

### Capa Frontend
- SPA React para interfaz web
- App React Native compartiendo lógica de negocio
- Biblioteca de componentes común entre web/móvil
- Gestión de estado con Redux/Redux Toolkit
- Arquitectura que prioriza el funcionamiento sin conexión con almacenamiento local

### Capa Backend
- API Express.js con TypeScript
- Endpoints RESTful + WebSocket para sincronización
- Arquitectura modular con separación clara:
  - Controladores
  - Servicios
  - Repositorios
  - Modelos de Dominio
  - DTOs

### Estrategia de Base de Datos
- **Principal**: PostgreSQL para almacenamiento central
- **Local**: SQLite para capacidades sin conexión
- Mecanismo de sincronización:
  - Tabla de seguimiento de cambios
  - Sistema de cola para cambios sin conexión
  - Estrategia de resolución de conflictos
  - Intervalos de sincronización periódica

### Detalle de Características Principales

1. **Gestión de Libros**
   - Modelo de entidad rico con todos los metadatos
   - Sistema de almacenamiento de imágenes (probablemente compatible con S3)
   - Servicio de búsqueda por ISBN
   - Servicio de escaneo de códigos de barras

2. **Integración de IA**
   - Interfaz de servicio de IA abstracta
   - Sistema de cola para operaciones de IA
   - Capa de caché para contenido generado por IA
   - Mecanismos de respaldo

3. **Exportación a Redes Sociales**
   - Servicio de generación de imágenes
   - Sistema de plantillas
   - Integración de generación de texto
   - Sistema de cola de exportación

4. **Comercio Electrónico**
   - Integración con MercadoPago
   - Sistema de carrito de compras
   - Gestión de pedidos
   - Seguimiento de inventario

