const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('CLI Tests', () => {
    const testWatchedDirectory = './watched';
    const testUploadDirectory = './uploads';
    const testFilePath = path.join(testWatchedDirectory, 'aaa.txt');

    beforeAll(() => {
        if (!fs.existsSync(testWatchedDirectory)) {
            fs.mkdirSync(testWatchedDirectory);
        }
        if (!fs.existsSync(testUploadDirectory)) {
            fs.mkdirSync(testUploadDirectory);
        }
    });

    afterAll(() => {
        fs.rmdirSync(testWatchedDirectory, { recursive: true });
        fs.rmdirSync(testUploadDirectory, { recursive: true });
    });

    test('should upload a file via CLI', () => {
        fs.writeFileSync(testFilePath, 'This is a test file for CLI.');
        const command = `node src/cli.js upload ${testFilePath}`;
        execSync(command);
        const uploadedFilePath = path.join(testUploadDirectory, 'aaa.txt');
        expect(fs.existsSync(uploadedFilePath)).toBe(true);
        const content = fs.readFileSync(uploadedFilePath, 'utf8');
        expect(content).toBe('This is a test file for CLI.');
        fs.unlinkSync(uploadedFilePath);
    });

    test('should read a file via CLI', () => {
        fs.writeFileSync(testFilePath, 'Reading this file.');
        const command = `node src/cli.js read-file ${testFilePath}`;
        const output = execSync(command).toString();
        expect(output).toContain(`Content of ${testFilePath}:\nReading this file.`);
    });
});
