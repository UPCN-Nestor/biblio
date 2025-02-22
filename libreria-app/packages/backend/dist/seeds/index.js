"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const bookSeeds_1 = require("./bookSeeds");
data_source_1.AppDataSource.initialize().then(async () => {
    console.log('Running seeds...');
    await (0, bookSeeds_1.seedBooks)();
    console.log('Seeds completed!');
    process.exit(0);
}).catch(error => {
    console.log('Error during seeding:', error);
    process.exit(1);
});
