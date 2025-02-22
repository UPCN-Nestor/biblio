import path from 'path';

// ... in your Express app setup ...
app.use('/images', express.static(path.join(__dirname, '../public/images'))); 