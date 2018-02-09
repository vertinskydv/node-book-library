const adminProvider = {};

adminProvider.getUsers = async () => {
    const users = await webix.ajax().get('/admin/users');
    return users.json();
};
adminProvider.addNewUser = async (userData) => {
    await webix.ajax().post('/admin/user/add', userData);
};
adminProvider.updateReader = async (id, userData) => {
    await webix.ajax().patch(`/admin/user/reader/${id}`, userData);
};

export default adminProvider;
