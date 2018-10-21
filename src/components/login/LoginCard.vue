<template lang="pug">
  q-card.login__card
    q-card-main
      div(@keyup.enter="submit").field_spacing
        q-field(icon="mail" :error="invalidEmail" error-label="Digite um email válido").field__input
          q-input(v-model="email" float-label="Email" autofocus)
      div(@keyup.enter="submit").field_spacing
        q-field(icon="lock" :error="missingPassword" error-label="Digite sua senha").field__input
          q-input(v-model="password" float-label="Senha" type="password")
    div.login__submit
      q-btn(@click="submit" color="primary", :disabled="!canSubmit").submit__button
        div(v-if="!isAuthenticating") Entrar
        div(v-else)
         q-spinner(size="20px" color="white").spinner
      q-btn(@click="signup" flat color="primary").q-caption.submit__button Novo cadastro
</template>

<script>
import { QField, QCard, QCardTitle, QCardMain, QCardSeparator, QInput, QBtn, QSpinner } from 'quasar'

export default {
  name: 'login-card',
  components: {
    QField,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QInput,
    QBtn,
    QSpinner
  },
  props: {
    isAuthenticating: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      submitted: false,
      email: '',
      password: ''
    }
  },
  computed: {
    canSubmit () {
      return !this.invalidEmail && this.email.trim() !== '' && this.password.trim() !== ''
    },
    invalidEmail () {
      let re = /^[^ @]+@[^@ ]+\.[a-zA-Z]{2,6}$/
      if (this.email === '') {
        return this.submitted
      }
      return !re.test(this.email)
    },
    missingPassword () { return this.password === '' && this.submitted }
  },
  methods: {
    submit () {
      this.submitted = true
      if (!this.invalidEmail || !this.missingPassword) {
        let user = {
          email: this.email,
          password_digest: this.password
        }
        this.$emit('signin', user)
      } else {
        this.$emit('formError', 'Não foi possível realizar o login')
      }
    },
    signup () {
      this.$emit('signup')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.login__card
  display flex
  flex 1
  flex-direction column
  justify-content space-around
  align-items stretch
  min-width 300px
  max-width 720px
  height 50%
  min-height 360px
  background white
  border-radius 8px
  padding 16px
  margin 16px

.field_spacing
  padding-top 12px
  padding-bottom 12px

.field__input
  padding-top 12px

.login__submit
  display flex
  flex-direction column
  align-items center
  justify-content space-between

.submit__button
  margin 6px
  align-self center
  width 60%
</style>
