import { useEffect, useState, useRef } from 'react'
import { View, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Avatar, Text, TextInput, IconButton, Divider } from 'react-native-paper'
import { globalStyles, theme } from '@/app/theme/theme'
import { appStyles } from '@/app/theme/styles'

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isMine: boolean;
}

interface ChatPartner {
  id: string;
  name: string;
  avatar: any;
  isOnline?: boolean;
}

const mockChatPartners: Record<string, ChatPartner> = {
  '1': {
    id: '1',
    name: 'Sarah Thompson',
    avatar: require('@/assets/images/favicon.png'),
    isOnline: true
  },
  '2': {
    id: '2',
    name: 'John Davis',
    avatar: require('@/assets/images/favicon.png'),
    isOnline: false
  },
  '3': {
    id: '3',
    name: 'Emma Wilson',
    avatar: require('@/assets/images/favicon.png'),
    isOnline: true
  }
};

const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: '1-1', text: 'Hi there!', sender: 'Sarah Thompson', timestamp: new Date(2023, 3, 15, 10, 30), isMine: false },
    { id: '1-2', text: 'Hello! How are you?', sender: 'me', timestamp: new Date(2023, 3, 15, 10, 32), isMine: true },
    { id: '1-3', text: 'I\'m good, thanks. Are we still meeting tomorrow?', sender: 'Sarah Thompson', timestamp: new Date(2023, 3, 15, 10, 35), isMine: false },
    { id: '1-4', text: 'Yes, 2 PM at the coffee shop, right?', sender: 'me', timestamp: new Date(2023, 3, 15, 10, 36), isMine: true },
    { id: '1-5', text: 'Perfect, see you then!', sender: 'Sarah Thompson', timestamp: new Date(2023, 3, 15, 10, 37), isMine: false },
  ],
  '2': [
    { id: '2-1', text: 'Have you reviewed the document?', sender: 'John Davis', timestamp: new Date(2023, 3, 14, 15, 10), isMine: false },
    { id: '2-2', text: 'Not yet, I\'ll look at it today', sender: 'me', timestamp: new Date(2023, 3, 14, 15, 20), isMine: true },
    { id: '2-3', text: 'I sent you the document', sender: 'John Davis', timestamp: new Date(2023, 3, 14, 16, 5), isMine: false },
  ],
  '3': [
    { id: '3-1', text: 'The project turned out great!', sender: 'Emma Wilson', timestamp: new Date(2023, 3, 14, 9, 0), isMine: false },
    { id: '3-2', text: 'Thanks for your help!', sender: 'Emma Wilson', timestamp: new Date(2023, 3, 14, 9, 5), isMine: false },
    { id: '3-3', text: 'Happy to help! Let me know if you need anything else.', sender: 'me', timestamp: new Date(2023, 3, 14, 10, 15), isMine: true },
  ]
};

export default function ChatPage() {
  const { id } = useLocalSearchParams();
  const chatId = typeof id === 'string' ? id : '1';
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [chatPartner, setChatPartner] = useState<ChatPartner | null>(null);
  const inputRef = useRef<RNTextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  // 加载聊天对象和历史消息
  useEffect(() => {
    // 获取聊天对象
    const partner = mockChatPartners[chatId];
    if (partner) {
      setChatPartner(partner);
    }
    const chatMessages = mockMessages[chatId] || [];
    setMessages(chatMessages);
  }, [chatId]);

  // 发送消息
  const sendMessage = () => {
    if (!messageText.trim() || !chatPartner) return;

    const newMessage: Message = {
      id: `${chatId}-${Date.now()}`,
      text: messageText.trim(),
      sender: 'me',
      timestamp: new Date(),
      isMine: true
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageText('');

    // 模拟对方回复
    setTimeout(() => {
      const replyMessage: Message = {
        id: `${chatId}-${Date.now() + 1}`,
        text: `This is an automated reply from ${chatPartner.name}`,
        sender: chatPartner.name,
        timestamp: new Date(),
        isMine: false
      };
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1000);
  };

  // 格式化消息时间
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 渲染消息项
  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[
      appStyles.messageContainer,
      item.isMine ? appStyles.myMessage : appStyles.theirMessage
    ]}>
      <View style={[
        appStyles.messageBubble,
        item.isMine ? appStyles.myMessageBubble : appStyles.theirMessageBubble
      ]}>
        <Text style={[
          appStyles.messageText,
          !item.isMine && appStyles.theirMessageText
        ]}>{item.text}</Text>
      </View>
      <Text style={appStyles.messageTime}>{formatMessageTime(item.timestamp)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: 0 }]} edges={['right', 'left']}>
      <Appbar.Header style={appStyles.chatHeader}>
        <Appbar.BackAction onPress={() => router.back()} />
        <View style={appStyles.chatHeaderTitle}>
          <View style={appStyles.avatarWithStatus}>
            <Avatar.Image source={chatPartner?.avatar} size={40} />
            {chatPartner?.isOnline && (
              <View style={[appStyles.statusIndicator, { backgroundColor: theme.colors.online }]} />
            )}
          </View>
          <View>
            <Text variant="titleMedium">{chatPartner?.name}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
              {chatPartner?.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={appStyles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <Divider />
        
        <View style={appStyles.inputContainer}>
          <TextInput
            ref={inputRef}
            mode="outlined"
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            style={appStyles.messageInput}
            multiline
            dense
            right={<TextInput.Icon icon="paperclip" onPress={() => {}} />}
          />
          <IconButton
            icon="send"
            mode="contained"
            size={24}
            style={appStyles.sendButton}
            disabled={!messageText.trim()}
            onPress={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}