import { Injectable } from '@angular/core';
import { Dispatcher } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class <%= className %> {
    /**
     * Run when the application is initialized.
     */
    @Effect() initialize$ = this.action$
        .ofType(Dispatcher.INIT)
        .map(/* insert action creator here */)
        .delay(1); // See https://github.com/ngrx/effects/issues/87

    constructor(
        private action$: Actions
    ) {
    }
}
