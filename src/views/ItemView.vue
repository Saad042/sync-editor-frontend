<template>
  <div class="container text-center vh-100">
    <div v-if="!isLoading" class="row mt-4">
      <div class="col offset-4">
        <div style="max-width: 20rem" class="card mb-2">
          <div class="card-body"></div>
          <label>Dialogue</label>
          <div class="input-group input-group-sm mb-3">
            <textarea
              v-model="text.dialogue"
              class="form-control m-2"
              disabled
              placeholder="Dialogue: "
            />
          </div>
          <label>Mood</label>
          <div class="input-group input-group-sm mb-3">
            <textarea
              v-model="text.mood"
              class="form-control m-2"
              disabled
              placeholder="Mood: "
            />
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createWebSocketConnection, getDoc } from '../services/index';
import { useToast, POSITION } from 'vue-toastification';

import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const text = ref({
      id: '',
      dialogue: '',
      mood: '',
    });
    let isLoading = ref(true);

    const route = useRoute();

    const ws = createWebSocketConnection();

    ws.onopen = () => {
      ws.send(JSON.stringify({}));
    };
    ws.onmessage = (payload) => {
      try {
        const data = JSON.parse(payload.data);
        if (data._id === route.params.id) {
          text.value = {
            ...data,
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    onMounted(() => {
      fetchItem();
    });

    onUnmounted(() => {
      ws.close();
    });

    const toast = useToast();
    const fetchItem = async () => {
      try {
        const resp = await getDoc(route.params.id);
        text.value = resp.data;
      } catch (error) {
        console.log(error);
        toast.error('Error fetching item', {
          timeout: 2000,
          position: POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      }
      isLoading.value = false;
    };

    return { text, isLoading };
  },
};
</script>
