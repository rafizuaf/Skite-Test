import { useAuthStore } from "@/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated, isAdmin } = useAuthStore();

    if (isAuthenticated && from.path === "/login" && to.path !== "/" && isAdmin) {
        return navigateTo("/");
    }
    if (
        isAuthenticated &&
        from.path === "/login" &&
        to.path !== "/mobile" &&
        !isAdmin
    ) {
        return navigateTo("/mobile");
    }
    if (!isAuthenticated && to.path !== "/login") {
        return navigateTo("/login");
    }
});