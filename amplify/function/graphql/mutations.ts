/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const chat = /* GraphQL */ `mutation Chat(
  $aiContext: AWSJSON
  $content: [ContentBlockInput]
  $conversationId: ID!
  $toolConfiguration: ToolConfigurationInput
) {
  chat(
    aiContext: $aiContext
    content: $content
    conversationId: $conversationId
    toolConfiguration: $toolConfiguration
  ) {
    aiContext
    content {
      text
      __typename
    }
    conversationId
    createdAt
    id
    owner
    role
    toolConfiguration {
      __typename
    }
    updatedAt

    ... on ConversationMessageChat {
      assistantContent {
        text
        __typename
      }
      conversation {
        createdAt
        id
        metadata
        name
        owner
        updatedAt
        __typename
      }
    }
  }
}
` as GeneratedMutation<APITypes.ChatMutationVariables, APITypes.ChatMutation>;
export const createAssistantResponseChat =
  /* GraphQL */ `mutation CreateAssistantResponseChat(
  $input: CreateConversationMessageChatAssistantInput!
) {
  createAssistantResponseChat(input: $input) {
    aiContext
    assistantContent {
      text
      __typename
    }
    content {
      text
      __typename
    }
    conversation {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    role
    toolConfiguration {
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateAssistantResponseChatMutationVariables,
    APITypes.CreateAssistantResponseChatMutation
  >;
export const createConversationChat =
  /* GraphQL */ `mutation CreateConversationChat(
  $condition: ModelConversationChatConditionInput
  $input: CreateConversationChatInput!
) {
  createConversationChat(condition: $condition, input: $input) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    metadata
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateConversationChatMutationVariables,
    APITypes.CreateConversationChatMutation
  >;
export const createConversationMessageChat =
  /* GraphQL */ `mutation CreateConversationMessageChat(
  $condition: ModelConversationMessageChatConditionInput
  $input: CreateConversationMessageChatInput!
) {
  createConversationMessageChat(condition: $condition, input: $input) {
    aiContext
    assistantContent {
      text
      __typename
    }
    content {
      text
      __typename
    }
    conversation {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    role
    toolConfiguration {
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateConversationMessageChatMutationVariables,
    APITypes.CreateConversationMessageChatMutation
  >;
export const createFood = /* GraphQL */ `mutation CreateFood(
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
` as GeneratedMutation<
  APITypes.CreateFoodMutationVariables,
  APITypes.CreateFoodMutation
>;
export const createGoal = /* GraphQL */ `mutation CreateGoal(
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
` as GeneratedMutation<
  APITypes.CreateGoalMutationVariables,
  APITypes.CreateGoalMutation
>;
export const createHealthKitCache =
  /* GraphQL */ `mutation CreateHealthKitCache(
  $condition: ModelHealthKitCacheConditionInput
  $input: CreateHealthKitCacheInput!
) {
  createHealthKitCache(condition: $condition, input: $input) {
    activeCalories
    baseCalories
    createdAt
    day
    id
    owner
    steps
    updatedAt
    weight
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateHealthKitCacheMutationVariables,
    APITypes.CreateHealthKitCacheMutation
  >;
export const createHeight = /* GraphQL */ `mutation CreateHeight(
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
` as GeneratedMutation<
  APITypes.CreateHeightMutationVariables,
  APITypes.CreateHeightMutation
>;
export const createPreferences = /* GraphQL */ `mutation CreatePreferences(
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
` as GeneratedMutation<
  APITypes.CreatePreferencesMutationVariables,
  APITypes.CreatePreferencesMutation
>;
export const createQuickAdd = /* GraphQL */ `mutation CreateQuickAdd(
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
` as GeneratedMutation<
  APITypes.CreateQuickAddMutationVariables,
  APITypes.CreateQuickAddMutation
>;
export const createWeight = /* GraphQL */ `mutation CreateWeight(
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
` as GeneratedMutation<
  APITypes.CreateWeightMutationVariables,
  APITypes.CreateWeightMutation
>;
export const deleteConversationChat =
  /* GraphQL */ `mutation DeleteConversationChat(
  $condition: ModelConversationChatConditionInput
  $input: DeleteConversationChatInput!
) {
  deleteConversationChat(condition: $condition, input: $input) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    metadata
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteConversationChatMutationVariables,
    APITypes.DeleteConversationChatMutation
  >;
export const deleteConversationMessageChat =
  /* GraphQL */ `mutation DeleteConversationMessageChat(
  $condition: ModelConversationMessageChatConditionInput
  $input: DeleteConversationMessageChatInput!
) {
  deleteConversationMessageChat(condition: $condition, input: $input) {
    aiContext
    assistantContent {
      text
      __typename
    }
    content {
      text
      __typename
    }
    conversation {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    role
    toolConfiguration {
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteConversationMessageChatMutationVariables,
    APITypes.DeleteConversationMessageChatMutation
  >;
export const deleteFood = /* GraphQL */ `mutation DeleteFood(
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
` as GeneratedMutation<
  APITypes.DeleteFoodMutationVariables,
  APITypes.DeleteFoodMutation
>;
export const deleteGoal = /* GraphQL */ `mutation DeleteGoal(
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
` as GeneratedMutation<
  APITypes.DeleteGoalMutationVariables,
  APITypes.DeleteGoalMutation
>;
export const deleteHealthKitCache =
  /* GraphQL */ `mutation DeleteHealthKitCache(
  $condition: ModelHealthKitCacheConditionInput
  $input: DeleteHealthKitCacheInput!
) {
  deleteHealthKitCache(condition: $condition, input: $input) {
    activeCalories
    baseCalories
    createdAt
    day
    id
    owner
    steps
    updatedAt
    weight
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteHealthKitCacheMutationVariables,
    APITypes.DeleteHealthKitCacheMutation
  >;
export const deleteHeight = /* GraphQL */ `mutation DeleteHeight(
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
` as GeneratedMutation<
  APITypes.DeleteHeightMutationVariables,
  APITypes.DeleteHeightMutation
>;
export const deletePreferences = /* GraphQL */ `mutation DeletePreferences(
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
` as GeneratedMutation<
  APITypes.DeletePreferencesMutationVariables,
  APITypes.DeletePreferencesMutation
>;
export const deleteQuickAdd = /* GraphQL */ `mutation DeleteQuickAdd(
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
` as GeneratedMutation<
  APITypes.DeleteQuickAddMutationVariables,
  APITypes.DeleteQuickAddMutation
>;
export const deleteWeight = /* GraphQL */ `mutation DeleteWeight(
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
` as GeneratedMutation<
  APITypes.DeleteWeightMutationVariables,
  APITypes.DeleteWeightMutation
>;
export const updateFood = /* GraphQL */ `mutation UpdateFood(
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
` as GeneratedMutation<
  APITypes.UpdateFoodMutationVariables,
  APITypes.UpdateFoodMutation
>;
export const updateGoal = /* GraphQL */ `mutation UpdateGoal(
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
` as GeneratedMutation<
  APITypes.UpdateGoalMutationVariables,
  APITypes.UpdateGoalMutation
>;
export const updateHealthKitCache =
  /* GraphQL */ `mutation UpdateHealthKitCache(
  $condition: ModelHealthKitCacheConditionInput
  $input: UpdateHealthKitCacheInput!
) {
  updateHealthKitCache(condition: $condition, input: $input) {
    activeCalories
    baseCalories
    createdAt
    day
    id
    owner
    steps
    updatedAt
    weight
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateHealthKitCacheMutationVariables,
    APITypes.UpdateHealthKitCacheMutation
  >;
export const updateHeight = /* GraphQL */ `mutation UpdateHeight(
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
` as GeneratedMutation<
  APITypes.UpdateHeightMutationVariables,
  APITypes.UpdateHeightMutation
>;
export const updatePreferences = /* GraphQL */ `mutation UpdatePreferences(
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
` as GeneratedMutation<
  APITypes.UpdatePreferencesMutationVariables,
  APITypes.UpdatePreferencesMutation
>;
export const updateQuickAdd = /* GraphQL */ `mutation UpdateQuickAdd(
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
` as GeneratedMutation<
  APITypes.UpdateQuickAddMutationVariables,
  APITypes.UpdateQuickAddMutation
>;
export const updateWeight = /* GraphQL */ `mutation UpdateWeight(
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
` as GeneratedMutation<
  APITypes.UpdateWeightMutationVariables,
  APITypes.UpdateWeightMutation
>;
