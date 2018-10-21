import VueApollo from 'vue-apollo'
import apolloClient from '../graphql/client'

export default ({ app, store, Vue }) => {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  Vue.use(VueApollo)
  app.provide = apolloProvider.provide()
}
