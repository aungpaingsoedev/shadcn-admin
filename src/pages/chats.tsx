import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MoreVertical, Paperclip, Smile } from "lucide-react"

type Message = {
  id: string
  text: string
  isMe: boolean
  time: string
  status?: "sent" | "read"
}

type Conversation = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online?: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sat Naing",
    avatar: "SN",
    lastMessage: "Thanks! I'll review it by tomorrow.",
    time: "2m",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hey, can you check the dashboard design?", isMe: true, time: "10:30", status: "read" },
      { id: "m2", text: "Sure, I'll take a look in a bit.", isMe: false, time: "10:32" },
      { id: "m3", text: "I've updated the settings page. Let me know what you think.", isMe: true, time: "10:35", status: "read" },
      { id: "m4", text: "Thanks! I'll review it by tomorrow.", isMe: false, time: "10:36" },
    ],
  },
  {
    id: "2",
    name: "Aung Paing Soe",
    avatar: "AP",
    lastMessage: "Meeting at 3 PM?",
    time: "15m",
    unread: 1,
    online: true,
    messages: [
      { id: "m5", text: "Are we still on for the meeting?", isMe: false, time: "10:20" },
      { id: "m6", text: "Yes! 3 PM works for me.", isMe: true, time: "10:22", status: "read" },
      { id: "m7", text: "Meeting at 3 PM?", isMe: false, time: "10:25" },
    ],
  },
  {
    id: "3",
    name: "Thidar Htun",
    avatar: "TH",
    lastMessage: "Got it, thanks!",
    time: "1h",
    unread: 0,
    online: false,
    messages: [
      { id: "m8", text: "I've sent the files over.", isMe: true, time: "09:15", status: "read" },
      { id: "m9", text: "Got it, thanks!", isMe: false, time: "09:20" },
    ],
  },
  {
    id: "4",
    name: "Support Team",
    avatar: "ST",
    lastMessage: "Your ticket has been resolved.",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: "m10", text: "Hi, how can we help?", isMe: false, time: "Yesterday" },
      { id: "m11", text: "I need help with the API integration.", isMe: true, time: "Yesterday", status: "read" },
      { id: "m12", text: "Your ticket has been resolved.", isMe: false, time: "Yesterday" },
    ],
  },
]

export function ChatsPage() {
  const [selectedId, setSelectedId] = useState<string>(conversations[0].id)
  const [search, setSearch] = useState("")
  const [reply, setReply] = useState("")

  const selected = conversations.find((c) => c.id === selectedId) ?? conversations[0]
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100dvh-8rem)] flex-col md:h-[calc(100dvh-6rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Chats
        </h1>
        <p className="text-muted-foreground mt-1">
          Your conversations and messages.
        </p>
      </div>

      <Card className="flex flex-1 min-h-0 overflow-hidden border rounded-xl">
        <div className="flex h-full w-full">
          {/* Conversation list */}
          <div className="flex w-full md:w-80 flex-col border-r bg-muted/20">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 bg-background"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                    selectedId === conv.id && "bg-muted border-l-2 border-l-primary"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-foreground">
                        {conv.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-5 shrink-0 px-1.5 text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat thread */}
          <div className="flex flex-1 flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {selected.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.online ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Online</span>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
              {selected.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.isMe ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm",
                      msg.isMe
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border rounded-bl-md"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] opacity-70">{msg.time}</span>
                      {msg.isMe && msg.status && (
                        <span className="text-[10px] opacity-70">· {msg.status}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-3 bg-background">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <Smile className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="flex-1 rounded-full border-0 bg-muted/50 focus-visible:ring-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      setReply("")
                    }
                  }}
                />
                <Button size="icon" className="h-9 w-9 shrink-0 rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
