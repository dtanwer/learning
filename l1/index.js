const fs = require('fs');
const path = require('path');

const  readFileWithTiming=(filePath)=>{

  return (printMyFileData)=>{
    const startTime = new Date();

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
        return;
      }
      const endTime = new Date();
      const totalTime = endTime - startTime;

      printMyFileData(null, data, totalTime);
    });
  };
}



const folderPath = path.join(__dirname, './data');

const readAndTimeFilesInFolder = (folderPath, printMyFileData) => {
    fs.readdir(folderPath, 'utf8', (err, files) => {
        if (err) {
        callback(err, null);
        return;
        }
    
        const filePaths = files.map((file) => path.join(folderPath, file));
    
        const fileReaders = filePaths.map((filePath) => readFileWithTiming(filePath));
    
        fileReaders.forEach((fileReader) => {
        fileReader(printMyFileData);
        });
    });

    
}

const printMyFileData=(err, data, totalTime) => {

    if (err) {
        console.error('Error reading files:', err);
    } else {
        console.log('Files content:', data);
        console.log(`Reading took ${totalTime} milliseconds`);
    }
}



readAndTimeFilesInFolder(folderPath, printMyFileData);



