/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFood = /* GraphQL */ `
  query GetFood($id: ID!) {
    getFood(id: $id) {
      calories
      createdAt
      day
      id
      name
      notes
      owner
      photos
      protein
      updatedAt
      __typename
    }
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
      createdAt
      dietCalories
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const getHeight = /* GraphQL */ `
  query GetHeight($id: ID!) {
    getHeight(id: $id) {
      createdAt
      currentHeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const getPreferences = /* GraphQL */ `
  query GetPreferences($id: ID!) {
    getPreferences(id: $id) {
      createdAt
      hideProtein
      hideSteps
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const getQuickAdd = /* GraphQL */ `
  query GetQuickAdd($id: ID!) {
    getQuickAdd(id: $id) {
      calories
      createdAt
      icon
      id
      name
      owner
      protein
      updatedAt
      __typename
    }
  }
`;
export const getWeight = /* GraphQL */ `
  query GetWeight($id: ID!) {
    getWeight(id: $id) {
      createdAt
      currentWeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const listFoodByDay = /* GraphQL */ `
  query ListFoodByDay(
    $day: String!
    $filter: ModelFoodFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFoodByDay(
      day: $day
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        calories
        createdAt
        day
        id
        name
        notes
        owner
        photos
        protein
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listFoods = /* GraphQL */ `
  query ListFoods(
    $filter: ModelFoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        calories
        createdAt
        day
        id
        name
        notes
        owner
        photos
        protein
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        dietCalories
        id
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listHeights = /* GraphQL */ `
  query ListHeights(
    $filter: ModelHeightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        currentHeight
        id
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPreferences = /* GraphQL */ `
  query ListPreferences(
    $filter: ModelPreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        hideProtein
        hideSteps
        id
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listQuickAdds = /* GraphQL */ `
  query ListQuickAdds(
    $filter: ModelQuickAddFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuickAdds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        calories
        createdAt
        icon
        id
        name
        owner
        protein
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listWeights = /* GraphQL */ `
  query ListWeights(
    $filter: ModelWeightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        currentWeight
        id
        owner
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
