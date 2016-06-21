import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project
 * specific overrides. A few examples can be found below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SCHEMA_IMPORT_AREA = join(process.cwd(), this.APP_SRC, 'app', 'shared', 'schema-import-area');
  BASE_PROJECT_DIR = join(process.cwd(), this.APP_SRC, '..', '..', '..');
  BACK_SCHEMA_LOCATION_MEET = join(process.cwd(), this.APP_SRC, '..', '..', '..', 'back', 'meetup-service', 'schema');
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      { src: 'ng2-bootstrap/bundles/ng2-bootstrap', inject: 'libs' },
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
  }}
