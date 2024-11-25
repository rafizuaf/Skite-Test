<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="sticky top-0 bg-white z-10 px-4 py-3 flex items-center border-b">
            <button @click="goBack" class="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Go back">
                <ChevronLeftIcon class="h-6 w-6" />
            </button>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <!-- Product Image -->
                <div
                    class="relative w-full aspect-square bg-gradient-to-b from-white to-blue-200 rounded-lg overflow-hidden">
                    <img :src="product.image" :alt="product.name" class="w-full h-full object-contain p-8" />
                </div>

                <!-- Product Details -->
                <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <!-- Service Type -->
                    <div class="text-blue-500 font-medium mb-2">
                        {{ product.serviceType }}
                    </div>

                    <!-- Product Name and Price -->
                    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {{ product.name }}
                    </h1>
                    <p class="mt-3 text-3xl text-blue-500 font-bold">
                        ${{ product.price }}/pc
                    </p>

                    <!-- Product Description -->
                    <div class="mt-6">
                        <h2 class="sr-only">Description</h2>
                        <p class="text-gray-600 leading-relaxed">
                            {{ product.description }}
                        </p>
                    </div>

                    <!-- Quantity Selector -->
                    <div class="mt-10 flex items-center">
                        <h2 class="text-sm font-medium text-gray-900 mr-4">Quantity</h2>
                        <div class="flex items-center space-x-4">
                            <button @click="decrementQuantity"
                                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                :disabled="quantity <= 1">
                                <MinusIcon class="h-5 w-5 text-gray-600" />
                            </button>

                            <input type="number" v-model="quantity"
                                class="w-16 text-center text-xl font-medium bg-transparent" min="1" />

                            <button @click="incrementQuantity"
                                class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <PlusIcon class="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <!-- Add to Cart Button -->
                    <div class="mt-10">
                        <button type="submit"
                            class="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronLeftIcon, MinusIcon, PlusIcon } from 'lucide-vue-next'

// In Nuxt, you'd use useRoute() here
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

// Mock product data - in Nuxt you'd fetch this from your API
const product = ref({
    id: props.id,
    name: 'T-Shirt',
    price: '6.00',
    serviceType: 'Dry Clean',
    image: '/placeholder.svg?height=600&width=600',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit diam, lobortis at auctor eu, tempus eget enim. Etiam ullamcorper risus ac diam pulvinar, a auctor nunc sagittis. In euismod est est, ac pretium sem egestas eget. Nunc mollis rutrum nisi facilisia convallis. Curabitur et arcu eros. Proin eu tellus augue. Vestibulum auctor risus erat, et tempor augue euismod eget.'
})

const quantity = ref(1)

const incrementQuantity = () => {
    quantity.value++
}

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const goBack = () => {
    // In Nuxt, you'd use navigateTo or router.back()
    window.history.back()
}
</script>

<style scoped>
/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>