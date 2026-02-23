import { ConnectionMessage } from "@humeai/voice-react"

type JsonMessage = {
  type: "user_message" | "assistant_message"
  message: { content: string }
}

type ReturnChatEvent = {
  type: "USER_MESSAGE" | "AGENT_MESSAGE"
  messageText: string
}

export function condenseChatMessages(messages: readonly unknown[]): { isUser: boolean; content: string[] }[] {
  return messages.reduce<{ isUser: boolean; content: string[] }[]>((acc, message) => {
    const data = getChatEventData(message as ConnectionMessage | JsonMessage | ReturnChatEvent) ?? getJsonMessageData(message as ConnectionMessage | JsonMessage | ReturnChatEvent)
    if (data == null || data.content == null) {
      return acc
    }

    const lastMessage = acc.at(-1)
    if (lastMessage == null) {
      acc.push({ isUser: data.isUser, content: [data.content] })
      return acc
    }

    if (lastMessage.isUser === data.isUser) {
      lastMessage.content.push(data.content)
    } else {
      acc.push({ isUser: data.isUser, content: [data.content] })
    }

    return acc
  }, [])
}

function getJsonMessageData(message: ConnectionMessage | JsonMessage | ReturnChatEvent) {
  if (message.type !== "user_message" && message.type !== "assistant_message") {
    return null
  }

  if (!("message" in message) || typeof message.message?.content !== "string") {
    return null
  }

  return {
    isUser: message.type === "user_message",
    content: message.message.content,
  }
}

function getChatEventData(message: ConnectionMessage | JsonMessage | ReturnChatEvent) {
  if (message.type !== "USER_MESSAGE" && message.type !== "AGENT_MESSAGE") {
    return null
  }

  if (!("messageText" in message) || typeof message.messageText !== "string") {
    return null
  }

  return {
    isUser: message.type === "USER_MESSAGE",
    content: message.messageText,
  }
}