<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import type { ApiResponse } from "@/model/response";
import { $api } from "@/composable/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/components/ui/toast";

const authStore = useAuthStore();
const router = useRouter();

const formSchema = toTypedSchema(
    z.object({
        name: z
            .string({ required_error: "Name is required" })
            .min(2, { message: "Name must be at least 2 characters" }),
        phone: z
            .string({ required_error: "Phone number is required" })
            .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
        email: z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email" }),
        password: z
            .string({ required_error: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" }),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (body) => {
    const res = await $api<ApiResponse>("/user/sign-up", {
        method: "POST",
        body,
    });
    if (res.status) {
        toast({
            title: "Success",
            description: "Your account has been created",
        })
        router.push({ path: "/login" });
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

        <div class="relative w-full max-w-md z-10">
            <div class="bg-white rounded-3xl p-8 shadow-2xl border border-[#CAECFF]">
                <div class="mb-8 text-center item-center">
                    <Logo />
                    <h1 class="text-2xl font-bold text-[#0099EE]">BeLaundry</h1>
                    <p class="text-[#2D9CDB] mt-2">Create Your Account</p>
                </div>

                <form @submit="onSubmit" class="space-y-6">
                    <div>
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem>
                                <FormLabel class="text-[#2D9CDB]">Full Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter your full name" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-[#CAECFF] rounded-lg text-[#2D9CDB] placeholder-[#2D9CDB]/50 focus:outline-none focus:ring-2 focus:ring-[#56E4A0]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div>
                        <FormField v-slot="{ componentField }" name="phone">
                            <FormItem>
                                <FormLabel class="text-[#2D9CDB]">Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter 10-digit phone number" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-[#CAECFF] rounded-lg text-[#2D9CDB] placeholder-[#2D9CDB]/50 focus:outline-none focus:ring-2 focus:ring-[#56E4A0]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div>
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <FormLabel class="text-[#2D9CDB]">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter email" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-[#CAECFF] rounded-lg text-[#2D9CDB] placeholder-[#2D9CDB]/50 focus:outline-none focus:ring-2 focus:ring-[#56E4A0]" />
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
                                    <Input type="password" placeholder="Create a password" v-bind="componentField"
                                        class="w-full px-4 py-3 bg-white border border-[#CAECFF] rounded-lg text-[#2D9CDB] placeholder-[#2D9CDB]/50 focus:outline-none focus:ring-2 focus:ring-[#56E4A0]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <button type="submit"
                        class="w-full py-3 px-4 bg-[#0099EE] hover:bg-[#2D9CDB] text-white rounded-lg transition-colors duration-200 font-medium">
                        Sign Up
                    </button>
                </form>

                <p class="mt-8 text-center text-sm text-[#2D9CDB]/70">
                    Already have an account?
                    <a href="/login" class="text-[#0099EE] hover:underline">Sign in</a>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-center {
    place-items: center;
}
</style>