<template>
  <div class="col-12">
    <div class="card-lg bg-dark" @click="goToActiveProject()">
      <div class="card-body mt-3 selectable">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
        <button class="selectable btn btn-danger" @click="removeProject">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),


      async removeProject() {
        try {
          await projectsService.removeProject(props.project.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },

      goToActiveProject() {
        logger.log('routing')
        router.push({ name: 'Project', params: { id: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>