function challengeWasCreatedHelper (previousResult, { subscriptionData: { data } }) {
  let { challengeGroup } = previousResult
  let { challenges } = challengeGroup
  let newChallenge = data.challengeWasCreated
  if (newChallenge) {
    let index = challenges.findIndex(c => c.id === newChallenge.id)
    if (index !== -1) {
      return previousResult
    } else {
      return {
        challengeGroup: Object.assign({}, challengeGroup, {
          challenges: [
            newChallenge,
            ...challenges
          ]
        })
      }
    }
  } else {
    return previousResult
  }
}

function challengeStatusWasToggledHelper (previousResult, { subscriptionData: { data } }) {
  let { challengeGroup } = previousResult
  let { challenges } = challengeGroup
  let toggledChallenge = data.challengeStatusWasToggled
  if (toggledChallenge) {
    let index = challenges.findIndex(c => c.id === toggledChallenge.id)
    if (index !== -1) {
      return previousResult
    } else {
      let challengesCopy = challenges.slice()
      challengesCopy[index] = Object.assign({}, challengesCopy[index], toggledChallenge)
      return {
        challengeGroup: Object.assign({}, challengeGroup, {
          challenges: challengesCopy
        })
      }
    }
  }
}

function challengesWereDeletedHelper (previousResult, { subscriptionData: { data } }) {
  let { challengesWereDeleted } = data
  if (challengesWereDeleted.length > 0) {
    let { challengeGroup } = previousResult
    let { challenges } = challengeGroup
    let challengesCopy = challenges.slice()
    for (let id of challengesWereDeleted) {
      let index = challenges.findIndex(c => c.id === id)
      if (index !== -1) {
        challengesCopy.splice(index, 1)
      }
    }
    return {
      challengeGroup: Object.assign({}, challengeGroup, {
        challenges: challengesCopy
      })
    }
  } else {
    return previousResult
  }
}

function valuesWereUpdatedHelper (previousResult, { subscriptionData: { data } }) {
  let { valuesWereUpdated } = data
  let { challengeGroup } = previousResult
  let { challenges } = challengeGroup
  let index = challenges.findIndex(c => c.id === valuesWereUpdated.id)
  if (index !== -1) {
    let copy = challenges.slice()
    copy[index] = Object.assign({}, copy[index], valuesWereUpdated)
    return {
      challengeGroup: Object.assign({}, challengeGroup, { challenges: copy })
    }
  } else {
    return previousResult
  }
}

function organizationWasCreatedHelper (previousResult, { subscriptionData: { data } }) {
  let { organizationWasCreated } = data
  let { allOrganizations } = previousResult
  if (organizationWasCreated) {
    let children = [{
      id: 'create-groups',
      label: 'Criar grupo',
      icon: 'mdi-folder-plus',
      iconColor: 'light-blue-2',
      organization_id: organizationWasCreated.id,
      handler: this.allowCreateGroup
    }]
    let create = this.dataTree.pop()
    this.dataTree.push({
      id: `organization${organizationWasCreated.id}`,
      label: organizationWasCreated.name,
      icon: 'mdi-folder-multiple',
      children
    })
    this.dataTree.push(create)
    let index = allOrganizations.findIndex(c => c.id === organizationWasCreated.id)
    if (index !== -1) {
      return previousResult
    } else {
      return {
        allOrganizations: [
          ...allOrganizations,
          organizationWasCreated
        ]
      }
    }
  } else {
    return previousResult
  }
}

function bfs (parent, nodes, challengeGroupWasCreated) {
  if (nodes.id === parent.id) {
    let create = nodes.children.pop()
    nodes.children.push({
      id: `${challengeGroupWasCreated.id}`,
      label: `${challengeGroupWasCreated.name}`,
      lazy: true,
      handler: (challengeGroupWasCreated) => this.loadChallengesEmit(challengeGroupWasCreated.id)
    })
    nodes.children.push(create)
  } else {
    if (nodes.children) {
      nodes.children.forEach(element => {
        element = bfs(parent, element, challengeGroupWasCreated)
        return element
      })
    }
  }
  return nodes
}

import Vue from 'vue'

function childrenGroupWasCreatedHelper (previousResult, { subscriptionData: { data } }) {
  let { challengeGroupWasCreated } = data
  challengeGroupWasCreated = {
    ...challengeGroupWasCreated,
    children: []
  }
  let { parent } = challengeGroupWasCreated
  if (parent) {
    return {
      getChildrenChallengeGroup: [
        ...this.childrenChallengeGroup,
        challengeGroupWasCreated
      ]
    }
  }
  return previousResult
}

function rootGroupWasCreatedHelper (previousResult, { subscriptionData: { data } }) {
  let { challengeGroupWasCreated } = data
  challengeGroupWasCreated = {
    ...challengeGroupWasCreated,
    children: []
  }
  let { parent } = challengeGroupWasCreated
  let index = this.dataTree.findIndex(c => c.id === `organization${challengeGroupWasCreated.organization.id}`)
  if (parent) {
    Vue.set(this.dataTree, index, bfs(parent, this.dataTree[index], challengeGroupWasCreated))
    return previousResult
    // this.childrenChallengeGroup.push(data)
  } else {
    let create = this.dataTree[index].children.pop()
    this.dataTree[index].children.push({
      id: `${challengeGroupWasCreated.id}`,
      label: `${challengeGroupWasCreated.name}`,
      lazy: true,
      handler: (challengeGroupWasCreated) => this.loadChallengesEmit(challengeGroupWasCreated.id)
    })
    this.dataTree[index].children.push(create)
    return {
      getRootChallengeGroup: [
        ...this.rootsChallengeGroup,
        challengeGroupWasCreated
      ]
    }
  }
}

function userWasDeletedHelper (previousResult, { subscriptionData: { data } }) {
  let { userWasDeleted } = data
  let { allUsers } = previousResult
  let index = allUsers.findIndex(u => u.id === userWasDeleted)
  if (index !== -1) {
    let copy = allUsers.slice()
    copy.splice(index, 1)
    return {
      allUsers: copy
    }
  } else {
    return previousResult
  }
}

function userWasUpdatedHelper (previousResult, { subscriptionData: { data } }) {
  let { userWasUpdated } = data
  let { allUsers } = previousResult
  let index = allUsers.findIndex(u => u.id === userWasUpdated.id)
  if (index !== -1) {
    let copy = allUsers.slice()
    copy[index] = Object.assign({}, userWasUpdated)
    return {
      allUsers: copy
    }
  } else {
    return previousResult
  }
}

export {
  challengeWasCreatedHelper,
  challengeStatusWasToggledHelper,
  challengesWereDeletedHelper,
  valuesWereUpdatedHelper,
  organizationWasCreatedHelper,
  userWasDeletedHelper,
  userWasUpdatedHelper,
  childrenGroupWasCreatedHelper,
  rootGroupWasCreatedHelper
}
