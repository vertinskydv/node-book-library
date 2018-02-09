import {JetView} from 'webix-jet';
import {resetState} from '../services/state';
import userProvider from './../providers/user';

export default class Books extends JetView {
    config() {
        return {
            rows: [
                {
                    cols: [
                        {
                            view: 'button',
                            value: 'Add User',
                            hidden: true,
                            align: 'left',
                            height: 50,
                            width: 130
                        }
                    ]
                }
            ]
        };
    }
    async init() {
    }
}
