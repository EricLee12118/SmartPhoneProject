import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { StyleSheet, FlatList, View } from 'react-native'
import { globalStyles, theme } from '@/app/theme/theme'
import { appStyles } from '@/app/theme/styles'
import { 
  Text, 
  Avatar, 
  Badge, 
  List, 
  Divider, 
  Card, 
  Button, 
  IconButton
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: any; 
}

const mockChats: ChatItem[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    lastMessage: 'Are we still meeting tomorrow?',
    time: '10:45 AM',
    unread: 2,
    avatar: require('@/assets/images/favicon.png')
  },
  {
    id: '2',
    name: 'John Davis',
    lastMessage: 'I sent you the document',
    time: 'Yesterday',
    unread: 0,
    avatar: require('@/assets/images/favicon.png')
  },
  {
    id: '3',
    name: 'Emma Wilson',
    lastMessage: 'Thanks for your help!',
    time: 'Yesterday',
    unread: 0,
    avatar: require('@/assets/images/favicon.png')
  },
];

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const totalUnread = mockChats.reduce((acc, chat) => acc + chat.unread, 0);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage}
      descriptionNumberOfLines={1}
      descriptionEllipsizeMode="tail"
      left={props => (
        <View style={appStyles.avatarContainer}>
          <Avatar.Image 
            {...props} 
            size={50} 
            source={item.avatar} 
          />
          {item.unread > 0 && (
            <View style={[appStyles.onlineIndicator, { backgroundColor: theme.colors.online }]} />
          )}
        </View>
      )}
      right={props => (
        <View style={appStyles.timeContainer}>
          <Text style={appStyles.timeText}>{item.time}</Text>
          {item.unread > 0 && (
            <Badge style={appStyles.unreadBadge}>{item.unread}</Badge>
          )}
        </View>
      )}
      style={appStyles.chatListItem}
      onPress={() => {
        router.push({
          pathname: "/(chat)/[id]",
          params: { id: item.id }
        });
      }}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: 0 }]} edges={['right', 'left']}>
      <SignedIn>
        <View style={appStyles.header}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Messages</Text>
          
          <IconButton
            icon="magnify"
            size={24}
            onPress={() => {}}
          />
        </View>
        
        <View style={appStyles.welcomeContainer}>
          <Text variant="titleLarge">
            Hello, {user?.emailAddresses[0]?.emailAddress.split('@')[0] || 'User'}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>
            You have {totalUnread} unread messages
          </Text>
        </View>
        
        <FlatList
          data={mockChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={appStyles.chatListContent}
          ItemSeparatorComponent={() => <Divider />}
        />
        
      </SignedIn>
      
      <SignedOut>
        <View style={appStyles.signedOutContainer}>
          <Card style={appStyles.welcomeCard}>
            <Card.Cover 
              source={require('@/assets/images/react-logo.png')} 
              style={appStyles.logo}
            />
            <Card.Content style={appStyles.cardContent}>
              <Text variant="headlineMedium" style={appStyles.appTitle}>
                Welcome to ChatApp
              </Text>
              <Text variant="bodyMedium" style={appStyles.appDescription}>
                The secure messaging platform
              </Text>
              
              <Link href="/(auth)/sign-in" asChild>
                <Button 
                  mode="contained" 
                  style={appStyles.signInButton}
                >
                  Sign In
                </Button>
              </Link>
              
              <Link href="/(auth)/sign-up" asChild>
                <Button 
                  mode="outlined" 
                  style={appStyles.signUpButton}
                >
                  Create Account
                </Button>
              </Link>
            </Card.Content>
          </Card>
        </View>
      </SignedOut>
    </SafeAreaView>
  )
}