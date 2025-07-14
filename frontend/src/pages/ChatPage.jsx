import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Corrected: use react-router-dom
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css"; // ✅ Optional: Ensure styles are loaded

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Clean up client on unmount
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent!");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <div className="relative w-full">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
