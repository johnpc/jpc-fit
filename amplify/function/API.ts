/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ConversationChat = {
  __typename: "ConversationChat";
  createdAt: string;
  id: string;
  messages?: ModelConversationMessageChatConnection | null;
  metadata?: string | null;
  name?: string | null;
  owner?: string | null;
  updatedAt: string;
};

export type ModelConversationMessageChatConnection = {
  __typename: "ModelConversationMessageChatConnection";
  items: Array<ConversationMessageChat | null>;
  nextToken?: string | null;
};

export type ConversationMessageChat = {
  __typename: "ConversationMessageChat";
  aiContext?: string | null;
  assistantContent?: Array<ContentBlock | null> | null;
  content?: Array<ContentBlock | null> | null;
  conversation?: ConversationChat | null;
  conversationId: string;
  createdAt: string;
  id: string;
  owner?: string | null;
  role?: ConversationParticipantRole | null;
  toolConfiguration?: ToolConfiguration | null;
  updatedAt: string;
};

export type ConversationMessage = {
  __typename: "ConversationMessage";
  aiContext?: string | null;
  content?: Array<ContentBlock | null> | null;
  conversationId: string;
  createdAt?: string | null;
  id: string;
  owner?: string | null;
  role?: ConversationParticipantRole | null;
  toolConfiguration?: ToolConfiguration | null;
  updatedAt?: string | null;
};

export type ContentBlock = {
  __typename: "ContentBlock";
  document?: DocumentBlock | null;
  image?: ImageBlock | null;
  text?: string | null;
  toolResult?: ToolResultBlock | null;
  toolUse?: ToolUseBlock | null;
};

export type DocumentBlock = {
  __typename: "DocumentBlock";
  format: string;
  name: string;
  source: DocumentBlockSource;
};

export type DocumentBlockSource = {
  __typename: "DocumentBlockSource";
  bytes?: string | null;
};

export type ImageBlock = {
  __typename: "ImageBlock";
  format: string;
  source: ImageBlockSource;
};

export type ImageBlockSource = {
  __typename: "ImageBlockSource";
  bytes?: string | null;
};

export type ToolResultBlock = {
  __typename: "ToolResultBlock";
  content: Array<ToolResultContentBlock>;
  status?: string | null;
  toolUseId: string;
};

export type ToolResultContentBlock = {
  __typename: "ToolResultContentBlock";
  document?: DocumentBlock | null;
  image?: ImageBlock | null;
  json?: string | null;
  text?: string | null;
};

export type ToolUseBlock = {
  __typename: "ToolUseBlock";
  input: string;
  name: string;
  toolUseId: string;
};

export enum ConversationParticipantRole {
  assistant = "assistant",
  user = "user",
}

export type ToolConfiguration = {
  __typename: "ToolConfiguration";
  tools?: Array<Tool | null> | null;
};

export type Tool = {
  __typename: "Tool";
  toolSpec?: ToolSpecification | null;
};

export type ToolSpecification = {
  __typename: "ToolSpecification";
  description?: string | null;
  inputSchema: ToolInputSchema;
  name: string;
};

export type ToolInputSchema = {
  __typename: "ToolInputSchema";
  json?: string | null;
};

export type Food = {
  __typename: "Food";
  calories: number;
  createdAt: string;
  day: string;
  id: string;
  name?: string | null;
  notes?: string | null;
  owner?: string | null;
  photos?: Array<string | null> | null;
  protein?: number | null;
  updatedAt: string;
};

export type Goal = {
  __typename: "Goal";
  createdAt: string;
  dietCalories: number;
  id: string;
  owner?: string | null;
  updatedAt: string;
};

export type Height = {
  __typename: "Height";
  createdAt: string;
  currentHeight: number;
  id: string;
  owner?: string | null;
  updatedAt: string;
};

export type Preferences = {
  __typename: "Preferences";
  createdAt: string;
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
  id: string;
  owner?: string | null;
  updatedAt: string;
};

export type QuickAdd = {
  __typename: "QuickAdd";
  calories: number;
  createdAt: string;
  icon: string;
  id: string;
  name: string;
  owner?: string | null;
  protein?: number | null;
  updatedAt: string;
};

export type Weight = {
  __typename: "Weight";
  createdAt: string;
  currentWeight: number;
  id: string;
  owner?: string | null;
  updatedAt: string;
};

export type ModelConversationChatFilterInput = {
  and?: Array<ModelConversationChatFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  metadata?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelConversationChatFilterInput | null;
  or?: Array<ModelConversationChatFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}

export type ModelSizeInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelIDInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export type ModelConversationChatConnection = {
  __typename: "ModelConversationChatConnection";
  items: Array<ConversationChat | null>;
  nextToken?: string | null;
};

export type ModelConversationMessageChatFilterInput = {
  aiContext?: ModelStringInput | null;
  and?: Array<ModelConversationMessageChatFilterInput | null> | null;
  conversationId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelConversationMessageChatFilterInput | null;
  or?: Array<ModelConversationMessageChatFilterInput | null> | null;
  owner?: ModelStringInput | null;
  role?: ModelConversationParticipantRoleInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelConversationParticipantRoleInput = {
  eq?: ConversationParticipantRole | null;
  ne?: ConversationParticipantRole | null;
};

export type ModelFoodFilterInput = {
  and?: Array<ModelFoodFilterInput | null> | null;
  calories?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  day?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodFilterInput | null;
  notes?: ModelStringInput | null;
  or?: Array<ModelFoodFilterInput | null> | null;
  owner?: ModelStringInput | null;
  photos?: ModelStringInput | null;
  protein?: ModelIntInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelIntInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelFoodConnection = {
  __typename: "ModelFoodConnection";
  items: Array<Food | null>;
  nextToken?: string | null;
};

export type ModelGoalFilterInput = {
  and?: Array<ModelGoalFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  dietCalories?: ModelIntInput | null;
  id?: ModelIDInput | null;
  not?: ModelGoalFilterInput | null;
  or?: Array<ModelGoalFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelGoalConnection = {
  __typename: "ModelGoalConnection";
  items: Array<Goal | null>;
  nextToken?: string | null;
};

export type ModelHeightFilterInput = {
  and?: Array<ModelHeightFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  currentHeight?: ModelIntInput | null;
  id?: ModelIDInput | null;
  not?: ModelHeightFilterInput | null;
  or?: Array<ModelHeightFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelHeightConnection = {
  __typename: "ModelHeightConnection";
  items: Array<Height | null>;
  nextToken?: string | null;
};

export type ModelPreferencesFilterInput = {
  and?: Array<ModelPreferencesFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  hideProtein?: ModelBooleanInput | null;
  hideSteps?: ModelBooleanInput | null;
  id?: ModelIDInput | null;
  not?: ModelPreferencesFilterInput | null;
  or?: Array<ModelPreferencesFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelPreferencesConnection = {
  __typename: "ModelPreferencesConnection";
  items: Array<Preferences | null>;
  nextToken?: string | null;
};

export type ModelQuickAddFilterInput = {
  and?: Array<ModelQuickAddFilterInput | null> | null;
  calories?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  icon?: ModelStringInput | null;
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  not?: ModelQuickAddFilterInput | null;
  or?: Array<ModelQuickAddFilterInput | null> | null;
  owner?: ModelStringInput | null;
  protein?: ModelIntInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelQuickAddConnection = {
  __typename: "ModelQuickAddConnection";
  items: Array<QuickAdd | null>;
  nextToken?: string | null;
};

export type ModelWeightFilterInput = {
  and?: Array<ModelWeightFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  currentWeight?: ModelIntInput | null;
  id?: ModelIDInput | null;
  not?: ModelWeightFilterInput | null;
  or?: Array<ModelWeightFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelWeightConnection = {
  __typename: "ModelWeightConnection";
  items: Array<Weight | null>;
  nextToken?: string | null;
};

export type ContentBlockInput = {
  document?: DocumentBlockInput | null;
  image?: ImageBlockInput | null;
  text?: string | null;
  toolResult?: ToolResultBlockInput | null;
  toolUse?: ToolUseBlockInput | null;
};

export type DocumentBlockInput = {
  format: string;
  name: string;
  source: DocumentBlockSourceInput;
};

export type DocumentBlockSourceInput = {
  bytes?: string | null;
};

export type ImageBlockInput = {
  format: string;
  source: ImageBlockSourceInput;
};

export type ImageBlockSourceInput = {
  bytes?: string | null;
};

export type ToolResultBlockInput = {
  content: Array<ToolResultContentBlockInput>;
  status?: string | null;
  toolUseId: string;
};

export type ToolResultContentBlockInput = {
  document?: DocumentBlockInput | null;
  image?: ImageBlockInput | null;
  json?: string | null;
  text?: string | null;
};

export type ToolUseBlockInput = {
  input: string;
  name: string;
  toolUseId: string;
};

export type ToolConfigurationInput = {
  tools?: Array<ToolInput | null> | null;
};

export type ToolInput = {
  toolSpec?: ToolSpecificationInput | null;
};

export type ToolSpecificationInput = {
  description?: string | null;
  inputSchema: ToolInputSchemaInput;
  name: string;
};

export type ToolInputSchemaInput = {
  json?: string | null;
};

export type CreateConversationMessageChatAssistantInput = {
  associatedUserMessageId?: string | null;
  content?: Array<ContentBlockInput | null> | null;
  conversationId?: string | null;
};

export type ModelConversationChatConditionInput = {
  and?: Array<ModelConversationChatConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  metadata?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelConversationChatConditionInput | null;
  or?: Array<ModelConversationChatConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateConversationChatInput = {
  id?: string | null;
  metadata?: string | null;
  name?: string | null;
};

export type ModelConversationMessageChatConditionInput = {
  aiContext?: ModelStringInput | null;
  and?: Array<ModelConversationMessageChatConditionInput | null> | null;
  conversationId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  not?: ModelConversationMessageChatConditionInput | null;
  or?: Array<ModelConversationMessageChatConditionInput | null> | null;
  owner?: ModelStringInput | null;
  role?: ModelConversationParticipantRoleInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateConversationMessageChatInput = {
  aiContext?: string | null;
  assistantContent?: Array<ContentBlockInput | null> | null;
  content?: Array<ContentBlockInput | null> | null;
  conversationId: string;
  id?: string | null;
  role?: ConversationParticipantRole | null;
  toolConfiguration?: ToolConfigurationInput | null;
};

export type ModelFoodConditionInput = {
  and?: Array<ModelFoodConditionInput | null> | null;
  calories?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  day?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelFoodConditionInput | null;
  notes?: ModelStringInput | null;
  or?: Array<ModelFoodConditionInput | null> | null;
  owner?: ModelStringInput | null;
  photos?: ModelStringInput | null;
  protein?: ModelIntInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateFoodInput = {
  calories: number;
  day: string;
  id?: string | null;
  name?: string | null;
  notes?: string | null;
  photos?: Array<string | null> | null;
  protein?: number | null;
};

export type ModelGoalConditionInput = {
  and?: Array<ModelGoalConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  dietCalories?: ModelIntInput | null;
  not?: ModelGoalConditionInput | null;
  or?: Array<ModelGoalConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateGoalInput = {
  dietCalories: number;
  id?: string | null;
};

export type ModelHeightConditionInput = {
  and?: Array<ModelHeightConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  currentHeight?: ModelIntInput | null;
  not?: ModelHeightConditionInput | null;
  or?: Array<ModelHeightConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateHeightInput = {
  currentHeight: number;
  id?: string | null;
};

export type ModelPreferencesConditionInput = {
  and?: Array<ModelPreferencesConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  hideProtein?: ModelBooleanInput | null;
  hideSteps?: ModelBooleanInput | null;
  not?: ModelPreferencesConditionInput | null;
  or?: Array<ModelPreferencesConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreatePreferencesInput = {
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
  id?: string | null;
};

export type ModelQuickAddConditionInput = {
  and?: Array<ModelQuickAddConditionInput | null> | null;
  calories?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  icon?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelQuickAddConditionInput | null;
  or?: Array<ModelQuickAddConditionInput | null> | null;
  owner?: ModelStringInput | null;
  protein?: ModelIntInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateQuickAddInput = {
  calories: number;
  icon: string;
  id?: string | null;
  name: string;
  protein?: number | null;
};

export type ModelWeightConditionInput = {
  and?: Array<ModelWeightConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  currentWeight?: ModelIntInput | null;
  not?: ModelWeightConditionInput | null;
  or?: Array<ModelWeightConditionInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateWeightInput = {
  currentWeight: number;
  id?: string | null;
};

export type DeleteConversationChatInput = {
  id: string;
};

export type DeleteConversationMessageChatInput = {
  id: string;
};

export type DeleteFoodInput = {
  id: string;
};

export type DeleteGoalInput = {
  id: string;
};

export type DeleteHeightInput = {
  id: string;
};

export type DeletePreferencesInput = {
  id: string;
};

export type DeleteQuickAddInput = {
  id: string;
};

export type DeleteWeightInput = {
  id: string;
};

export type UpdateFoodInput = {
  calories?: number | null;
  day?: string | null;
  id: string;
  name?: string | null;
  notes?: string | null;
  photos?: Array<string | null> | null;
  protein?: number | null;
};

export type UpdateGoalInput = {
  dietCalories?: number | null;
  id: string;
};

export type UpdateHeightInput = {
  currentHeight?: number | null;
  id: string;
};

export type UpdatePreferencesInput = {
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
  id: string;
};

export type UpdateQuickAddInput = {
  calories?: number | null;
  icon?: string | null;
  id: string;
  name?: string | null;
  protein?: number | null;
};

export type UpdateWeightInput = {
  currentWeight?: number | null;
  id: string;
};

export type ModelSubscriptionConversationMessageChatFilterInput = {
  aiContext?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionConversationMessageChatFilterInput | null> | null;
  conversationId?: ModelSubscriptionIDInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionConversationMessageChatFilterInput | null> | null;
  owner?: ModelStringInput | null;
  role?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionFoodFilterInput = {
  and?: Array<ModelSubscriptionFoodFilterInput | null> | null;
  calories?: ModelSubscriptionIntInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  day?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  notes?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionFoodFilterInput | null> | null;
  owner?: ModelStringInput | null;
  photos?: ModelSubscriptionStringInput | null;
  protein?: ModelSubscriptionIntInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionIntInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  in?: Array<number | null> | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionGoalFilterInput = {
  and?: Array<ModelSubscriptionGoalFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  dietCalories?: ModelSubscriptionIntInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionGoalFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionHeightFilterInput = {
  and?: Array<ModelSubscriptionHeightFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  currentHeight?: ModelSubscriptionIntInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionHeightFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionPreferencesFilterInput = {
  and?: Array<ModelSubscriptionPreferencesFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  hideProtein?: ModelSubscriptionBooleanInput | null;
  hideSteps?: ModelSubscriptionBooleanInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionPreferencesFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelSubscriptionQuickAddFilterInput = {
  and?: Array<ModelSubscriptionQuickAddFilterInput | null> | null;
  calories?: ModelSubscriptionIntInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  icon?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionQuickAddFilterInput | null> | null;
  owner?: ModelStringInput | null;
  protein?: ModelSubscriptionIntInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionWeightFilterInput = {
  and?: Array<ModelSubscriptionWeightFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  currentWeight?: ModelSubscriptionIntInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionWeightFilterInput | null> | null;
  owner?: ModelStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type GetConversationChatQueryVariables = {
  id: string;
};

export type GetConversationChatQuery = {
  getConversationChat?: {
    __typename: "ConversationChat";
    createdAt: string;
    id: string;
    messages?: {
      __typename: "ModelConversationMessageChatConnection";
      nextToken?: string | null;
    } | null;
    metadata?: string | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type GetConversationMessageChatQueryVariables = {
  id: string;
};

export type GetConversationMessageChatQuery = {
  getConversationMessageChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type GetFoodQueryVariables = {
  id: string;
};

export type GetFoodQuery = {
  getFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type GetGoalQueryVariables = {
  id: string;
};

export type GetGoalQuery = {
  getGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type GetHeightQueryVariables = {
  id: string;
};

export type GetHeightQuery = {
  getHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type GetPreferencesQueryVariables = {
  id: string;
};

export type GetPreferencesQuery = {
  getPreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type GetQuickAddQueryVariables = {
  id: string;
};

export type GetQuickAddQuery = {
  getQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type GetWeightQueryVariables = {
  id: string;
};

export type GetWeightQuery = {
  getWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type ListConversationChatsQueryVariables = {
  filter?: ModelConversationChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListConversationChatsQuery = {
  listConversationChats?: {
    __typename: "ModelConversationChatConnection";
    items: Array<{
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListConversationMessageChatsQueryVariables = {
  filter?: ModelConversationMessageChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListConversationMessageChatsQuery = {
  listConversationMessageChats?: {
    __typename: "ModelConversationMessageChatConnection";
    items: Array<{
      __typename: "ConversationMessageChat";
      aiContext?: string | null;
      conversationId: string;
      createdAt: string;
      id: string;
      owner?: string | null;
      role?: ConversationParticipantRole | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListFoodsQueryVariables = {
  filter?: ModelFoodFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFoodsQuery = {
  listFoods?: {
    __typename: "ModelFoodConnection";
    items: Array<{
      __typename: "Food";
      calories: number;
      createdAt: string;
      day: string;
      id: string;
      name?: string | null;
      notes?: string | null;
      owner?: string | null;
      photos?: Array<string | null> | null;
      protein?: number | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListGoalsQueryVariables = {
  filter?: ModelGoalFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListGoalsQuery = {
  listGoals?: {
    __typename: "ModelGoalConnection";
    items: Array<{
      __typename: "Goal";
      createdAt: string;
      dietCalories: number;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListHeightsQueryVariables = {
  filter?: ModelHeightFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListHeightsQuery = {
  listHeights?: {
    __typename: "ModelHeightConnection";
    items: Array<{
      __typename: "Height";
      createdAt: string;
      currentHeight: number;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListPreferencesQueryVariables = {
  filter?: ModelPreferencesFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPreferencesQuery = {
  listPreferences?: {
    __typename: "ModelPreferencesConnection";
    items: Array<{
      __typename: "Preferences";
      createdAt: string;
      hideProtein?: boolean | null;
      hideSteps?: boolean | null;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListQuickAddsQueryVariables = {
  filter?: ModelQuickAddFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListQuickAddsQuery = {
  listQuickAdds?: {
    __typename: "ModelQuickAddConnection";
    items: Array<{
      __typename: "QuickAdd";
      calories: number;
      createdAt: string;
      icon: string;
      id: string;
      name: string;
      owner?: string | null;
      protein?: number | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListWeightsQueryVariables = {
  filter?: ModelWeightFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWeightsQuery = {
  listWeights?: {
    __typename: "ModelWeightConnection";
    items: Array<{
      __typename: "Weight";
      createdAt: string;
      currentWeight: number;
      id: string;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ChatMutationVariables = {
  aiContext?: string | null;
  content?: Array<ContentBlockInput | null> | null;
  conversationId: string;
  toolConfiguration?: ToolConfigurationInput | null;
};

export type ChatMutation = {
  chat: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversationId: string;
    createdAt?: string | null;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
  } | null;
};

export type CreateAssistantResponseChatMutationVariables = {
  input: CreateConversationMessageChatAssistantInput;
};

export type CreateAssistantResponseChatMutation = {
  createAssistantResponseChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type CreateConversationChatMutationVariables = {
  condition?: ModelConversationChatConditionInput | null;
  input: CreateConversationChatInput;
};

export type CreateConversationChatMutation = {
  createConversationChat?: {
    __typename: "ConversationChat";
    createdAt: string;
    id: string;
    messages?: {
      __typename: "ModelConversationMessageChatConnection";
      nextToken?: string | null;
    } | null;
    metadata?: string | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type CreateConversationMessageChatMutationVariables = {
  condition?: ModelConversationMessageChatConditionInput | null;
  input: CreateConversationMessageChatInput;
};

export type CreateConversationMessageChatMutation = {
  createConversationMessageChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type CreateFoodMutationVariables = {
  condition?: ModelFoodConditionInput | null;
  input: CreateFoodInput;
};

export type CreateFoodMutation = {
  createFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type CreateGoalMutationVariables = {
  condition?: ModelGoalConditionInput | null;
  input: CreateGoalInput;
};

export type CreateGoalMutation = {
  createGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type CreateHeightMutationVariables = {
  condition?: ModelHeightConditionInput | null;
  input: CreateHeightInput;
};

export type CreateHeightMutation = {
  createHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type CreatePreferencesMutationVariables = {
  condition?: ModelPreferencesConditionInput | null;
  input: CreatePreferencesInput;
};

export type CreatePreferencesMutation = {
  createPreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type CreateQuickAddMutationVariables = {
  condition?: ModelQuickAddConditionInput | null;
  input: CreateQuickAddInput;
};

export type CreateQuickAddMutation = {
  createQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type CreateWeightMutationVariables = {
  condition?: ModelWeightConditionInput | null;
  input: CreateWeightInput;
};

export type CreateWeightMutation = {
  createWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteConversationChatMutationVariables = {
  condition?: ModelConversationChatConditionInput | null;
  input: DeleteConversationChatInput;
};

export type DeleteConversationChatMutation = {
  deleteConversationChat?: {
    __typename: "ConversationChat";
    createdAt: string;
    id: string;
    messages?: {
      __typename: "ModelConversationMessageChatConnection";
      nextToken?: string | null;
    } | null;
    metadata?: string | null;
    name?: string | null;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteConversationMessageChatMutationVariables = {
  condition?: ModelConversationMessageChatConditionInput | null;
  input: DeleteConversationMessageChatInput;
};

export type DeleteConversationMessageChatMutation = {
  deleteConversationMessageChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type DeleteFoodMutationVariables = {
  condition?: ModelFoodConditionInput | null;
  input: DeleteFoodInput;
};

export type DeleteFoodMutation = {
  deleteFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type DeleteGoalMutationVariables = {
  condition?: ModelGoalConditionInput | null;
  input: DeleteGoalInput;
};

export type DeleteGoalMutation = {
  deleteGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteHeightMutationVariables = {
  condition?: ModelHeightConditionInput | null;
  input: DeleteHeightInput;
};

export type DeleteHeightMutation = {
  deleteHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeletePreferencesMutationVariables = {
  condition?: ModelPreferencesConditionInput | null;
  input: DeletePreferencesInput;
};

export type DeletePreferencesMutation = {
  deletePreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteQuickAddMutationVariables = {
  condition?: ModelQuickAddConditionInput | null;
  input: DeleteQuickAddInput;
};

export type DeleteQuickAddMutation = {
  deleteQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type DeleteWeightMutationVariables = {
  condition?: ModelWeightConditionInput | null;
  input: DeleteWeightInput;
};

export type DeleteWeightMutation = {
  deleteWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdateFoodMutationVariables = {
  condition?: ModelFoodConditionInput | null;
  input: UpdateFoodInput;
};

export type UpdateFoodMutation = {
  updateFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type UpdateGoalMutationVariables = {
  condition?: ModelGoalConditionInput | null;
  input: UpdateGoalInput;
};

export type UpdateGoalMutation = {
  updateGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdateHeightMutationVariables = {
  condition?: ModelHeightConditionInput | null;
  input: UpdateHeightInput;
};

export type UpdateHeightMutation = {
  updateHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdatePreferencesMutationVariables = {
  condition?: ModelPreferencesConditionInput | null;
  input: UpdatePreferencesInput;
};

export type UpdatePreferencesMutation = {
  updatePreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type UpdateQuickAddMutationVariables = {
  condition?: ModelQuickAddConditionInput | null;
  input: UpdateQuickAddInput;
};

export type UpdateQuickAddMutation = {
  updateQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type UpdateWeightMutationVariables = {
  condition?: ModelWeightConditionInput | null;
  input: UpdateWeightInput;
};

export type UpdateWeightMutation = {
  updateWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateAssistantResponseChatSubscriptionVariables = {
  conversationId?: string | null;
};

export type OnCreateAssistantResponseChatSubscription = {
  onCreateAssistantResponseChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type OnCreateConversationMessageChatSubscriptionVariables = {
  filter?: ModelSubscriptionConversationMessageChatFilterInput | null;
  owner?: string | null;
};

export type OnCreateConversationMessageChatSubscription = {
  onCreateConversationMessageChat?: {
    __typename: "ConversationMessageChat";
    aiContext?: string | null;
    assistantContent?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    content?: Array<{
      __typename: "ContentBlock";
      text?: string | null;
    } | null> | null;
    conversation?: {
      __typename: "ConversationChat";
      createdAt: string;
      id: string;
      metadata?: string | null;
      name?: string | null;
      owner?: string | null;
      updatedAt: string;
    } | null;
    conversationId: string;
    createdAt: string;
    id: string;
    owner?: string | null;
    role?: ConversationParticipantRole | null;
    toolConfiguration?: {
      __typename: "ToolConfiguration";
    } | null;
    updatedAt: string;
  } | null;
};

export type OnCreateFoodSubscriptionVariables = {
  filter?: ModelSubscriptionFoodFilterInput | null;
  owner?: string | null;
};

export type OnCreateFoodSubscription = {
  onCreateFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnCreateGoalSubscriptionVariables = {
  filter?: ModelSubscriptionGoalFilterInput | null;
  owner?: string | null;
};

export type OnCreateGoalSubscription = {
  onCreateGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateHeightSubscriptionVariables = {
  filter?: ModelSubscriptionHeightFilterInput | null;
  owner?: string | null;
};

export type OnCreateHeightSubscription = {
  onCreateHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreatePreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionPreferencesFilterInput | null;
  owner?: string | null;
};

export type OnCreatePreferencesSubscription = {
  onCreatePreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateQuickAddSubscriptionVariables = {
  filter?: ModelSubscriptionQuickAddFilterInput | null;
  owner?: string | null;
};

export type OnCreateQuickAddSubscription = {
  onCreateQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnCreateWeightSubscriptionVariables = {
  filter?: ModelSubscriptionWeightFilterInput | null;
  owner?: string | null;
};

export type OnCreateWeightSubscription = {
  onCreateWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteFoodSubscriptionVariables = {
  filter?: ModelSubscriptionFoodFilterInput | null;
  owner?: string | null;
};

export type OnDeleteFoodSubscription = {
  onDeleteFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteGoalSubscriptionVariables = {
  filter?: ModelSubscriptionGoalFilterInput | null;
  owner?: string | null;
};

export type OnDeleteGoalSubscription = {
  onDeleteGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteHeightSubscriptionVariables = {
  filter?: ModelSubscriptionHeightFilterInput | null;
  owner?: string | null;
};

export type OnDeleteHeightSubscription = {
  onDeleteHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeletePreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionPreferencesFilterInput | null;
  owner?: string | null;
};

export type OnDeletePreferencesSubscription = {
  onDeletePreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteQuickAddSubscriptionVariables = {
  filter?: ModelSubscriptionQuickAddFilterInput | null;
  owner?: string | null;
};

export type OnDeleteQuickAddSubscription = {
  onDeleteQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteWeightSubscriptionVariables = {
  filter?: ModelSubscriptionWeightFilterInput | null;
  owner?: string | null;
};

export type OnDeleteWeightSubscription = {
  onDeleteWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateFoodSubscriptionVariables = {
  filter?: ModelSubscriptionFoodFilterInput | null;
  owner?: string | null;
};

export type OnUpdateFoodSubscription = {
  onUpdateFood?: {
    __typename: "Food";
    calories: number;
    createdAt: string;
    day: string;
    id: string;
    name?: string | null;
    notes?: string | null;
    owner?: string | null;
    photos?: Array<string | null> | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateGoalSubscriptionVariables = {
  filter?: ModelSubscriptionGoalFilterInput | null;
  owner?: string | null;
};

export type OnUpdateGoalSubscription = {
  onUpdateGoal?: {
    __typename: "Goal";
    createdAt: string;
    dietCalories: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateHeightSubscriptionVariables = {
  filter?: ModelSubscriptionHeightFilterInput | null;
  owner?: string | null;
};

export type OnUpdateHeightSubscription = {
  onUpdateHeight?: {
    __typename: "Height";
    createdAt: string;
    currentHeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdatePreferencesSubscriptionVariables = {
  filter?: ModelSubscriptionPreferencesFilterInput | null;
  owner?: string | null;
};

export type OnUpdatePreferencesSubscription = {
  onUpdatePreferences?: {
    __typename: "Preferences";
    createdAt: string;
    hideProtein?: boolean | null;
    hideSteps?: boolean | null;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateQuickAddSubscriptionVariables = {
  filter?: ModelSubscriptionQuickAddFilterInput | null;
  owner?: string | null;
};

export type OnUpdateQuickAddSubscription = {
  onUpdateQuickAdd?: {
    __typename: "QuickAdd";
    calories: number;
    createdAt: string;
    icon: string;
    id: string;
    name: string;
    owner?: string | null;
    protein?: number | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateWeightSubscriptionVariables = {
  filter?: ModelSubscriptionWeightFilterInput | null;
  owner?: string | null;
};

export type OnUpdateWeightSubscription = {
  onUpdateWeight?: {
    __typename: "Weight";
    createdAt: string;
    currentWeight: number;
    id: string;
    owner?: string | null;
    updatedAt: string;
  } | null;
};
