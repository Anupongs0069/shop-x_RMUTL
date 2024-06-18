import UserProfileContract from "../contracts/UserProfileContract";
import httpRequest from "../httpRequest"

const ROUTE_PREFIX = 'Users';
const userService = {
    getProfile: () => httpRequest.get<UserProfileContract>(`${ROUTE_PREFIX}/Profile`)
}

export default userService;