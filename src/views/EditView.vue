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
              placeholder="Dialogue: "
              @input="updateText"
            />
          </div>
          <label>Mood</label>
          <div class="input-group input-group-sm mb-3">
            <textarea
              v-model="text.mood"
              class="form-control m-2"
              placeholder="Mood: "
              @input="updateText"
            />
          </div>
          <button
            v-if="!isEdit"
            type="button"
            class="btn btn-primary m-3"
            @click="submitDoc"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { updateDoc } from '../services/index';
import { useRoute } from 'vue-router';
import { useToast, POSITION } from 'vue-toastification';
import { createDoc, getDoc } from '../services/index';
import { debounce } from 'lodash';

import LoadingSpinner from '../components/LoadingSpinner.vue';
import router from '@/router';

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
    let isEdit = ref(false);
    const route = useRoute();

    onMounted(() => {
      if (route.params.id) {
        isEdit.value = true;
        fetchItem();
      } else isLoading.value = false;
    });

    const putText = async () => {
      if (isEdit.value)
        try {
          const data = { dialogue: text.value.dialogue, mood: text.value.mood };
          await updateDoc(route.params.id, data);
        } catch (error) {
          console.log(error);
        }
    };

    const submitDoc = async () => {
      try {
        const data = { dialogue: text.value.dialogue, mood: text.value.mood };
        const res = await createDoc(data);
        console.log(res.data);
        router.push({ name: 'edit', params: { id: res.data._id } });
      } catch (error) {
        console.log(error);
      }
    };

    const updateText = debounce(putText, 500);

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

    return { text, isEdit, isLoading, submitDoc, updateText };
  },
};
</script>
