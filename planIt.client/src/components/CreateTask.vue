<template>
  <div class="col-12">
    <div class="card w-100 bg-dark mt-3">
      <div class="card-body">
        <h5 class="card-title text-center">Create Task</h5>
        <form>
          <div class="">
            <label for="Name">Name:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Name..."
              v-model="editable.name"
              required
            />
            <button class="btn btn-primary mdi mdi-plus" @click="createTask">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createTask() {
        try {
          await tasksService.createTask(editable.value)
          editable.value = {}
          Pop.toast('Task Created')
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.error(error)
        }
      }
    }

  }
}
</script>


<style lang="scss" scoped>
</style>