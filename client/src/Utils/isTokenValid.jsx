export const isTokenValid =  () => {
    const token = localStorage.getItem("token");
    return JSON.parse(token);
}