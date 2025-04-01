import { FlatList, View, Image } from 'react-native'
import { globalStyles, theme } from '@/app/theme/theme'
import { appStyles } from '@/app/theme/styles'
import { Text, Avatar, Card, Divider, IconButton, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface MomentItem {
  id: string;
  userName: string;
  userAvatar: any;
  content: string;
  image: any;
  likes: number;
  comments: number;
  time: string;
  hasLiked: boolean;
}

const mockMoments: MomentItem[] = [
  {
    id: '1',
    userName: 'Sarah Thompson',
    userAvatar: require('@/assets/images/favicon.png'),
    content: 'Enjoying a beautiful day at the park! 🌳 #nature #weekend',
    image: require('@/assets/images/react-logo.png'),
    likes: 24,
    comments: 5,
    time: '2 hours ago',
    hasLiked: false
  },
  {
    id: '2',
    userName: 'John Davis',
    userAvatar: require('@/assets/images/favicon.png'),
    content: 'Just finished reading this amazing book. Highly recommend! 📚',
    image: require('@/assets/images/react-logo.png'),
    likes: 35,
    comments: 12,
    time: '5 hours ago',
    hasLiked: true
  },
  {
    id: '3',
    userName: 'Emma Wilson',
    userAvatar: require('@/assets/images/favicon.png'),
    content: 'Had an incredible dinner at the new restaurant downtown 🍽️',
    image: require('@/assets/images/react-logo.png'),
    likes: 42,
    comments: 8,
    time: 'Yesterday',
    hasLiked: false
  },
];

export default function MomentsPage() {
  const renderMomentItem = ({ item }: { item: MomentItem }) => (
    <Card style={appStyles.momentCard}>
      <View style={appStyles.cardHeader}>
        <View style={appStyles.userInfo}>
          <Avatar.Image source={item.userAvatar} size={40} />
          <View style={appStyles.userTextContainer}>
            <Text variant="titleMedium">{item.userName}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
              {item.time}
            </Text>
          </View>
        </View>
        <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
      </View>
      
      <Text style={appStyles.momentContent}>{item.content}</Text>
      
      <Image
        source={item.image}
        style={appStyles.momentImage}
        resizeMode="cover"
      />
      
      <Divider style={appStyles.divider} />
      
      <View style={appStyles.momentActions}>
        <Button
          icon={item.hasLiked ? "heart" : "heart-outline"}
          mode="text"
          textColor={item.hasLiked ? theme.colors.error : theme.colors.textSecondary}
          onPress={() => {}}
        >
          {item.likes}
        </Button>
        <Button
          icon="comment-outline"
          mode="text"
          textColor={theme.colors.textSecondary}
          onPress={() => {}}
        >
          {item.comments}
        </Button>
        <Button
          icon="share-outline"
          mode="text"
          textColor={theme.colors.textSecondary}
          onPress={() => {}}
        >
          Share
        </Button>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: 0 }]} edges={['right', 'left']}>
      <View style={appStyles.header}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Moments</Text>
        <IconButton
          icon="camera"
          size={24}
          onPress={() => {}}
        />
      </View>
      
      <FlatList
        data={mockMoments}
        renderItem={renderMomentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={appStyles.momentsListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}