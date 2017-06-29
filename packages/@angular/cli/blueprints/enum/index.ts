import {getAppFromConfig} from '../../utilities/app-utils';
import {dynamicPathParser, DynamicPathOptions} from '../../utilities/dynamic-path-parser';
import * as path from 'path';

const stringUtils = require('ember-cli-string-utils');
const Blueprint = require('../../ember-cli/lib/models/blueprint');

export default Blueprint.extend({
  name: 'enum',
  description: '',
  aliases: ['e'],

  availableOptions: [
    {
      name: 'app',
      type: String,
      aliases: ['a'],
      description: 'Specifies app name to use.'
    }
  ],

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
    this.fileName = stringUtils.dasherize(options.entity.name);

    return {
      dynamicPath: this.dynamicPath.dir,
      flat: options.flat,
      fileName: this.fileName
    };
  },

  fileMapTokens: function () {
    // Return custom template variables here.
    return {
      __path__: () => {
        this.generatePath = this.dynamicPath.dir + path.sep + "constants";
        return this.generatePath;
      },
      __name__: () => {
        return this.fileName;
      }
    };
  }
});
