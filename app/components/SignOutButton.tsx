import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
      <Text style={styles.signOutText}>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '500',
  },
});