import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import helloWorldReducer from './helloWorld.reducer';

export default compose(combineReducers)({
    helloWorld: helloWorldReducer,
});
