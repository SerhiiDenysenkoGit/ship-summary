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
        return CommonService.tokenExists()
            ?
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authorization')
                }
            }
            :
            {headers: {}};
    }

    static hasAdminRole(user) {
        return user && user.role === 'ADMIN';
    }

    static hasOperatorRole(user) {
        return user && user.role === 'OPERATOR';
    }

}
