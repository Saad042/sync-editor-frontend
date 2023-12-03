<template>
  <div class="container text-center vh-100">
    <div v-if="!isLoading">
      <div class="row mt-4" v-for="text in texts" :key="text.id">
        <div class="col offset-4">
          <div style="max-width: 20rem" class="card mb-2">
            <div class="card-body">
              <p class="card-text">
                {{ text.dialogue }}
              </p>
              <button
                type="button"
                class="btn btn-primary m-4"
                @click="handleNavigation(text._id, true)"
              >
                View
              </button>
              <button
                type="button"
                class="btn btn-primary m-4"
                @click="handleNavigation(text._id)"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getDocs } from '../services/index';
import { useToast, POSITION } from 'vue-toastification';

import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const texts = ref([]);
    let isLoading = ref(true);

    onMounted(() => {
      fetchListing();
    });

    const toast = useToast();
    const fetchListing = async () => {
      try {
        const resp = await getDocs();
        texts.value = resp.data;
      } catch (error) {
        console.log(error);
        toast.error('Error fetching listings', {
          timeout: 2000,
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      }
      isLoading.value = false;
    };

    const router = useRouter();
    const handleNavigation = (id, isView) => {
      if (isView) {
        router.push({ name: 'view', params: { id } }).catch((err) => {
          console.log(err);
        });
      } else {
        router.push({ name: 'edit', params: { id } }).catch((err) => {
          console.log(err);
        });
      }
    };
    return { texts, isLoading, handleNavigation };
  },
};
</script>
