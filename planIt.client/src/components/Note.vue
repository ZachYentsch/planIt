<template>
  <div class="mt-3 bg-dark">
    <span class="d-flex">
      <img :src="note.creator.picture" alt="" width="40" />
      <p class="px-3">{{ note.creator.name }}</p>
    </span>
    <h4>
      {{ note.body }}
      <span
        ><i class="mdi mdi-minus selectable" @click="removeNote()"></i
      ></span>
    </h4>
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async removeNote() {
        try {
          await notesService.removeNote(props.note.id, route.params.id)
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