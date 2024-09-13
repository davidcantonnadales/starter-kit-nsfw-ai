"use client";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "reactfire";
import { ChannelSort, StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

const api_key = process.env.CHAT_PROJECT_ID || "";
const api_secret = process.env.CHAT_PROJECT_KEY || "";

const ChatPage: React.FC = () => {
  const { data: user } = useUser();
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchToken = async () => {
      if (!user) return;

      try {
        const response = await fetch("/api/chat/generate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user?.uid }),
        });

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          setUserToken(data.token);
          const chatClient = StreamChat.getInstance(api_key);

          if (typeof window !== "undefined") {
            await chatClient.connectUser(
              {
                id: user?.uid || "",
                name: user?.displayName || user?.email || "",
              },
              data.token
            );

            const channelSupport = chatClient.channel("messaging", "support", {
              name: "Support Channel",
            });
            const channelCreations = chatClient.channel(
              "messaging",
              "creations",
              {
                name: "Creations Channel",
              }
            );

            await channelSupport.create();
            await channelCreations.create();
            setLoading(false);
          }
        } else {
          console.error("Error fetching token:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchToken();
  }, [user]);

  if (!user) {
    return <div>You need be logged to join chat</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const filters = { type: "messaging" };
  const options = { state: true, presence: true, limit: 10 };
  const sort = { last_message_at: -1, updated_at: -1 };

  return (
    <Chat client={StreamChat.getInstance(api_key)} theme="str-chat__theme-dark">
      <ChannelList
        filters={filters}
        options={options}
        showChannelSearch
        sort={sort as ChannelSort<DefaultStreamChatGenerics>}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput focus />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatPage;
