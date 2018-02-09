import {JetView} from 'webix-jet';
import CONSTS from '../global/consts';
import adminProvider from '../providers/admin';

export default class AddNewUser extends JetView {
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
                            maxWidth: 400,
                            id: 'newUserForm',
                            css: 'register-form',
                            elements: [
                                {rows: [
                                    {view: 'text', label: 'Name', name: 'name', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                    {view: 'text', label: 'Surname', name: 'surname', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                    {view: 'text', label: 'Patronymic', name: 'patronymic', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                    {view: 'select', label: 'Role', name: 'role', id: 'roleSelect', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty', options: CONSTS.ROLES}
                                ]},
                                {
                                    id: 'readerDataformSection',
                                    hidden: true,
                                    disabled: true,
                                    rows: [
                                        {view: 'text', label: 'Passport Number', name: 'passportNum', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                        {view: 'datepicker', label: 'Date of Birth', name: 'birthDate', format: CONSTS.DATE_FORMAT, labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                        {view: 'text', label: 'Address', name: 'address', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                        {view: 'text', label: 'Phone 1', name: 'phone', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                        {view: 'text', label: 'Phone 2', name: 'phone2', labelWidth: 130, labelAlign: 'right'},
                                        {view: 'text', label: 'Phone 3', name: 'phone3', labelWidth: 130, labelAlign: 'right'},
                                        {view: 'text', label: 'Phone 4', name: 'phone4', labelWidth: 130, labelAlign: 'right'},
                                        {view: 'text', label: 'Reader Card Number', name: 'readerСard', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'}
                                    ]
                                },
                                {rows: [
                                    {view: 'text', label: 'Email', name: 'email', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                    {view: 'text', type: 'password', label: 'Password', name: 'password', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                    {view: 'text', type: 'password', label: 'Confirm password', name: 'password_confirm', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'}
                                ]},
                                {
                                    cols: [
                                        {view: 'button', value: 'Back', id: 'backBtn'},
                                        {view: 'button', id: 'addNewUserBtn', value: 'Add new user', type: 'form', css: 'primary'}
                                    ]
                                }
                            ],
                            rules: {
                                name: webix.rules.isNotEmpty,
                                surname: webix.rules.isNotEmpty,
                                patronymic: webix.rules.isNotEmpty,
                                passportNum: webix.rules.isNotEmpty,
                                birthDate: webix.rules.isNotEmpty,
                                address: webix.rules.isNotEmpty,
                                phone: webix.rules.isNotEmpty,
                                readerСard: webix.rules.isNotEmpty,
                                email: webix.rules.isNotEmpty,
                                password: webix.rules.isNotEmpty,
                                password_confirm: webix.rules.isNotEmpty
                            }
                        },
                        {}
                    ]
                }
            ]
        };
    }
    async init() {
        function swithReaderDataSection(role) {
            if (role !== 'reader') {
                $$('readerDataformSection').hide();
                $$('readerDataformSection').disable();
            }
            else {
                $$('readerDataformSection').show();
                $$('readerDataformSection').enable();
            }
        }

        swithReaderDataSection($$('roleSelect').getValue());

        $$('roleSelect').attachEvent('onChange', swithReaderDataSection);

        $$('backBtn').attachEvent('onitemClick', async () => {
            window.history.back();
        });

        $$('addNewUserBtn').attachEvent('onItemClick', async () => {
            if ($$('newUserForm').validate()) {
                const formData = $$('newUserForm').getValues();
                Object.keys(formData).forEach((key) => {
                    if (!formData[key]) {
                        delete formData[key];
                    }
                });
                await adminProvider.addNewUser(formData);
                this.app.show('/top/users');
            }
        });
    }
}
