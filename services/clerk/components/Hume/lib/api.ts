import { HumeClient } from "hume";

export async function fetchChatMessages(humeChatId: string) {
  "use cache"

  const apiKey = process.env.HUME_API_KEY
  if (!apiKey) {
    throw new Error("HUME_API_KEY environment variable is required")
  }

  const client = new HumeClient({ apiKey })
  const allChatEvents: unknown[] = []
  const chatEventsIterator = await client.empathicVoice.chats.listChatEvents(
    humeChatId,
    { pageNumber: 0, pageSize: 100 }
  )

  for await (const chatEvent of chatEventsIterator) {
    allChatEvents.push(chatEvent)
  }

  return allChatEvents
}
