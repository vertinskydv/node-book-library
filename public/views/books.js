import {JetView} from 'webix-jet';
import librarianProvider from '../providers/librarian';


export default class Books extends JetView {
    config() {
        return {
            rows: [
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'addBookBtn',
                            value: 'Add New Book',
                            align: 'left',
                            height: 50,
                            width: 130
                        },
                        {
                            view: 'button',
                            id: 'removeBookBtn',
                            value: 'Remove Book',
                            align: 'left',
                            disabled: true,
                            height: 50,
                            width: 130
                        }
                    ]
                },
                {
                    view: 'datatable',
                    id: 'bookTable',
                    rowHeight: 100,
                    select: 'row',
                    multiselect: true,
                    columns: [
                        {id: 'name', header: 'Name', fillspace: true},
                        {
                            id: 'coverUrl',
                            header: 'Cover',
                            fillspace: true,
                            template: "<a href='#coverUrl#'><img class='cell-img' src='#coverUrl#'/></a>"
                        },
                        {id: 'quantity', header: 'Quantity', fillspace: true},
                        {id: 'authorName', header: 'Author Name', fillspace: true},
                        {id: 'authorSurname', header: 'Author Surname', fillspace: true},
                        {id: 'authorPatronymic', header: 'Author Patronymic', fillspace: true},
                        {id: 'authorPatronymic', header: 'Name Surname', fillspace: true},
                        {id: 'publishingHouse', header: 'Publishing', fillspace: true},
                        {id: 'publishingCountry', header: 'Country', fillspace: true},
                        {id: 'genre', header: 'Genre', fillspace: true},
                        {
                            header: 'E-Book',
                            fillspace: true,
                            template(data) {
                                if (data.mediaFile && data.mediaFile.eBook) {
                                    return `<a href='${data.mediaFile.eBook}'>link</a>`;
                                }
                                return 'NONE';
                            }
                        },
                        {
                            header: 'Audio',
                            fillspace: true,
                            template(data) {
                                if (data.mediaFile && data.mediaFile.audioBook) {
                                    return `<a href='${data.mediaFile.audioBook}'>link</a>`;
                                }
                                return 'NONE';
                            }
                        }
                    ],
                    url: '/librarian/books'
                }
            ]
        };
    }
    async init() {
        $$('addBookBtn').attachEvent('onItemClick', () => {
            this.app.show('/top/addbook');
        });

        $$('bookTable').attachEvent('onAfterSelect', () => {
            $$('removeBookBtn').enable();
        });

        $$('removeBookBtn').attachEvent('onItemClick', async (data, preserve) => {
            let ids = $$('bookTable').getSelectedId(true, true);
            debugger;
            await librarianProvider.removeBooks({ids: ids});
        });
    }
}
