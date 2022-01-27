 <template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3 text-primary">
      <div class="card-body selectable">
        <h1>{{ task.name }}</h1>
        <h4>{{ task.weight }}</h4>
        <button class="selectable btn btn-danger" @click="removeTask()">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async removeTask() {
        try {
          await tasksService.removeTask(props.task.id, route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>