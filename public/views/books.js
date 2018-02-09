import {JetView} from 'webix-jet';


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
                        }
                    ]
                },
                {
                    view: 'datatable',
                    columns: [
                        {id: 'title', header: 'Book', fillspace: true}
                    ]
                }
            ]
        };
    }
    async init() {
        $$('addBookBtn').attachEvent('onItemClick', () => {
            this.app.show('/top/addbook');
        });
    }
}
