const app = "@<%= jsComponentName %>";

export interface AsyncActionType {
    BEGIN: string;
    SUCCESS: string;
    FAILURE: string;
}

export function Action(id) {
    return `${app}/${id}`;
}

export function AsyncAction(id) {
    return {
        BEGIN: `${app}/${id}/begin`,
        SUCCESS: `${app}/${id}/success`,
        FAILURE: `${app}/${id}/failure`,
    } as AsyncActionType;
}

export const HELLO = {
    WORLD: Action("hello/world"),
}
