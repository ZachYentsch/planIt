<template>
  <div class="col-12">
    <div class="card w-100 bg-dark mt-3">
      <div class="card-body">
        <h5 class="card-title text-center">Create Sprint</h5>
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
            <button class="btn btn-primary mdi mdi-plus" @click="createSprint">
              Create Sprint
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
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createSprint() {
        try {
          await sprintsService.createSprint(editable.value, route.params.id)
          editable.value = {}
          Pop.toast('Sprint Created')
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