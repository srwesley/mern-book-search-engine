// Use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// Creates a new class to instantiate for a user
class AuthService {
    // Gets user data
    getProfile() {
        return decode(this.getToken());
    }

    // Checks if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // Handwaiving here
    }

    // Checks if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
        window.location.assign("/");
    }

    logout() {
        // Clears user token and profile data from localStorage
        localStorage.removeItem("id_token");
        // This will reload the page and reset the state of the application
        window.location.assign("/");
    }
}

export default new AuthService();