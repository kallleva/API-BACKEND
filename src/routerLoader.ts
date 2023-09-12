import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Express } from 'express'; // Importe o tipo Express

console.log(' __dirname =--- >> ' + __dirname);

export const routerLoader = async (app: Express) => {
  // Tornar a função assíncrona
  const modulesPath = path.resolve(__dirname, 'modules');
  console.log(' modulesPath -->> ' + modulesPath);

  try {
    const moduleDirs = fs.readdirSync(modulesPath);

    for (const dir of moduleDirs) {
      const controllerpath = path.join(modulesPath, dir, `${dir}.controller.ts`);
      console.log(' controllerpath antes di if-->> ' + controllerpath);

      if (fs.existsSync(controllerpath)) {
        const module = await import(controllerpath);
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
