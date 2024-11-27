<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type { ApiResponse } from "@/model/response";
import { $api } from "@/composable/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/components/ui/toast";

const authStore = useAuthStore();
const router = useRouter();

const isAdmin = ref(true);

const formSchema = toTypedSchema(
    z.object({
        email: z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email" }),
        password: z.string(),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (body) => {
    const res = await $api<ApiResponse>("/user/sign-in", {
        method: "POST",
        body,
    });
    if (res.status) {
        authStore.setToken(res.response);
        authStore.setIsAdmin(isAdmin.value);
        const userInfo = await $api<ApiResponse>("/user/info", {
            method: "GET",
            headers: {
                token: res.response,
            },
        });

        if (userInfo.status) {
            toast({
                title: "Success",
                description: `Welcome back ${userInfo.response.name}`,
            })
            authStore.setUser(userInfo.response);
            router.push({ path: isAdmin.value ? "/" : "/mobile" });
        }
    }
});
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-[#E7F5FD] relative overflow-hidden">
        <div class="absolute inset-0 opacity-50 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 810"
                preserveAspectRatio="xMinYMin slice">
                <defs>
                    <pattern id="bgPattern" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="rgba(202,236,255,0.3)" />
                        <path d="M40 40 L80 40 L80 80 L40 80 Z" fill="rgba(202,236,255,0.3)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bgPattern)" />
            </svg>
        </div>

        <div class="relative w-full max-w-md">
            <div class="bg-white rounded-3xl p-8 shadow-2xl border border-[#CAECFF]">
                <div class="mb-8 text-center item-center">
                    <Logo />
                    <h1 class="text-2xl font-bold text-[#0099EE]">BeLaundry</h1>
                </div>

                <form @submit="onSubmit" class="space-y-6">
                    <div>
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <FormLabel class="text-[#2D9CDB]">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter email" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-white rounded-lg text-[#2D9CDB] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div>
                        <FormField v-slot="{ componentField }" name="password">
                            <FormItem>
                                <FormLabel class="text-[#2D9CDB]">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-white rounded-lg text-[#2D9CDB] placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <a href="#" class="block text-sm text-[#2D9CDB]/70 hover:text-[#2D9CDB] mt-2">Forgot
                            Password?</a>
                    </div>
                    <div class="text-[#2D9CDB] flex items-center space-x-2">
                        <Switch class="bg-transparent" id="is-admin" :checked="isAdmin"
                            @update:checked="(e) => (isAdmin = e)" />
                        <Label for="is-admin">{{
                            `Log In as ${isAdmin ? "Admin" : "User"}`
                        }}</Label>
                    </div>

                    <button type="submit"
                        class="w-full py-3 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium">
                        Sign in
                    </button>
                </form>

                <p class="mt-8 text-center text-sm text-[#2D9CDB]/70">
                    Don't have an account?
                    <a href="/register" class="text-[#2D9CDB] hover:underline">Register for free</a>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.label-login {
    color: white;
}

.item-center {
    place-items: center;
}
</style>