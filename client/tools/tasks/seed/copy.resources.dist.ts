import * as gulp from 'gulp';
import { join } from 'path';

import { S3_DEST, PROD_DEST } from '../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp`
 * directory.
 */
export = () => {
  return gulp.src([
      join(PROD_DEST, '**/*.*'),
    ])
    .pipe(gulp.dest(S3_DEST));
};
