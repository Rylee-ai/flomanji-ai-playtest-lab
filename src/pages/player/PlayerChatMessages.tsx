
import React, { useRef, useEffect } from "react";
import PlayerMessageBubble from "./PlayerMessageBubble";
import { PlayerMessage } from "@/types";

interface PlayerChatMessagesProps {
  messages: PlayerMessage[];
  isLoading: boolean;
}

const PlayerChatMessages: React.FC<PlayerChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="h-[60vh] overflow-y-auto p-4">
      {messages.map((msg) => (
        <PlayerMessageBubble key={msg.id} content={msg.content} timestamp={msg.timestamp} role={msg.role} />
      ))}
      {isLoading && (
        <div className="mb-4">
          <div className="inline-block p-3 rounded-lg max-w-[80%] bg-muted rounded-tl-none dark:bg-slate-800">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default PlayerChatMessages;
