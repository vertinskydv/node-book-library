const librarianProvider = {};

librarianProvider.addNewBook = async (userData) => {
    await webix.ajax().post('/librarian/book', userData);
};

librarianProvider.removeBooks = async (userData) => {
    await webix.ajax().del('/librarian/book', userData);
};


export default librarianProvider;
