export const loadUserData = () => {
    try {
        const objected = JSON.parse(localStorage.getItem("userData"));
        return objected;
    } catch (error) {
        console.error(error);
    }
};

export const saveUserData = (data) => {
    try {
        const jsoned = JSON.stringify(data);
        localStorage.setItem("userData", jsoned);
    } catch (error) {
        console.error(error);
    }
};

export const removeUserData = () => {
    try {
        localStorage.removeItem("userData");
    } catch (error) {
        console.error(error);
    }
};
