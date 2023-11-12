// Route to get logged in user's ingo (needs the token)
export const getMe = (token) => {
    return fetch("/api/users/me", {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
};

// Saves book data for a logged in user
export const saveBook = (bookData, token) => {
    return fetch("/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
    });
};

// Removes saved book data for a logged in user
export const deleteBook = (bookId, token) => {
    return fetch(`/api/users/books/${bookId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

// Make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};