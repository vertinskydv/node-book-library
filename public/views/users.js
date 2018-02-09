import {JetView} from 'webix-jet';
import CONSTS from '../global/consts';
import adminProvider from '../providers/admin';
import {getState} from '../services/state';

export default class Users extends JetView {
    config() {
        return {
            rows: [
                {
                    cols: [
                        {
                            view: 'button',
                            id: 'addUserBtn',
                            value: 'Add User',
                            hidden: true,
                            align: 'left',
                            height: 50,
                            width: 130
                        },
                        {}
                    ]
                },
                {
                    cols: [
                        {
                            view: 'datatable',
                            editable: true,
                            editaction: 'dblclick',
                            id: 'usersTable',
                            select: 'row',
                            on: {
                                onBeforeLoad() {
                                    this.showOverlay('Loading...');
                                },
                                onAfterLoad() {
                                    this.hideOverlay();
                                }
                            },
                            columns: [
                                {id: 'name', header: 'Name', fillspace: 1, editor: 'text'},
                                {id: 'surname', header: 'Surname', fillspace: 1, editor: 'text'},
                                {id: 'patronymic', header: 'Patronymic', fillspace: 1, editor: 'text'},
                                {id: 'email', header: 'Email', fillspace: 1, editor: 'text'},
                                {
                                    id: 'role',
                                    header: 'Role',
                                    fillspace: 1,
                                    template(data) {
                                        console.log(CONSTS.ROLES_LABELS[data.role]);
                                        return CONSTS.ROLES_LABELS[data.role];
                                    },
                                    editor: 'select',
                                    options: CONSTS.ROLES
                                }
                            ],
                            save: '/admin/user/update'
                        },
                        {
                            view: 'property',
                            id: 'readerData',
                            width: 400,
                            elements: [
                                {label: 'Additional reader data', type: 'label'},
                                {label: 'Passport Number', type: 'text', id: 'passportNum'},
                                {
                                    label: 'Date of Birth',
                                    type: 'date',
                                    id: 'birthDate',
                                    format(date) {
                                        return webix.Date.dateToStr(CONSTS.DATE_FORMAT)(date);
                                    }
                                },
                                {label: 'Address', type: 'text', id: 'address'},
                                {label: 'Phone 1', type: 'text', id: 'phone'},
                                {label: 'Phone 2', type: 'text', id: 'phone2'},
                                {label: 'Phone 3', type: 'text', id: 'phone3'},
                                {label: 'Phone 4', type: 'text', id: 'phone4'},
                                {label: 'Reader Card Number', type: 'text', id: 'readerСard'}
                            ]
                        }
                    ]
                }
            ]
        };
    }
    async init() {
        let STATE = await getState();
        let USER = STATE.user;
        const datatable = $$('usersTable');
        const property = $$('readerData');
        let rowReaderId;
        property.disable();

        const users = await adminProvider.getUsers();
        users.forEach((user) => {
            user.role = user.role.name;
        });
        datatable.parse(users);

        if (USER.role.name === 'admin') {
            $$('addUserBtn').show();
        }
        $$('addUserBtn').attachEvent('onItemClick', () => {
            this.app.show('/top/newuser');
        });

        datatable.attachEvent('onAfterSelect', (data) => {
            const row = datatable.getItem(data.id);
            if (row.reader) {
                rowReaderId = row.reader.id;
                property.enable();
                property.define('url', `admin/user/reader/${row.reader.id}`);
                property.refresh();
            }
            else {
                rowReaderId = null;
                property.disable();
            }
        });

        property.attachEvent('onAfterEditStop', (state, editor) => {
            if (rowReaderId && (state.value !== state.old)) {
                adminProvider.updateReader(rowReaderId, {[editor.id]: state.value});
            }
        });
    }
}
