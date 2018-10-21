<template lang="pug">
  q-card.signup__card
    q-card-main
      div(@keyup.enter="submit").field_spacing
        q-field(icon="person" :error="missingName" error-label="Digite seu nome").field__input
          q-input(v-model="name" float-label="Nome" autofocus)
        q-field(icon="error_outline" icon-color="transparent" :error="missingUsername" error-label="Digite um nome de usuário").field__input
          q-input(v-model="username" float-label="Nome de usuário")
      div(@keyup.enter="submit").field_spacing
        q-field(icon="mail" :error="invalidEmail" error-label="Digite um email válido").field__input
          q-input(v-model="email" float-label="Email")
      div(@keyup.enter="submit").field_spacing
        q-field(icon="lock" :error="missingPassword" error-label="Digite uma senha").field__input
          q-input(v-model="password" float-label="Senha" type="password")
        q-field(icon="error_outline" icon-color="transparent" :error="invalidConfirmation" error-label="Digite novamente a mesma senha").field__input
          q-input(v-model="confirmation" float-label="Confirmação da senha" type="password")
      div.field_spacing
        q-field(icon="library_books" :error="missingPassword" error-label="Escolha uma organização").field__input
          q-select(
            chips-color="white"
            chips-bg-color="primary"
            multiple
            chips
            v-model="selectedOrganization"
            :options="organizations"
            float-label="Selecione a organização do desafio"
          ).type-select
    q-card-separator
    div.signup__submit
      q-btn(@click="submit" color="primary").submit__button Cadastre-se
      q-btn(@click="signin" flat color="primary").q-caption.submit__button Já tenho uma conta
</template>

<script>
import ORGANIZATIONS_QUERY from '../../graphql/queries/AllOrganizations.gql'

export default {
  name: 'signup-card',
  props: {},
  apollo: {
    allOrganizations: {
      query: ORGANIZATIONS_QUERY
    }
  },
  data () {
    return {
      submitted: false,
      name: '',
      allOrganizations: [],
      selectedOrganization: [],
      username: '',
      email: '',
      password: '',
      confirmation: ''
    }
  },
  computed: {
    organizations () {
      return (this.allOrganizations || []).map(o => {
        return {
          label: o.name,
          value: o.id
        }
      })
    },
    missingName () { return this.name === '' && this.submitted },
    missingUsername () { return this.username === '' && this.submitted },
    missingOrganization () { return !this.selectedOrganization.length > 0 && this.submit },
    invalidEmail () {
      let re = /^[^ @]+@[^@ ]+\.[a-zA-Z]{2,6}$/
      if (this.email === '') {
        return this.submitted
      }
      return !re.test(this.email)
    },
    missingPassword () { return this.password === '' && this.submitted },
    invalidConfirmation () {
      return ((this.confirmation !== this.password) &&
        (this.confirmation !== '' || this.submitted)) ||
        (this.confirmation === '' && this.submitted)
    }
  },
  methods: {
    async updateOrganization (sel) {
      try {
        this.$apollo.queries.organization.setVariables({
          id: this.selectedOrganization
        })
        this.$apollo.queries.organization.skip = false
        await this.$apollo.queries.organization.refetch()
      } catch (err) {
        console.log(err)
      }
    },
    submit () {
      this.submitted = true
      if (this.missingName || this.missingUsername || this.invalidEmail || this.missingPassword || this.invalidConfirmation || this.missingOrganization) {
        this.$emit('formError', 'Não foi possível realizar o cadastro')
      } else {
        let user = {
          name: this.name,
          username: this.username,
          email: this.email,
          password_digest: this.password,
          role: 1,
          organizations: this.selectedOrganization
        }
        this.$emit('signup', user)
      }
    },
    signin () {
      this.$emit('signin')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.signup__card
  display flex
  flex 1
  flex-direction column
  justify-content space-around
  align-items stretch
  min-width 50%
  max-width 720px
  height 60%
  min-height 540px
  background white
  border-radius 8px
  padding 16px
  margin 16px

.field_spacing
  padding-top 12px
  padding-bottom 12px

.field__input
  padding-top 6px
  padding-bottom 6px

.signup__submit
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding 24px

.submit__button
  margin 6px
  align-self center
  width 60%

.challenge-type-selection
  display flex
  flex-direction column
  justify-content center
  padding 4px 0
  .selection-area
    padding 4px 0
    display grid
    grid-template-areas "label selector"
    grid-template-columns 65% auto
    align-items center
    label
      color $tertiary
      padding 6px
    @media (max-width 668px)
      grid-template-columns 40% auto !important
    .type-select
      border-radius 2px
      border $grey-8
      border-style solid
      border-width 1px
      padding 8px
</style>
