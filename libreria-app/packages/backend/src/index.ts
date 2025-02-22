import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import bookRoutes from './routes/bookRoutes';
import bodyParser from 'body-parser';
import BookController from './controllers/BookController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// Rutas
app.use('/api/books', bookRoutes);

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada');
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  }); 