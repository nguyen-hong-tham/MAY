import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io('http://localhost:3000/chat', {
      transports: ['websocket'],
      reconnection: true,
    });

    socketRef.current.on('response', (reply: string) => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: reply,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
      setIsLoading(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    socketRef.current?.emit('chat', input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text: string, isUser: boolean) => {
    return text.split('\n').map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const content = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className={`font-bold ${isUser ? 'text-white underline' : 'text-[#4f6f41]'}`}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <div key={lineIndex} className="min-h-[1.2em]">
          {content}
        </div>
      );
    });
  };

  return (
    <>
      {/* Chat Bubble Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#6c935b] to-[#4f6f41] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white text-2xl z-40 hover:scale-110"
        title="Tư vấn chọn món hợp lý"
      >
        💬
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-2xl w-80 h-[480px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6c935b] to-[#4f6f41] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Tư vấn chọn món hợp lý</h2>
                <p className="text-sm text-[#e1c8c8]">Hỏi AI về sản phẩm 🍵</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="text-gray-400">
                    <p className="text-3xl mb-2">👋</p>
                    <p className="font-medium">Xin chào!</p>
                    <p className="text-sm">Hỏi mình về sản phẩm trà 🍵</p>
                    <p className="text-xs mt-3 text-gray-500">Ví dụ: "Có trà nào ít đường không?"</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                       key={msg.id}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-[#6c935b] text-white rounded-br-none'
                            : 'bg-[#f0f4ee] text-gray-800 rounded-bl-none border border-[#e2ebd9]'
                        }`}
                      >
                        <div className="break-words text-sm space-y-0.5">
                          {formatMessage(msg.text, msg.sender === 'user')}
                        </div>
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp.toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#f0f4ee] text-gray-800 px-3 py-2 rounded-lg rounded-bl-none border border-[#e2ebd9]">
                        <p className="text-sm">⏳ Đang suy nghĩ...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-gray-200 p-3 bg-white rounded-b-lg flex gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi gì về trà..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6c935b] disabled:bg-gray-100"
                rows={2}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#6c935b] text-white px-3 py-2 rounded-lg hover:bg-[#4f6f41] disabled:bg-gray-400 transition flex items-center justify-center font-bold"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
