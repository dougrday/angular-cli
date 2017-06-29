import { Injectable } from '@angular/core';
import { Dispatcher } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { AsyncAction } from '../actions/types';

// A fake action that (for example) triggers the loading of resources
// Instead, import your action creators from the 'actions' folder.
const LOAD = AsyncAction('<%= entityName %>/load');
const load = () => {
  return {
    type: LOAD.BEGIN
  };
};

@Injectable()
export class <%= className %> {
    /**
     * Run when the application is initialized.
     */
    @Effect() initialize$ = this.action$
      .ofType(Dispatcher.INIT)
      .map(load)
      .delay(1); // See https://github.com/ngrx/effects/issues/87

    /**
     * A sample effect that loads resources
     */
    @Effect() load$ = this.action$
      .ofType(LOAD.BEGIN)
      .switchMap(action => {
        // Load resources here

        return Observable.from([]);
      });

    constructor(
        private action$: Actions
    ) {
    }
}
