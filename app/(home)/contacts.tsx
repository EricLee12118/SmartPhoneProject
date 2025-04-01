import { FlatList, View } from 'react-native'
import { globalStyles } from '@/app/theme/theme'
import { appStyles } from '@/app/theme/styles'
import { Text, Avatar, List, Divider, IconButton, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

interface ContactItem {
  id: string;
  name: string;
  avatar: any;
  status?: string;
}

const mockContacts: ContactItem[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Available'
  },
  {
    id: '2',
    name: 'John Davis',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Busy'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Away'
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Available'
  },
  {
    id: '5',
    name: 'Lisa Johnson',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Offline'
  },
  {
    id: '6',
    name: 'Robert Miller',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Available'
  },
  {
    id: '7',
    name: 'Jennifer Taylor',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Busy'
  },
  {
    id: '8',
    name: 'David Anderson',
    avatar: require('@/assets/images/favicon.png'),
    status: 'Away'
  },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderContactItem = ({ item }: { item: ContactItem }) => (
    <List.Item
      title={item.name}
      description={item.status}
      left={props => (
        <Avatar.Image {...props} size={50} source={item.avatar} />
      )}
      right={props => (
        <IconButton icon="message-text" onPress={() => {}} />
      )}
      style={appStyles.contactItem}
      onPress={() => {}}
    />
  );

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: 0 }]} edges={['right', 'left']}>
      <View style={appStyles.header}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Contacts</Text>
        <IconButton
          icon="account-plus"
          size={24}
          onPress={() => {}}
        />
      </View>
      
      <View style={appStyles.searchBarContainer}>
        <Searchbar
          placeholder="Search contacts"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={appStyles.searchBar}
        />
      </View>
      
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={appStyles.contactListContent}
        ItemSeparatorComponent={() => <Divider />}
      />
    </SafeAreaView>
  )
}