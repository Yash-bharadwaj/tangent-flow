
import { useState } from "react";
import { MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);  // Set to true by default
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        text: input,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages([...messages, userMessage]);
      setInput("");
      
      // Simulate response after a short delay
      setTimeout(() => {
        const botMessage: Message = {
          text: "Thank you for your message. Our team will get back to you soon.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-sidebar-foreground/70" />
            <span className="text-xs font-medium text-sidebar-foreground/70">Chat Assistant</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-3 w-3 text-sidebar-foreground/70" />
          ) : (
            <ChevronDown className="h-3 w-3 text-sidebar-foreground/70" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="h-48 overflow-y-auto bg-background rounded-md border p-2 mb-2">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`mb-2 ${message.isUser ? "text-right" : "text-left"}`}
              >
                <div 
                  className={`inline-block px-3 py-2 rounded-lg text-xs ${
                    message.isUser 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-[10px] text-sidebar-foreground/50 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-background border rounded-md text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleSendMessage}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
