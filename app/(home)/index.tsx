import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet, FlatList, View } from 'react-native'
import { globalStyles, theme } from '@/app/theme/theme'
import { SignOutButton } from '@/app/components/SignOutButton'
import { 
  Appbar, 
  Text, 
  Avatar, 
  Badge, 
  List, 
  Divider, 
  Card, 
  Button, 
  FAB 
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
  {
    id: '4',
    name: 'Team Chat',
    lastMessage: 'Mike: Let\'s schedule a call',
    time: 'Mon',
    unread: 5,
    avatar: require('@/assets/images/favicon.png')
  },
];

export default function Page() {
  const { user } = useUser()
  const totalUnread = mockChats.reduce((acc, chat) => acc + chat.unread, 0);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage}
      descriptionNumberOfLines={1}
      descriptionEllipsizeMode="tail"
      left={props => (
        <View style={{ position: 'relative' }}>
          <Avatar.Image 
            {...props} 
            size={50} 
            source={item.avatar} 
          />
          {item.unread > 0 && (
            <View style={[styles.onlineIndicator, { backgroundColor: theme.colors.online }]} />
          )}
        </View>
      )}
      right={props => (
        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{item.time}</Text>
          {item.unread > 0 && (
            <Badge style={{ backgroundColor: theme.colors.accent }}>{item.unread}</Badge>
          )}
        </View>
      )}
      style={{ paddingVertical: 8 }}
    />
  );

  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      <SignedIn>
        <Appbar.Header>
          <Appbar.Content title="Messages" />
          <SignOutButton />
        </Appbar.Header>
        
        <View style={{ padding: 16 }}>
          <Text variant="titleLarge">
            Hello, {user?.emailAddresses[0].emailAddress.split('@')[0]}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>
            You have {totalUnread} unread messages
          </Text>
        </View>
        
        <FlatList
          data={mockChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          ItemSeparatorComponent={() => <Divider />}
        />
        
        <FAB
          icon="plus"
          label="New Message"
          style={styles.fab}
          onPress={() => {}}
        />
      </SignedIn>
      
      <SignedOut>
        <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
          <Card style={{ padding: 8 }}>
            <Card.Cover 
              source={require('@/assets/images/react-logo.png')} 
              style={styles.logo}
            />
            <Card.Content style={{ alignItems: 'center', padding: 16 }}>
              <Text variant="headlineMedium" style={{ marginTop: 16 }}>
                Welcome to ChatApp
              </Text>
              <Text variant="bodyMedium" style={{ marginBottom: 24 }}>
                The secure messaging platform
              </Text>
              
              <Link href="/(auth)/sign-in" asChild>
                <Button 
                  mode="contained" 
                  style={{ marginBottom: 12, width: '100%' }}
                >
                  Sign In
                </Button>
              </Link>
              
              <Link href="/(auth)/sign-up" asChild>
                <Button 
                  mode="outlined" 
                  style={{ width: '100%' }}
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

const styles = StyleSheet.create({
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.accent,
  },
  logo: {
    height: 180,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    marginTop: 16,
  },
});