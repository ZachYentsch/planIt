<template>
  <div class="col-12">
    <div class="card-lg bg-dark" @click="goToActiveProject()">
      <div class="card-body mt-3 selectable">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
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