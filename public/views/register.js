import {JetView} from 'webix-jet';
import RegisterController from '../controllers/register';
import RegisterModel from '../models/register';

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
                            id: 'registerForm',
                            css: 'register-form',
                            elements: [
                                {view: 'text', label: 'Name', name: 'name', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', label: 'Surname', name: 'surname', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', label: 'Patronymic', name: 'patronymic', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', label: 'Email', name: 'email', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', type: 'password', label: 'Password', name: 'password', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {view: 'text', type: 'password', label: 'Confirm password', name: 'password_confirm', labelWidth: 130, labelAlign: 'right', invalidMessage: 'This fiels can not be empty'},
                                {
                                    cols: [
                                        {view: 'button', value: 'Back'},
                                        {view: 'button', id: 'registerBtn', value: 'Register', type: 'form', css: 'primary'}
                                    ]
                                }
                            ],
                            rules: {
                                name: webix.rules.isNotEmpty,
                                surname: webix.rules.isNotEmpty,
                                patronymic: webix.rules.isNotEmpty,
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
    init() {
        let model = new RegisterModel();

        this._controller = new RegisterController(
            model,
            $$('registerBtn'),
            this
        );

        $$('registerBtn').attachEvent('onItemClick', () => {
            if ($$('registerForm').validate()) {
                const formData = $$('registerForm').getValues();
                this.app.callEvent('validRegister', [formData]);
            }
        });
    }
}
