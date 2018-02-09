export default class RegisterController {
    constructor(model, loginBtn, view) {
        this._model = model;
        this._registerBtn = loginBtn;
        this._view = view;

        this._init();
    }

    _init() {
        this._view.on(this._view.app, 'validRegister', async (formData) => {
            await this._model.registerUser(formData);
        });
    }
}
