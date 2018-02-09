import userProvider from '../providers/user';

export default class RegisterModel {
    async registerUser(userData) {
        await userProvider.registerUser(userData);
    }
}

