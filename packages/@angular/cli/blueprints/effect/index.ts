import * as chalk from 'chalk';
import * as path from 'path';
import { oneLine } from 'common-tags';
import { dynamicPathParser, DynamicPathOptions } from '../../utilities/dynamic-path-parser';
import { getAppFromConfig } from '../../utilities/app-utils';
import { resolveModulePath } from '../../utilities/resolve-module-file';

const Blueprint = require('../../ember-cli/lib/models/blueprint');
const stringUtils = require('ember-cli-string-utils');
const getFiles = Blueprint.prototype.files;

export default Blueprint.extend({
  name: 'effect',
  description: '@ngrx/store effects',
  aliases: [],

  availableOptions: [
    {
      name: 'module',
      type: String, aliases: ['m'],
      description: 'Specifies where the effect should be provided.'
    },
    {
      name: 'app',
      type: String,
      aliases: ['a'],
      description: 'Specifies app name to use.'
    }
  ],

  afterInstall: function (options: any) {
    const className = stringUtils.classify(`${options.entity.name}Effects`);
    const warningMessage = oneLine`
      Effect is generated, but must be run using EffectsModule.run(${className}) in your application module.
    `;
    this._writeStatusToUI(chalk.yellow, 'WARNING', warningMessage);
  },

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

  locals: function (options: any) {
    return {
      className: stringUtils.classify(`${options.entity.name}Effects`),
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
        dir += path.sep + "effects";
        this.generatePath = dir;
        return dir;
      }
    };
  }
});
