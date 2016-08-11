"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require('path');
var seed_config_1 = require('./seed.config');
var ProjectConfig = (function (_super) {
    __extends(ProjectConfig, _super);
    function ProjectConfig() {
        _super.call(this);
        this.PROJECT_TASKS_DIR = path_1.join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
        this.NPM_DEPENDENCIES = this.NPM_DEPENDENCIES.concat([
            { src: 'font-awesome/css/font-awesome.min.css', inject: true },
            { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }
        ]);
        this.APP_ASSETS = this.APP_ASSETS.slice();
    }
    return ProjectConfig;
}(seed_config_1.SeedConfig));
exports.ProjectConfig = ProjectConfig;
//# sourceMappingURL=/home/peter/slsplay/client/ts-node/b006a371d87f1e3e3b2975eacdae63babe4e364f/b1cdda39b7363f32651cf1d13b0e292f5761583c.js.map