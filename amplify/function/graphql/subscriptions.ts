/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAssistantResponseChat =
  /* GraphQL */ `subscription OnCreateAssistantResponseChat($conversationId: ID) {
  onCreateAssistantResponseChat(conversationId: $conversationId) {
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
` as GeneratedSubscription<
    APITypes.OnCreateAssistantResponseChatSubscriptionVariables,
    APITypes.OnCreateAssistantResponseChatSubscription
  >;
export const onCreateConversationMessageChat =
  /* GraphQL */ `subscription OnCreateConversationMessageChat(
  $filter: ModelSubscriptionConversationMessageChatFilterInput
  $owner: String
) {
  onCreateConversationMessageChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateConversationMessageChatSubscriptionVariables,
    APITypes.OnCreateConversationMessageChatSubscription
  >;
export const onCreateFood = /* GraphQL */ `subscription OnCreateFood(
  $filter: ModelSubscriptionFoodFilterInput
  $owner: String
) {
  onCreateFood(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFoodSubscriptionVariables,
  APITypes.OnCreateFoodSubscription
>;
export const onCreateGoal = /* GraphQL */ `subscription OnCreateGoal(
  $filter: ModelSubscriptionGoalFilterInput
  $owner: String
) {
  onCreateGoal(filter: $filter, owner: $owner) {
    createdAt
    dietCalories
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGoalSubscriptionVariables,
  APITypes.OnCreateGoalSubscription
>;
export const onCreateHealthKitCache =
  /* GraphQL */ `subscription OnCreateHealthKitCache(
  $filter: ModelSubscriptionHealthKitCacheFilterInput
  $owner: String
) {
  onCreateHealthKitCache(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateHealthKitCacheSubscriptionVariables,
    APITypes.OnCreateHealthKitCacheSubscription
  >;
export const onCreateHeight = /* GraphQL */ `subscription OnCreateHeight(
  $filter: ModelSubscriptionHeightFilterInput
  $owner: String
) {
  onCreateHeight(filter: $filter, owner: $owner) {
    createdAt
    currentHeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHeightSubscriptionVariables,
  APITypes.OnCreateHeightSubscription
>;
export const onCreatePreferences =
  /* GraphQL */ `subscription OnCreatePreferences(
  $filter: ModelSubscriptionPreferencesFilterInput
  $owner: String
) {
  onCreatePreferences(filter: $filter, owner: $owner) {
    createdAt
    hideProtein
    hideSteps
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreatePreferencesSubscriptionVariables,
    APITypes.OnCreatePreferencesSubscription
  >;
export const onCreateQuickAdd = /* GraphQL */ `subscription OnCreateQuickAdd(
  $filter: ModelSubscriptionQuickAddFilterInput
  $owner: String
) {
  onCreateQuickAdd(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuickAddSubscriptionVariables,
  APITypes.OnCreateQuickAddSubscription
>;
export const onCreateWeight = /* GraphQL */ `subscription OnCreateWeight(
  $filter: ModelSubscriptionWeightFilterInput
  $owner: String
) {
  onCreateWeight(filter: $filter, owner: $owner) {
    createdAt
    currentWeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateWeightSubscriptionVariables,
  APITypes.OnCreateWeightSubscription
>;
export const onDeleteFood = /* GraphQL */ `subscription OnDeleteFood(
  $filter: ModelSubscriptionFoodFilterInput
  $owner: String
) {
  onDeleteFood(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFoodSubscriptionVariables,
  APITypes.OnDeleteFoodSubscription
>;
export const onDeleteGoal = /* GraphQL */ `subscription OnDeleteGoal(
  $filter: ModelSubscriptionGoalFilterInput
  $owner: String
) {
  onDeleteGoal(filter: $filter, owner: $owner) {
    createdAt
    dietCalories
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGoalSubscriptionVariables,
  APITypes.OnDeleteGoalSubscription
>;
export const onDeleteHealthKitCache =
  /* GraphQL */ `subscription OnDeleteHealthKitCache(
  $filter: ModelSubscriptionHealthKitCacheFilterInput
  $owner: String
) {
  onDeleteHealthKitCache(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteHealthKitCacheSubscriptionVariables,
    APITypes.OnDeleteHealthKitCacheSubscription
  >;
export const onDeleteHeight = /* GraphQL */ `subscription OnDeleteHeight(
  $filter: ModelSubscriptionHeightFilterInput
  $owner: String
) {
  onDeleteHeight(filter: $filter, owner: $owner) {
    createdAt
    currentHeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHeightSubscriptionVariables,
  APITypes.OnDeleteHeightSubscription
>;
export const onDeletePreferences =
  /* GraphQL */ `subscription OnDeletePreferences(
  $filter: ModelSubscriptionPreferencesFilterInput
  $owner: String
) {
  onDeletePreferences(filter: $filter, owner: $owner) {
    createdAt
    hideProtein
    hideSteps
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnDeletePreferencesSubscriptionVariables,
    APITypes.OnDeletePreferencesSubscription
  >;
export const onDeleteQuickAdd = /* GraphQL */ `subscription OnDeleteQuickAdd(
  $filter: ModelSubscriptionQuickAddFilterInput
  $owner: String
) {
  onDeleteQuickAdd(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuickAddSubscriptionVariables,
  APITypes.OnDeleteQuickAddSubscription
>;
export const onDeleteWeight = /* GraphQL */ `subscription OnDeleteWeight(
  $filter: ModelSubscriptionWeightFilterInput
  $owner: String
) {
  onDeleteWeight(filter: $filter, owner: $owner) {
    createdAt
    currentWeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteWeightSubscriptionVariables,
  APITypes.OnDeleteWeightSubscription
>;
export const onUpdateFood = /* GraphQL */ `subscription OnUpdateFood(
  $filter: ModelSubscriptionFoodFilterInput
  $owner: String
) {
  onUpdateFood(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFoodSubscriptionVariables,
  APITypes.OnUpdateFoodSubscription
>;
export const onUpdateGoal = /* GraphQL */ `subscription OnUpdateGoal(
  $filter: ModelSubscriptionGoalFilterInput
  $owner: String
) {
  onUpdateGoal(filter: $filter, owner: $owner) {
    createdAt
    dietCalories
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGoalSubscriptionVariables,
  APITypes.OnUpdateGoalSubscription
>;
export const onUpdateHealthKitCache =
  /* GraphQL */ `subscription OnUpdateHealthKitCache(
  $filter: ModelSubscriptionHealthKitCacheFilterInput
  $owner: String
) {
  onUpdateHealthKitCache(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateHealthKitCacheSubscriptionVariables,
    APITypes.OnUpdateHealthKitCacheSubscription
  >;
export const onUpdateHeight = /* GraphQL */ `subscription OnUpdateHeight(
  $filter: ModelSubscriptionHeightFilterInput
  $owner: String
) {
  onUpdateHeight(filter: $filter, owner: $owner) {
    createdAt
    currentHeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHeightSubscriptionVariables,
  APITypes.OnUpdateHeightSubscription
>;
export const onUpdatePreferences =
  /* GraphQL */ `subscription OnUpdatePreferences(
  $filter: ModelSubscriptionPreferencesFilterInput
  $owner: String
) {
  onUpdatePreferences(filter: $filter, owner: $owner) {
    createdAt
    hideProtein
    hideSteps
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdatePreferencesSubscriptionVariables,
    APITypes.OnUpdatePreferencesSubscription
  >;
export const onUpdateQuickAdd = /* GraphQL */ `subscription OnUpdateQuickAdd(
  $filter: ModelSubscriptionQuickAddFilterInput
  $owner: String
) {
  onUpdateQuickAdd(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuickAddSubscriptionVariables,
  APITypes.OnUpdateQuickAddSubscription
>;
export const onUpdateWeight = /* GraphQL */ `subscription OnUpdateWeight(
  $filter: ModelSubscriptionWeightFilterInput
  $owner: String
) {
  onUpdateWeight(filter: $filter, owner: $owner) {
    createdAt
    currentWeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateWeightSubscriptionVariables,
  APITypes.OnUpdateWeightSubscription
>;
