import AuthContract from "../contracts/AuthContract";
import LoginContract from "../contracts/LoginContract";
import httpRequest from "../httpRequest";

const ROUTE_PREFIX = 'Auth'
const authService = {
    ready: () => httpRequest.get('HealthCheck/Ready'),
    login: async (email: string, password: string) => {
        const loginContract: LoginContract = { email, password }
        return await httpRequest.post<AuthContract>(`${ROUTE_PREFIX}/login`, loginContract);
    }
}

export default authService;