import { AppDataSource } from '../data-source';
import { seedBooks } from './bookSeeds';

AppDataSource.initialize().then(async () => {
    console.log('Running seeds...');
    await seedBooks();
    console.log('Seeds completed!');
    process.exit(0);
}).catch(error => {
    console.log('Error during seeding:', error);
    process.exit(1);
}); 