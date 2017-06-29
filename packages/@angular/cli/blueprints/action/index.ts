import * as path from 'path';
import { dynamicPathParser, DynamicPathOptions } from '../../utilities/dynamic-path-parser';
import { getAppFromConfig } from '../../utilities/app-utils';
import { resolveModulePath } from '../../utilities/resolve-module-file';

const Blueprint = require('../../ember-cli/lib/models/blueprint');
const getFiles = Blueprint.prototype.files;

export default Blueprint.extend({
  name: 'action',
  description: '@ngrx/store actions',
  aliases: [],

  availableOptions: [
    {
      name: 'module',
      type: String, aliases: ['m'],
      description: 'Specifies where the action should be provided.'
    },
    {
      name: 'app',
      type: String,
      aliases: ['a'],
      description: 'Specifies app name to use.'
    }
  ],

  beforeInstall: function (options: any) {
    if (options.module) {
      const appConfig = getAppFromConfig(this.options.app);
      this.pathToModule =
        resolveModulePath(options.module, this.project, this.project.root, appConfig);
    }
  },

  normalizeEntityName: function (entityName: string) {
    const appConfig = getAppFromConfig(this.options.app);
    const dynamicPathOptions: DynamicPathOptions = {
      project: this.project,
      entityName,
      appConfig,
      dryRun: this.options.dryRun
    };
    const parsedPath = dynamicPathParser(dynamicPathOptions);

    this.dynamicPath = parsedPath;
    return parsedPath.name;
  },

  locals: function () {
    return {
      dynamicPath: this.dynamicPath.dir
    };
  },

  files: function () {
    let fileList = getFiles.call(this) as Array<string>;

    return fileList;
  },

  fileMapTokens: function () {
    // Return custom template variables here.
    return {
      __path__: () => {
        let dir = this.dynamicPath.dir;
        dir += path.sep + "actions";
        this.generatePath = dir;
        return dir;
      }
    };
  }
});
