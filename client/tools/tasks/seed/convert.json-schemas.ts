import * as gulp from 'gulp';
import { join } from 'path';

import {SCHEMA_IMPORT_AREA, PROJECT_TASKS_DIR, APP_BASE} from '../../config';
var jsonConverter = require('json-schema-to-typescript');

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp`
 * directory.
 */
export = () => {
  console.log('Using dest location of: '+ SCHEMA_IMPORT_AREA);
  console.log('Using example location of: '+ PROJECT_TASKS_DIR);
  console.log('Using example location of: '+ APP_BASE);
  let convertSource = join(SCHEMA_IMPORT_AREA, '*.1.schema.json');
  let targetOutput = join(SCHEMA_IMPORT_AREA, 'foo.d.ts');

  //gulp method
  return gulp.src(convertSource)
  .pipe(gulp.dest(targetOutput,  jsonConverter.compileFromFile(convertSource)));
};
