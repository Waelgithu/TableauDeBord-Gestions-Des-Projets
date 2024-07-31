export function stockTokenRole(token: any, role: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
}
export function deleteTokenRole() {
    localStorage.clear();
} 