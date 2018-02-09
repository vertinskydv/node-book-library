const librarianProvider = {};

librarianProvider.addNewBook = async (userData) => {
    await webix.ajax().post('/librarian/book', userData);
};


export default librarianProvider;
