const { describe } = require('node:test');
const { getFilesInCache, saveInCache, saveNewFile, uploadFile, removeEmptyFile, arrangeFilesArray, hasArrayIncludeFile } = require('../functions')

jest.mock('../functions.js', () => {
  return {

    getFilesInCache: jest.fn()
    .mockReturnValueOnce(['no file'])
    .mockReturnValueOnce(['no file'])
    .mockReturnValueOnce(['file1.js'])
    .mockReturnValueOnce(['file1.js'])
    .mockReturnValueOnce(['file1.js', 'fileUp.js'])
    .mockReturnValueOnce(['file1.js', 'fileUp.js'])
    .mockReturnValueOnce(['file1.js', 'fileUp.js', 'file.js']), 

    saveNewFile: jest.fn()
    .mockReturnValue(true),

    removeEmptyFile: jest.fn()
    .mockReturnValueOnce(['file1.js'])
    .mockReturnValueOnce(['file1.js', 'fileUp.js'])
    .mockReturnValueOnce(['file1.js', 'fileUp.js', 'file.js'])
    .mockReturnValueOnce(['node']),

    uploadFile: jest.fn()
    .mockReturnValue(true),

    saveInCache: jest.fn()
    .mockReturnValue(true),

    arrangeFilesArray: jest.fn()
    .mockReturnValue(['file1.js', 'fileUp.js', 'file.js', 'node']),

    hasArrayIncludeFile: jest.fn()
    .mockReturnValue(true)
    }
});

describe('TEST', () => {

  describe('Get Files In Cache', () => {
    it('should return array with file names', () => {
      const data = getFilesInCache();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('Save New File', () => {
    it('should save and upload the received fileName ', () => {
      let data = getFilesInCache();
      saveNewFile('file1.js');
      data.push('file1.js');
      data = removeEmptyFile(data);
      expect(data).toEqual(getFilesInCache());
    });
  });

  describe('Upload File', () => {
    it('should uploud the file to server ', () => {
      let data = getFilesInCache();
      uploadFile('fileup.js');
      saveInCache('fileup.js');
      data.push('fileup.js');
      data = removeEmptyFile(data);
      expect(data).toEqual(getFilesInCache());
    });
  });

  describe('Save In Cache', () => {
    it('should save in cache the received fileName ', () => {
      let data = getFilesInCache();
      saveInCache('file.js');
      data.push('file.js');
      data = removeEmptyFile(data);
      expect(data).toEqual(getFilesInCache());
    });
  });

  describe('Arrange Files Array', () => {
    it('should arrange the files ', () => {
      const arrangedata = arrangeFilesArray('node');
      expect(arrangedata).toContain('node');
      expect(arrangedata).not.toContain('no file');
    });
  });

  describe('Remove Empty File', () => {
    it('should remove empty file ', () => {
      let data = ['no file', 'node'];
      data = removeEmptyFile(data);
      expect(data).toEqual(['node']);
    });
  });

  describe('Has Array Include File', () => {
    it('should return true when array include receive file ', () => {
      let data = ['no file', 'node'];
      result = hasArrayIncludeFile(data, 'node');
      expect(result).toBe(true);
    });
  });
});
