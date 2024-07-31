export function checkRole(role: string): boolean {
    const storedRole = localStorage.getItem('role');
    return storedRole === role;
}