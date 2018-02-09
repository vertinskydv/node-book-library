import {JetView} from 'webix-jet';
import {getState} from '../services/state';
import userProvider from './../providers/user';

export default class TopView extends JetView {
    config() {
        return {
            rows: [
                {
                    view: 'toolbar',
                    id: 'mainToolbar',
                    height: 50,
                    css: 'main_toolbar',
                    cols: [
                        {},
                        {
                            view: 'button',
                            id: 'userBtn',
                            popup: 'userPopup',
                            autowidth: true,
                            type: 'icon',
                            icon: 'user'
                        }
                    ]
                },
                {$subview: true}
            ]

        };
    }
    async init() {
        let STATE = await getState();
        let USER = STATE.user;
        $$('userBtn').define('label', `${USER.name} ${USER.surname}`);
        $$('userBtn').refresh();

        function logout() {
            userProvider.logout();
            window.location = '/';
        }

        this.ui({
            view: 'popup',
            id: 'userPopup',
            css: 'toolbar-user-popup',
            padding: 0,
            on: {
                onBeforeShow() {
                    let data = [];
                    data.push({id: 'logout', icon: 'webix_icon fa-sign-out', label: 'Logout'});
                    this.getBody().parse(data);
                }
            },
            body: {
                view: 'list',
                template: "<span class='#icon#'></span>#label#",
                borderless: true,
                scroll: false,
                autoheight: true,
                on: {
                    onItemClick(id) {
                        switch (id) {
                            case 'logout':
                                logout();
                                break;
                            default: throw new Error('invalid action');
                        }
                    }
                }
            }
        });
    }
}
