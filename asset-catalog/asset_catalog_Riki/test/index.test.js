const fs = require('fs');
const path = require('path');
const { uploadFile, readFile } = require('../src/index');

describe('File Upload and Read Tests', () => {
    const testWatchedDirectory = './watched';
    const testUploadDirectory = './uploads';
    const testStateFilePath = path.join(__dirname, 'uploaded_files.json');
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
        if (fs.existsSync(testStateFilePath)) {
            fs.unlinkSync(testStateFilePath);
        }
    });

    test('should upload a file correctly', () => {
        fs.writeFileSync(testFilePath, 'Reading this file.');
        uploadFile(testFilePath);
        const uploadedFilePath = path.join(testUploadDirectory, 'aaa.txt');
        expect(fs.existsSync(uploadedFilePath)).toBe(true);
        const content = fs.readFileSync(uploadedFilePath, 'utf8');
        expect(content).toBe('Reading this file.');
        fs.unlinkSync(uploadedFilePath);
    });

    test('should read a file correctly', () => {
        fs.writeFileSync(testFilePath, 'Reading this file.');
        const logSpy = jest.spyOn(console, 'log');
        readFile(testFilePath);
        expect(logSpy).toHaveBeenCalledWith(`Content of ${testFilePath}:\nReading this file.`);
        logSpy.mockRestore();
    });
});
