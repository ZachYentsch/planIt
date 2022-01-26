<template>
  <div class="col-12">
    <div class="card w-100 bg-dark mt-3">
      <div class="card-body">
        <h5 class="card-title text-center">Create Project</h5>
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
            <label for="Name">Description:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Description..."
              v-model="editable.description"
              required
            />
            <button class="selectable btn btn-primary" @click="createProject">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { logger } from '../utils/Logger'
import { projectsService } from "../services/ProjectsService"
import Pop from '../utils/Pop'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          editable.value = {},
            Pop.toast("Project Created")
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