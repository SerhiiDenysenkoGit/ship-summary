export class CommonService {

    static tokenExists() {
        const token = localStorage.getItem('authorization');
        return token != null && token !== undefined && token.length > 10;
    }

    static addToken(token) {
        localStorage.setItem('authorization', token);
    }

    static resetToken() {
        localStorage.removeItem('authorization');
    }

    static getToken() {
        localStorage.getItem('authorization');
    }

    static getAuthHeaders() {
        return CommonService.tokenExists() ? {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            }
        } : {headers: {}};

    }

    static hasAdminRole(user) {
        return user.role === 'ADMIN';
    }

    static hasOperatorRole(user) {
        return user.role === 'OPERATOR';
    }

    static formatDate(date) {
        const inputDate = new Date(date);
        let result = inputDate.getFullYear() + '-';
        result += (inputDate.getMonth() < 9 ? '0' + (inputDate.getMonth() + 1) : (inputDate.getMonth() + 1)) + "-";
        result += inputDate.getDate() < 10 ? '0' + (inputDate.getDate()) : (inputDate.getDate());
        return result;
    }

    static setLanguage(value) {
        localStorage.setItem('lang', value);
    }

    static getLanguage() {
        return localStorage.getItem('lang');
    }
}
