import { create } from "zustand";

const useConversation = create((set) => ({
  // Currently selected user in chat
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation, showChat: true }), // Auto-show chat on mobile when selecting user

  // Chat messages
  messages: [],
  setMessage: (messages) => set({ messages }),

  // Mobile toggle state: false = show Left, true = show Right
  showChat: false,
  setShowChat: (showChat) => set({ showChat }),
}));

export default useConversation;
