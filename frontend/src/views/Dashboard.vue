<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api, useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { LogOut, UserPlus, Trash2, Edit } from '@lucide/vue';

const users = ref<any[]>([]);
const auth = useAuthStore();
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await api.get('/admin/users', {
      headers: { Authorization: auth.token }
    });
    users.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await api.delete(`/admin/users/${id}`, {
        headers: { Authorization: auth.token }
      });
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }
};

const logout = () => {
  auth.logout();
  router.push('/login');
};

onMounted(fetchUsers);
</script>

<template>
  <div class="min-h-screen bg-surface">
    <nav class="border-b border-white/5 bg-surface-container px-xl py-md flex justify-between items-center">
      <h1 class="headline-md text-primary">DASHBOARD</h1>
      <div class="flex items-center gap-lg">
        <span class="body-md text-on-surface-variant">Operative: {{ auth.user?.name }}</span>
        <button @click="logout" class="flex items-center gap-sm text-error hover:text-error/80 transition-colors">
          <LogOut class="w-md h-md" />
          <span class="label-md">Logout</span>
        </button>
      </div>
    </nav>

    <main class="p-xl">
      <div class="flex justify-between items-end mb-xl">
        <div>
          <h2 class="headline-lg mb-xs">USER MANAGEMENT</h2>
          <p class="body-md text-on-surface-variant">Manage authorized access to the system.</p>
        </div>
        <button class="btn-primary flex items-center gap-sm">
          <UserPlus class="w-md h-md" />
          <span class="label-md">New User</span>
        </button>
      </div>

      <div class="card overflow-hidden">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-surface-container-highest border-b border-white/5">
              <th class="px-xl py-md label-md text-on-surface-variant">ID</th>
              <th class="px-xl py-md label-md text-on-surface-variant">Name</th>
              <th class="px-xl py-md label-md text-on-surface-variant">Email</th>
              <th class="px-xl py-md label-md text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="user in users" :key="user.id" class="hover:bg-white/5 transition-colors">
              <td class="px-xl py-md body-md font-mono">#{{ user.id }}</td>
              <td class="px-xl py-md body-md">{{ user.name }}</td>
              <td class="px-xl py-md body-md text-on-surface-variant">{{ user.email }}</td>
              <td class="px-xl py-md">
                <div class="flex gap-md">
                  <button class="text-primary hover:brightness-110 transition-all">
                    <Edit class="w-md h-md" />
                  </button>
                  <button @click="deleteUser(user.id)" class="text-error hover:brightness-110 transition-all">
                    <Trash2 class="w-md h-md" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
.headline-md {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}
.headline-lg {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
</style>
