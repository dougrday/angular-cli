import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Effect, Actions } from '@ngrx/effects';
import { Dispatcher } from '@ngrx/store';
import { HELLO } from '../actions/types';
import { helloWorld } from "../actions/helloWorld.actions";

@Injectable()
export class HelloWorldEffects {
    /**
     * Dispatch an action to update the "hello world!" message on initialization.
     */
    @Effect() initialize$ = this.action$
        .ofType(Dispatcher.INIT)
        .map(helloWorld)
        .delay(1); // See https://github.com/ngrx/effects/issues/87

    constructor(
        private action$: Actions
    ) {
    }
}
