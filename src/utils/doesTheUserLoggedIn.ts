export function doesTheUserLoggedIn(): boolean {
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    return storedRole === null && storedToken === null;
}