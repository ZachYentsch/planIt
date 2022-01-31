<template>
  <div class="justify-content-end">
    <button
      class="btn btn-primary selectable"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasProject"
    >
      Projects
    </button>
    <button class="btn btn-danger selectable" @click="removeProjectfromPage()">
      Delete Project
    </button>
  </div>
  <div>
    <h4>{{ project.name }}</h4>
  </div>
  <CreateSprint />
  <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />

  <div
    class="offcanvas offcanvas-end text-dark"
    data-bs-scroll="true"
    id="offcanvasProject"
    tabindex="-1"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-dark">Projects:</h5>
      <button
        type="button"
        class="btn-close text-dark"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <Project
        v-for="p in projects"
        :key="p.id"
        :project="p"
        @click="goToProject(p.id)"
      />
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
import { notesService } from '../services/NotesService'
import { tasksService } from '../services/TasksService'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
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
      projects: computed(() => AppState.projects),
      sprints: computed(() => AppState.sprints),
      project: computed(() => AppState.project),
      async goToProject(projectId) {
        logger.log('routing in progress')
        router.push({ name: 'Project', params: { id: projectId } })
      },
      async removeProjectfromPage(id) {
        try {
          await projectsService.removeProject(route.params.id)
          router.push({ name: 'Home' })
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>