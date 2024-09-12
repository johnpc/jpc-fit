import { AuthUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import type { Schema } from "../../amplify/data/resource";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversation } = createAIHooks(client);

export default function ChatPage(props: { user: AuthUser | undefined }) {
  const [conversationId, setConversationId] = useState<string|undefined>();
  console.log({rendering: conversationId});
  useEffect(() => {
    const fetchConversation = async () => {
      // list conversations
      const { data, errors } = await client.conversations.chat.list();

      const c = data.find(t => t.id === "04874a1a-a757-485a-875e-3605af7ddc8a")
      if (errors) {
        console.log({method: 'fetchConversation', errors});
      }
      console.log({method: 'fetchConversation', c});
      setConversationId(c!.id)

      // resume a conversation
      // const { data: conversation, errors } = await client.conversations.chat.get({ id: c!.id });
      // setConversation(conversation);

    };
    fetchConversation();
  }, [])
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation("chat", {
    id: conversationId,
    onResponse: (response) => {
      console.log({method: 'onResponse', response})
    },
  });
  console.log({rendering: messages});

  const tryRequestWithDataClient = async () => {
    const { data, errors } = await client.conversations.chat.create();
    if (errors) {
      console.log({errors});
    }
    data?.onMessage((message) => {
      console.log('GOT MESSAGE');
      console.log({message});
    })
    const res = await data?.sendMessage({
      content: [{ text: "Give me a recipe for mac and cheese" }],
      toolConfiguration: {
        tools: {
          generateRecipe: {
            description: "List ingredients needed for a recipe",
            inputSchema: {
              json: {
                type: "object",
                properties: {
                  ingredients: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ingredientName: {type: "string"},
                        quantity: {type: "number"},
                        unit: {type: "string"},
                    } },
                  },
                },
              },
            },
          },
        }
      }
    });
    if (res?.errors) {
      console.log({resErrors: res?.errors})
    }
    console.log({resData: res?.data});
    // console.log({method: 'tryRequestWithDataClient', data, errors});
  }

  return (
    <>
      <View paddingLeft={'large'} paddingRight={'large'} paddingBottom={messages.length ? 'small' : 'xxxl'} textAlign={'center'}>
        <Text fontSize={'xl'} fontWeight={'bold'}>🤖 MotivationBot 🤖</Text>
        <Text fontSize={'xs'}>AI chat about your eating and excercise goals.</Text>
        <Text fontSize={'xxs'}>(experimental)</Text>
      </View>
      <Button onClick={tryRequestWithDataClient}>Try with Data Client</Button>
      <AIConversation
        messages={messages}
        handleSendMessage={(content) => sendMessage({
          ...content,
          aiContext: { ignoreThisArgument: "true" },
          toolConfiguration: {
            tools: {
              generateRecipe: {
                description: "List ingredients needed for a recipe",
                inputSchema: {
                  json: {
                    type: "object",
                    properties: {
                      ingredients: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            ingredientName: {type: "string"},
                            quantity: {type: "number"},
                            unit: {type: "string"},
                        } },
                      },
                    },
                  },
                },
              },
            }
          }
        })}
        variant="bubble"
        avatars={{
          user: {
            username: props.user?.signInDetails?.loginId?.split("@")[0] || "User",
            avatar: "🥷",
          },
          ai: {
            username: "MotivationBot",
            avatar: "🤖",
          },
        }}
      />
    </>
  );
}
