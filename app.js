const fs = require('fs');
const path = require('path');

const dir = process.argv[2];

fs.readdir(dir,(err, files) => {
    if (err) {
        console.log(err.message);
        process.exit(1);
    }
    console.log(files);
    files.forEach(file => {

        const filePath = path.join(__dirname,dir,file);
        const fileDate = fs.statSync(path.join(__dirname,dir,file)).birthtime;
        
        const newFilePath = path.join(__dirname,dir,(fileDate.getFullYear() + '-' + 
                            Number(fileDate.getMonth() + 1) + '-' + 
                            fileDate.getDate() + '_' +
                            fileDate.getHours() + '-' + 
                            fileDate.getMinutes() +  
                            path.extname(file)));

        fs.rename(filePath, newFilePath, (err) => {
            if (err) {
                console.log(err.message);
                process.exit(1);
            }
            console.log('Renamed ' + path.basenamefilePath + ' to ' + newFilePath);
        });
    });
});