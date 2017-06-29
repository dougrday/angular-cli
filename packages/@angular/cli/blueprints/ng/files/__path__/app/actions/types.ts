const app = "<%= fullAppName %>";

export interface AsyncActionType {
    BEGIN: string;
    SUCCESS: string;
    FAILURE: string;
}

function Action(id) {
    return `${app}/${id}`;
}

function AsyncAction(id) {
    return {
        BEGIN: `${app}/${id}/begin`,
        SUCCESS: `${app}/${id}/success`,
        FAILURE: `${app}/${id}/failure`,
    } as AsyncActionType;
}

// export const TODO = {
//     NEW: Action("todo/new"),
// }
