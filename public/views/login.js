import {JetView} from 'webix-jet';
import {resetState} from '../services/state';
import userProvider from './../providers/user';

export default class RegisterView extends JetView {
    config() {
        return {
            rows: [
                {
                    height: 170
                },
                {
                    cols: [
                        {},
                        {
                            view: 'form',
                            borderless: true,
                            maxWidth: 400,
                            id: 'loginForm',
                            elements: [
                                {view: 'text', label: 'Email', name: 'email', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', type: 'password', label: 'Password', name: 'password', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {
                                    cols: [
                                        {view: 'button', id: 'loginBtn', value: 'Login', css: 'primary'}
                                    ]
                                }
                            ],
                            rules: {
                                email: webix.rules.isNotEmpty,
                                password: webix.rules.isNotEmpty
                            }
                        },
                        {}
                    ]
                }
            ]
        };
    }
    async init() {
        resetState();
        $$('loginBtn').attachEvent('onItemClick', async () => {
            if ($$('loginForm').validate()) {
                let formValues = $$('loginForm').getValues();
                try {
                    let user = await userProvider.login(formValues);
                    switch (user.role.name) {
                        case 'admin':
                            this.app.show('/top/users');
                            break;
                        case 'librarian':
                            this.app.show('/top/books');
                            break;
                        default:
                            throw new Error('Role not defined');
                    }
                }
                catch (err) {
                    if (err.status === 401) {
                        webix.message('incorrect auth data');
                    }
                }
            }
        });
    }
}
