import { DIST_DIR, S3_DEST } from '../../config';
import { clean } from '../../utils';

/**
 * Executes the build process, cleaning all files within the `/dist` directory.
 */
export = clean([DIST_DIR, S3_DEST]);
