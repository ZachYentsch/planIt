<template>
  <h1>Hello from the project page</h1>
  <CreateSprint />
  <Sprint />
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
import { notesService } from '../services/NotesService'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getProjectById(route.params.id)
        await sprintsService.getSprints(route.params.id)
        await tasksService.getTasks(route.params.id)
        await notesService.getNotes(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.error(error)
      }
    })
    return {
      project: computed(() => AppState.project),
      sprints: computed(() => AppState.sprints),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>