import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Challenge',
          possibleTypes: [
            { name: 'ChallengeGeneric' },
            { name: 'MultipleChallenge' },
            { name: 'SimpleChallenge' }
          ]
        },
        {
          kind: 'INTERFACE',
          name: 'Document',
          possibleTypes: [
            { name: 'Image' },
            { name: 'Text' },
            { name: 'Pdf' }
          ]
        },
        {
          kind: 'INTERFACE',
          name: 'Annotation',
          possibleTypes: [
            { name: 'Classification' },
            { name: 'ImageSegment' },
            { name: 'TextSegment' }
          ]
        }
      ]
    }
  }
})

export default fragmentMatcher
