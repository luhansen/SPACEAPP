function formatCompletness (challenge) {
  let noted = challenge.notedDocumentsSize
  return `${noted}/${challenge.documentsSize}`
}

function formatPendent (challenge) {
  let noted = challenge.pendentDocumentsSize
  return `${noted}/${challenge.documentsSize}`
}

function formatProgress (challenge) {
  let noted = challenge.notedDocumentsSize
  return ((noted / (challenge.documentsSize) * 100).toFixed(0))
}

function selectClass (challenge, active) {
  let result = this.isFinished(challenge, active)
  return result ? 'finished' : 'notFinished'
}

function isFinished (challenge, active) {
  return ((challenge.notedDocumentsSize + challenge.pendentDocumentsSize === challenge.documentsSize) || !active)
}

export default {
  methods: {
    formatCompletness,
    formatPendent,
    formatProgress,
    selectClass,
    isFinished
  }
}
