<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const error = ref('');

const handleLogin = async () => {
  try {
    await auth.login({ email: email.value, password: password.value });
    router.push('/admin');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-surface px-md">
    <div class="max-w-md w-full card p-xl">
      <h1 class="headline-lg text-primary mb-lg">LOGIN</h1>
      <p class="body-md text-on-surface-variant mb-xl">Welcome back. Enter your credentials to access the terminal.</p>

      <form @submit.prevent="handleLogin" class="space-y-lg">
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
          AUTHORIZE
        </button>
      </form>

      <div class="mt-xl text-center">
        <p class="body-md text-on-surface-variant">
          New operative? <router-link to="/register" class="text-primary hover:underline">Register here</router-link>
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
