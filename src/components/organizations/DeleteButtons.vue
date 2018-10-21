<template lang="pug">
  div.delete-btn-area
    q-btn(v-if="!deletingMode", @click="showDeleteFields", icon="mdi-delete", color="red-8", size="12px", round, title="Excluir desafios").del-btn
    q-btn(
      v-if="deletingMode",
      @click="allowDialog",
      icon="delete",
      :disabled="selectionLength === 0 || isDeleting",
      color="red-7"
    )
      div(v-if="!isDeleting") {{selectionLength ? 'Excluir desafio(s) selecionado(s)' : 'Selecione algum desafio para excluir'}}
      q-spinner(v-else, size="30px")
    q-btn(v-if="deletingMode", @click="cancelDelete", color="primary", flat).cancel-btn Cancelar
</template>

<script>
export default {
  name: 'delete-button',
  props: {
    selectionLength: {
      type: Number,
      required: true
    },
    deletingMode: {
      type: Boolean,
      required: true
    },
    isDeleting: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allowDialog () {
      this.$emit('allowDialog')
    },
    showDeleteFields () {
      this.$emit('showDeleteFields')
    },
    cancelDelete () {
      this.$emit('cancelDelete')
    }
  }
}
</script>

<style lang="stylus" scoped>
.delete-btn-area
  display flex
  justify-content center
  @media (max-width: 1200px)
    flex-direction column
  @media (max-width: 1100px)
    margin 15px auto 0 auto
.cancel-btn
  margin-left 5px
  @media (max-width: 1200px)
    margin-top 5px
    align-self flex-end
  @media (max-width: 1100px)
    align-self center
.del-btn
  align-self flex-end
</style>
