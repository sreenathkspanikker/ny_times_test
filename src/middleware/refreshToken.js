// @/src/common/refreshToken.js
import mem from "mem";
import { GET_VALUES } from './';
import { registration } from './axiosManager'

const refreshTokenFn = async () => {
    const session = JSON.parse(GET_VALUES('persist:root'));
    const auth = JSON.parse(GET_VALUES('user'));

    try {
        const response = await registration.post("/login", auth);

        const session = response;

        if (!session?.access_token) {
            localStorage.removeItem("session");
            localStorage.removeItem("user");
        }

        localStorage.setItem("session", JSON.stringify(session));

        return session;
    } catch (error) {
        localStorage.removeItem("persist:root");
        localStorage.removeItem("user");
    }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
    maxAge,
});