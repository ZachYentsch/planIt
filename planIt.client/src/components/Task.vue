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
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownTask"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Task Completed
            <span v-for="t in tasks" :key="t.id">{{ task.isComplete }}</span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" @click.stop="taskComplete()">Yes</a>
            </li>
          </ul>
        </div>
        <button class="selectable btn btn-danger" @click="removeTask()">
          Delete
        </button>
      </div>
    </div>
  </div>

  <!-- TODO get dropdown menu from boostrap, and v-for over the sprints in your appstate -->
  <!-- <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li v-for="s in sprints" @click="editTask(s)"> </li>
  </ul>
</div> -->

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
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { tasksService } from "../services/TasksService";
import { notesService } from "../services/NotesService";
import { Offcanvas } from "bootstrap";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const editable = ref({});
    return {
      editable,
      notes: computed(() =>
        AppState.notes.filter((n) => n.taskId == props.task.id)
      ),

      async noteCanvas() {
        Offcanvas.getOrCreateInstance(
          document.getElementById("offcanvasNote" + props.task.id)
        ).toggle();
      },
      async editTask(newSprintId) {
        // TODO you need to add this new sprint id to the sprint object, then send to server
        // Ie: {sprintId: newSprintId}
      },

      async taskComplete() {
        try {
          await tasksService.taskComplete(props.task, route.params.id);
        } catch (error) {
          logger.log(error.message);
          Pop.toast(error.message, "error");
        }
      },

      async removeTask() {
        try {
          await tasksService.removeTask(props.task.id);
        } catch (error) {
          Pop.toast(error.message);
          logger.log(error.message);
        }
      },

      async createNote() {
        try {
          await notesService.createNote(
            editable.value,
            route.params.id,
            props.task.id
          );
          editable.value = {};
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>