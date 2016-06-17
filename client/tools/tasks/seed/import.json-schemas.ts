import * as gulp from 'gulp';
import { join } from 'path';

import { BACK_SCHEMA_LOCATION_MEET, SCHEMA_IMPORT_AREA, PROJECT_TASKS_DIR, APP_BASE} from '../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp`
 * directory.
 */
export = () => {
  console.log('Using source location of: '+ BACK_SCHEMA_LOCATION_MEET);
  console.log('Using dest location of: '+ SCHEMA_IMPORT_AREA);
  console.log('Using example location of: '+ PROJECT_TASKS_DIR);
  console.log('Using example location of: '+ APP_BASE);
  return gulp.src([
      join(BACK_SCHEMA_LOCATION_MEET, '**/*.1.schema.json'),
    ])
    .pipe(gulp.dest(SCHEMA_IMPORT_AREA));
};
