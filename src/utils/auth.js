import { jwtDecode } from "jwt-decode";

export const checkAdminStatus = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    console.log(decodedToken)
    return decodedToken.role === "ROLE_ADMIN"; // Проверяем, что роль в токене - администратор

  } catch (e) {
    console.error("Token decode error:", e);
    return false;
  }
};
