import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const clearFileName = (file: string): string => file.replace('.ts', '');

const loadRouters = async () => {
  const files = readdirSync(PATH_ROUTER).filter( (file) => clearFileName(file) !== 'index' );

  const modules = await Promise.all( files.map( (file) => import( `./${ clearFileName(file) }` ) ) );

  modules.forEach( (module, index) => {
    const cleanName = clearFileName(files[index]);
    
    router.use(`/${cleanName}`, module.default);
  });
}
loadRouters();

export { router };