 <template>
  <div class="col-12">
    <div class="card-lg bg-dark mt-3 text-primary">
      <div class="card-body selectable">
        <h1
          class="selectable"
          :data-bs-target="'#offcanvasNote' + task.id"
          data-bs-toggle="offcanvas"
        >
          {{ task.name }}
        </h1>
        <h4>{{ task.weight }}</h4>
        <button class="selectable btn btn-danger" @click="removeTask()">
          Delete
        </button>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-start text-dark"
    data-bs-scroll="true"
    :id="'offcanvasNote' + task.id"
    tabindex="-1"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-dark">Note:</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form>
        <div class="">
          <label for="Name">Note:</label>
          <input
            type="text"
            class="form-control"
            placeholder="..."
            v-model="editable.body"
            required
          />
          <button class="btn btn-primary mdi mdi-plus" @click="createNote()">
            Create Note
          </button>
        </div>
      </form>
      <Note v-for="n in notes" :key="n.id" :note="n" />
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { tasksService } from '../services/TasksService'
import { notesService } from '../services/NotesService'
import { Offcanvas } from 'bootstrap'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),

      async noteCanvas() {
        Offcanvas.getOrCreateInstance(
          document.getElementById("offcanvasNote" + props.task.id)
        ).toggle()
      },

      async createNote() {
        try {
          await notesService.createNote(editable.value, route.params.id, props.task.id)
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)

        }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
</style>