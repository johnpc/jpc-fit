/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFood = /* GraphQL */ `
  mutation CreateFood(
    $condition: ModelFoodConditionInput
    $input: CreateFoodInput!
  ) {
    createFood(condition: $condition, input: $input) {
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
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $condition: ModelGoalConditionInput
    $input: CreateGoalInput!
  ) {
    createGoal(condition: $condition, input: $input) {
      createdAt
      dietCalories
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const createHeight = /* GraphQL */ `
  mutation CreateHeight(
    $condition: ModelHeightConditionInput
    $input: CreateHeightInput!
  ) {
    createHeight(condition: $condition, input: $input) {
      createdAt
      currentHeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const createPreferences = /* GraphQL */ `
  mutation CreatePreferences(
    $condition: ModelPreferencesConditionInput
    $input: CreatePreferencesInput!
  ) {
    createPreferences(condition: $condition, input: $input) {
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
export const createQuickAdd = /* GraphQL */ `
  mutation CreateQuickAdd(
    $condition: ModelQuickAddConditionInput
    $input: CreateQuickAddInput!
  ) {
    createQuickAdd(condition: $condition, input: $input) {
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
export const createWeight = /* GraphQL */ `
  mutation CreateWeight(
    $condition: ModelWeightConditionInput
    $input: CreateWeightInput!
  ) {
    createWeight(condition: $condition, input: $input) {
      createdAt
      currentWeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const deleteFood = /* GraphQL */ `
  mutation DeleteFood(
    $condition: ModelFoodConditionInput
    $input: DeleteFoodInput!
  ) {
    deleteFood(condition: $condition, input: $input) {
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
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $condition: ModelGoalConditionInput
    $input: DeleteGoalInput!
  ) {
    deleteGoal(condition: $condition, input: $input) {
      createdAt
      dietCalories
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const deleteHeight = /* GraphQL */ `
  mutation DeleteHeight(
    $condition: ModelHeightConditionInput
    $input: DeleteHeightInput!
  ) {
    deleteHeight(condition: $condition, input: $input) {
      createdAt
      currentHeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const deletePreferences = /* GraphQL */ `
  mutation DeletePreferences(
    $condition: ModelPreferencesConditionInput
    $input: DeletePreferencesInput!
  ) {
    deletePreferences(condition: $condition, input: $input) {
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
export const deleteQuickAdd = /* GraphQL */ `
  mutation DeleteQuickAdd(
    $condition: ModelQuickAddConditionInput
    $input: DeleteQuickAddInput!
  ) {
    deleteQuickAdd(condition: $condition, input: $input) {
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
export const deleteWeight = /* GraphQL */ `
  mutation DeleteWeight(
    $condition: ModelWeightConditionInput
    $input: DeleteWeightInput!
  ) {
    deleteWeight(condition: $condition, input: $input) {
      createdAt
      currentWeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const updateFood = /* GraphQL */ `
  mutation UpdateFood(
    $condition: ModelFoodConditionInput
    $input: UpdateFoodInput!
  ) {
    updateFood(condition: $condition, input: $input) {
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
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $condition: ModelGoalConditionInput
    $input: UpdateGoalInput!
  ) {
    updateGoal(condition: $condition, input: $input) {
      createdAt
      dietCalories
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const updateHeight = /* GraphQL */ `
  mutation UpdateHeight(
    $condition: ModelHeightConditionInput
    $input: UpdateHeightInput!
  ) {
    updateHeight(condition: $condition, input: $input) {
      createdAt
      currentHeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const updatePreferences = /* GraphQL */ `
  mutation UpdatePreferences(
    $condition: ModelPreferencesConditionInput
    $input: UpdatePreferencesInput!
  ) {
    updatePreferences(condition: $condition, input: $input) {
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
export const updateQuickAdd = /* GraphQL */ `
  mutation UpdateQuickAdd(
    $condition: ModelQuickAddConditionInput
    $input: UpdateQuickAddInput!
  ) {
    updateQuickAdd(condition: $condition, input: $input) {
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
export const updateWeight = /* GraphQL */ `
  mutation UpdateWeight(
    $condition: ModelWeightConditionInput
    $input: UpdateWeightInput!
  ) {
    updateWeight(condition: $condition, input: $input) {
      createdAt
      currentWeight
      id
      owner
      updatedAt
      __typename
    }
  }
`;
