import {JetApp} from 'webix-jet';

webix.ready(async () => {
    let appConfig = {
        start: '/login',
        debug: true,
        views: {
            register: 'register',
            main: 'main',
            users: 'users',
            newuser: 'newUser',
            addbook: 'addBook'
        }
    };

    let app = new JetApp(appConfig);
    app.render();

    webix.attachEvent('onAjaxError',
        (xhr) => {
            webix.message({
                type: 'error',
                text: xhr.responseText
            });
            if (xhr.status === 401 || xhr.status === 403) {
                if (window.location.hash !== '#!/login') {
                    window.location = '/';
                }
            }
        }
    );
});

