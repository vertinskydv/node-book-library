const userProvider = {};

userProvider.registerUser = async (userData) => {
    await webix.ajax().post('/register', userData);
};
userProvider.login = async (userData) => {
    let res = await webix.ajax().post('/login', userData);
    return res.json();
};
userProvider.getState = async () => {
    let res = await webix.ajax().get('/state');
    return res.json();
};
userProvider.logout = async () => {
    await webix.ajax().get('/logout');
};

export default userProvider;
