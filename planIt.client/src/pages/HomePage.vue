<template>
  <CreateProject />
  <div class="row">
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
import { onMounted, computed, ref } from '@vue/runtime-core';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { projectsService } from '../services/ProjectsService';
import Project from "../components/Project.vue"
import { AppState } from '../AppState';
export default {
  name: 'Home',
  setup() {
    const editable = ref("");
    onMounted(async () => {
      try {
        await projectsService.getAllProjects()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    });
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
