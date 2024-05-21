const fs = require('fs');
const path = require('path');

const header = `/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              {nombre del fichero}
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
`;

function addHeaderToFile(filePath) {
  const fileName = path.basename(filePath);
  const fileHeader = header.replace('{nombre del fichero}', fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    if (!data.startsWith('/*  Laboratorio de Ingeniería del Software')) {
      const newData = fileHeader + data;
      fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) throw err;
        console.log(`Added header to ${filePath}`);
      });
    } else {
      console.log(`Header already exists in ${filePath}`);
    }
  });
}

function processDirectory(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) {
          processDirectory(filePath);
        } else if (filePath.endsWith('.tsx')) {
          addHeaderToFile(filePath);
        }
      });
    });
  });
}

const targetDirectory = path.join(__dirname, 'src'); // Cambia 'src' por el directorio raíz de tu proyecto

processDirectory(targetDirectory);
