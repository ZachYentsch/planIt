<template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3">
      <div class="card-body">
        <h1
          class="selectable"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapseTask' + sprint.id"
          aria-expanded="false"
          aria-controls="collapseTask"
        >
          {{ sprint.name }}
        </h1>
        <!-- TODO Display task weight properly -->
        <h1><i class="mdi mdi-weight"></i></h1>
        <h4>{{ tasks.weight }}</h4>

        <button class="selectable btn btn-danger" @click="removeSprint()">
          Delete
        </button>
        <div
          class="collapse collapse-horizontal mt-4"
          :id="'collapseTask' + sprint.id"
        >
          <div class="card card-body text-dark" style="width: 100vh">
            <CreateTask :sprint="sprint" />
          </div>
          <Task v-for="t in tasks" :key="t.id" :task="t" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'

export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.Id)),
      totalWeight: computed(() => {
        const tasks = AppState.tasks.filter(t => t.sprintId == props.sprint.id && !t.isCompleted)
        let total = 0
        tasks.forEach(t => total += t.weight)
        return total

      }),



      async removeSprint() {
        try {
          await sprintsService.removeSprint(props.sprint.id, route.params.id)
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