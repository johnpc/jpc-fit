/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getConversationChat = /* GraphQL */ `query GetConversationChat($id: ID!) {
  getConversationChat(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetConversationChatQueryVariables,
  APITypes.GetConversationChatQuery
>;
export const getConversationMessageChat = /* GraphQL */ `query GetConversationMessageChat($id: ID!) {
  getConversationMessageChat(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetConversationMessageChatQueryVariables,
  APITypes.GetConversationMessageChatQuery
>;
export const getFood = /* GraphQL */ `query GetFood($id: ID!) {
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
` as GeneratedQuery<APITypes.GetFoodQueryVariables, APITypes.GetFoodQuery>;
export const getGoal = /* GraphQL */ `query GetGoal($id: ID!) {
  getGoal(id: $id) {
    createdAt
    dietCalories
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGoalQueryVariables, APITypes.GetGoalQuery>;
export const getHeight = /* GraphQL */ `query GetHeight($id: ID!) {
  getHeight(id: $id) {
    createdAt
    currentHeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetHeightQueryVariables, APITypes.GetHeightQuery>;
export const getPreferences = /* GraphQL */ `query GetPreferences($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetPreferencesQueryVariables,
  APITypes.GetPreferencesQuery
>;
export const getQuickAdd = /* GraphQL */ `query GetQuickAdd($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetQuickAddQueryVariables,
  APITypes.GetQuickAddQuery
>;
export const getWeight = /* GraphQL */ `query GetWeight($id: ID!) {
  getWeight(id: $id) {
    createdAt
    currentWeight
    id
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetWeightQueryVariables, APITypes.GetWeightQuery>;
export const listConversationChats = /* GraphQL */ `query ListConversationChats(
  $filter: ModelConversationChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversationChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationChatsQueryVariables,
  APITypes.ListConversationChatsQuery
>;
export const listConversationMessageChats = /* GraphQL */ `query ListConversationMessageChats(
  $filter: ModelConversationMessageChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversationMessageChats(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      aiContext
      conversationId
      createdAt
      id
      owner
      role
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationMessageChatsQueryVariables,
  APITypes.ListConversationMessageChatsQuery
>;
export const listFoods = /* GraphQL */ `query ListFoods(
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
` as GeneratedQuery<APITypes.ListFoodsQueryVariables, APITypes.ListFoodsQuery>;
export const listGoals = /* GraphQL */ `query ListGoals(
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
` as GeneratedQuery<APITypes.ListGoalsQueryVariables, APITypes.ListGoalsQuery>;
export const listHeights = /* GraphQL */ `query ListHeights(
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
` as GeneratedQuery<
  APITypes.ListHeightsQueryVariables,
  APITypes.ListHeightsQuery
>;
export const listPreferences = /* GraphQL */ `query ListPreferences(
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
` as GeneratedQuery<
  APITypes.ListPreferencesQueryVariables,
  APITypes.ListPreferencesQuery
>;
export const listQuickAdds = /* GraphQL */ `query ListQuickAdds(
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
` as GeneratedQuery<
  APITypes.ListQuickAddsQueryVariables,
  APITypes.ListQuickAddsQuery
>;
export const listWeights = /* GraphQL */ `query ListWeights(
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
` as GeneratedQuery<
  APITypes.ListWeightsQueryVariables,
  APITypes.ListWeightsQuery
>;
