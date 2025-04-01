import { ScrollView, View, Switch } from 'react-native'
import { globalStyles, theme } from '@/app/theme/theme'
import { appStyles } from '@/app/theme/styles'
import { Text, List, Divider, Button, Avatar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useUser, useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export default function SettingsPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const handleSignOut = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/(auth)/sign-in'))
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  return (
    <SafeAreaView style={[globalStyles.container, { paddingTop: 0 }]} edges={['right', 'left']}>
      <View style={appStyles.header}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Settings</Text>
      </View>
      
      <ScrollView contentContainerStyle={appStyles.settingsScrollContent}>
        {/* Profile Section */}
        <View style={appStyles.profileSection}>
          <Avatar.Image 
            source={require('@/assets/images/favicon.png')} 
            size={80}
            style={appStyles.profileAvatar}
          />
          <Text variant="titleLarge">{user?.emailAddresses[0]?.emailAddress.split('@')[0] || 'User'}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>
            {user?.emailAddresses[0]?.emailAddress || 'user@example.com'}
          </Text>
          <Button 
            mode="outlined" 
            style={appStyles.profileEditButton}
            onPress={() => {}}
          >
            Edit Profile
          </Button>
        </View>
        
        <Divider />
        
        {/* Appearance Settings */}
        <List.Section style={appStyles.settingsSection}>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Text Size"
            description="Medium"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        {/* Notification Settings */}
        <List.Section style={appStyles.settingsSection}>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Sound"
            right={() => (
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Do Not Disturb"
            description="Off"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        {/* Privacy Settings */}
        <List.Section style={appStyles.settingsSection}>
          <List.Subheader>Privacy & Security</List.Subheader>
          <List.Item
            title="Privacy Settings"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Change Password"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Two-Factor Authentication"
            description="Disabled"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        {/* About & Help */}
        <List.Section style={appStyles.settingsSection}>
          <List.Subheader>About & Help</List.Subheader>
          <List.Item
            title="Help Center"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="App Version"
            description="1.0.0"
          />
        </List.Section>
        
        <Button 
          mode="contained" 
          icon="logout" 
          buttonColor={theme.colors.error}
          textColor="#FFFFFF"
          style={appStyles.logoutButton}
          onPress={handleSignOut}
        >
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}