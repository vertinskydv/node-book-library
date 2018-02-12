import {JetView} from 'webix-jet';
import librarianProvider from '../providers/librarian';


export default class AddBook extends JetView {
    config() {
        return {
            rows: [
                {
                    height: 1
                },
                {
                    cols: [
                        {},
                        {
                            view: 'form',
                            borderless: true,
                            width: 800,
                            id: 'newBookForm',
                            css: 'register-form',
                            elements: [
                                {
                                    cols: [
                                        {
                                            rows: [
                                                {view: 'text', label: 'Name', name: 'name', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Author Name', name: 'authorName', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Author Surname', name: 'authorSurname', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Patronymic', name: 'authorPatronymic', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Publishing House', name: 'publishingHouse', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Publishing Country', name: 'publishingCountry', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Genre', name: 'genre', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Year', name: 'year', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Pages count', name: 'pagesCount', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                                {view: 'text', label: 'Quantity', name: 'quantity', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'}
                                            ]
                                        },
                                        {
                                            rows: [
                                                {view: 'uploader', label: 'Upload Book Cover', name: 'cover', labelWidth: 130, labelAlign: 'right', multiple: 'false', link: 'bookCoverUploader', upload: '/librarian/upload/cover'},
                                                {view: 'list', id: 'bookCoverUploader', type: 'uploader', autoheight: true, borderless: true},
                                                {view: 'uploader', label: 'Upload Electronic Book', name: 'eBook', labelWidth: 130, labelAlign: 'right', multiple: 'false', link: 'eBookUploader', upload: '/librarian/upload/ebook'},
                                                {view: 'list', id: 'eBookUploader', type: 'uploader', autoheight: true, borderless: true},
                                                {view: 'uploader', label: 'Upload Audio Book', name: 'audioBook', labelWidth: 130, labelAlign: 'right', multiple: 'false', link: 'audioBookUploader', upload: '/librarian/upload/audiobook'},
                                                {view: 'list', id: 'audioBookUploader', type: 'uploader', autoheight: true, borderless: true}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    cols: [
                                        {view: 'button', value: 'Back', id: 'backBtn'},
                                        {view: 'button', id: 'addNewBookBtn', value: 'Add new book', type: 'form', css: 'primary'}
                                    ]
                                }

                            ],
                            rules: {
                                name: webix.rules.isNotEmpty,
                                authorName: webix.rules.isNotEmpty,
                                authorSurname: webix.rules.isNotEmpty,
                                authorPatronymic: webix.rules.isNotEmpty,
                                publishingHouse: webix.rules.isNotEmpty,
                                publishingCountry: webix.rules.isNotEmpty,
                                genre: webix.rules.isNotEmpty,
                                year: webix.rules.isNumber,
                                pagesCount: webix.rules.isNumber,
                                cover: webix.rules.isNotEmpty,
                                quantity: webix.rules.isNotEmpty
                            }
                        },
                        {}
                    ]
                }
            ]
        };
    }
    async init() {
        $$('addNewBookBtn').attachEvent('onItemClick', () => {
            if ($$('newBookForm').validate()) {
                const formData = $$('newBookForm').getValues();
                librarianProvider.addNewBook(formData);
            }
        });
    }
}
