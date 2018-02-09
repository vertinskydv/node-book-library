import userProvider from './../providers/user';

let state = null;

const getState = async () => {
    if (state) {
        return state;
    }
    const user = await userProvider.getState();
    state = {};
    state.user = Object.freeze(user);
    return state;
};

const resetState = () => {
    state = null;
};

export {getState, resetState};
