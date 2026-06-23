<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const error = ref('');

const handleRegister = async () => {
  try {
    await auth.register({ name: name.value, email: email.value, password: password.value });
    router.push('/login');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-surface px-md">
    <div class="max-w-md w-full card p-xl">
      <h1 class="headline-lg text-primary mb-lg">REGISTER</h1>
      <p class="body-md text-on-surface-variant mb-xl">Initialize new profile to begin your journey.</p>

      <form @submit.prevent="handleRegister" class="space-y-lg">
        <div class="flex flex-col">
          <label class="label-md mb-xs">Full Name</label>
          <input v-model="name" type="text" class="input-field" placeholder="Jules Verne" required />
        </div>

        <div class="flex flex-col">
          <label class="label-md mb-xs">Email Address</label>
          <input v-model="email" type="email" class="input-field" placeholder="name@domain.com" required />
        </div>

        <div class="flex flex-col">
          <label class="label-md mb-xs">Password</label>
          <input v-model="password" type="password" class="input-field" placeholder="••••••••" required />
        </div>

        <div v-if="error" class="text-error body-md bg-error-container/20 p-md border border-error/20">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary w-full">
          INITIALIZE
        </button>
      </form>

      <div class="mt-xl text-center">
        <p class="body-md text-on-surface-variant">
          Already registered? <router-link to="/login" class="text-primary hover:underline">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.headline-lg {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
</style>
