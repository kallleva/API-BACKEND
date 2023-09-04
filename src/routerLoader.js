import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Obtenha o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(" __dirname =--- >> " + __dirname);

export const routerLoader = async (app) => { // Tornar a função assíncrona
  const modulesPath = path.resolve(__dirname, 'modules');
  console.log(" modulesPath -->> " + modulesPath);

  try {
    const moduleDirs = fs.readdirSync(modulesPath);

    for (const dir of moduleDirs) {
      const controllerpath = path.join(modulesPath, dir, `${dir}.controller.js`);
      console.log(' controllerpath antes di if-->> ' + controllerpath);

      if (fs.existsSync(controllerpath)) {
        const moduleURL = new URL(`file://${controllerpath}`);
        const module = await import(moduleURL);
        console.log(' controllerpath -->> ' + controllerpath);

        if (module.default && typeof module.default === 'function') {
          app.use(module.default);
        }
      }
    }
  } catch (error) {
    console.error('Erro durante o carregamento dos módulos:', error);
    // Aqui, você pode decidir como lidar com o erro, como lançá-lo novamente ou registrar em um arquivo de log.
  }
};
