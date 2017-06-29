import { Action } from '@ngrx/store';
import * as ActionTypes from '../actions/types';

export interface HelloWorldState {
  message: string;
}

const initialState: HelloWorldState = {
    message: ''
};

export default function (state = initialState, action: Action): HelloWorldState {
    switch (action.type) {
        case ActionTypes.HELLO.WORLD: {
            return Object.assign({}, { message: action.payload });
        }
        default: {
            return state;
        }
    }
}
