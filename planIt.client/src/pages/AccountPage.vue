<template>
  <div class="about text-center">
    <form @submit.prevent="editProfile()">
      <div
        class="row justify-content-center align-items-center elevation-3 my-3"
      >
        <div class="col-md-5 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Name..."
            v-model="editable.name"
          />
        </div>
        <div class="col-md-5 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Github..."
            v-model="editable.github"
          />
        </div>
        <div class="col-md-5 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="LinkedIn..."
            v-model="editable.linkedin"
          />
        </div>
        <div class="col-md-5 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Class..."
            v-model="editable.class"
          />
        </div>
        <div class="col-md-5 mb-2">
          <select
            v-model="editable.graduated"
            name="graduated"
            id="graduated"
            class="form-control"
          >
            <option disabled selected value="">Graduated</option>
            <option>true</option>
            <option>false</option>
          </select>
        </div>
        <div class="col-md-6 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Profile Picture..."
            v-model="editable.picture"
          />
        </div>
        <div class="col-md-6 mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Cover Image..."
            v-model="editable.coverImg"
          />
        </div>
        <div class="col-12 mb-2">
          <textarea
            type="text"
            class="form-control"
            placeholder="Bio..."
            v-model="editable.bio"
          />
        </div>
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-success">Submit</button>
        </div>
      </div>
    </form>
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {

    const route = useRoute();
    const editable = ref({});
    return {
      account: computed(() => AppState.account),
      editable,
      async editProfile() {
        try {
          await profilesService.editProfile(editable.value, route.params.id);
          editable.value = {};
          Pop.toast("Profile Changed Successfully");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>