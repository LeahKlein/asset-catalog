const { Command } = require('commander');
const { watchDirectory, uploadFile, readFile } = require('./index');
const fs = require('fs');
const path = require('path');
const program = new Command();

program
    .command('start')
    .description('Start watching the directory for file uploads')
    .action(() => {
        watchDirectory();
        console.log('Started watching the directory...');
    });

program
    .command('upload <filePath>')
    .description('Upload a file to the upload directory')
    .action((filePath) => {
        uploadFile(filePath);
        console.log(`File ${filePath} uploaded.`);
    });

program
    .command('read-file <filePath>')
    .description('Read the content of a file')
    .action((filePath) => {
        readFile(filePath);
    });    

program
    .command('update-file <fileName> <content>')
    .description('Update a file with new content')
    .action((fileName, content) => {
        const watchedDirectory = './watched';
        const filePath = path.join(watchedDirectory, fileName);
        fs.writeFileSync(filePath, content);
        console.log(`File ${fileName} updated with new content.`);
    });

program.parse(process.argv);