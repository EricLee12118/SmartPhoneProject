import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, TextInput, Button, Text, HelperText } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '@/app/theme/theme'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  const onSignInPress = async () => {
    if (!isLoaded || isLoading) return

    setError('')
    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title 
            title="Welcome Back" 
            titleVariant="headlineMedium" 
            titleStyle={{ textAlign: 'center' }}
            subtitle="Sign in to continue messaging"
            subtitleStyle={{ textAlign: 'center' }}
          />
          <Card.Content style={{ padding: 16 }}>
            <TextInput
              label="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
              error={!!error}
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry={secureTextEntry}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={secureTextEntry ? "eye" : "eye-off"} 
                  onPress={() => setSecureTextEntry(!secureTextEntry)} 
                />
              }
              error={!!error}
            />
            
            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}
            
            <Button 
              mode="contained" 
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
              onPress={onSignInPress}
            >
              Sign In
            </Button>
            
            <View style={styles.footer}>
              <Text variant="bodyMedium">Don't have an account?</Text>
              <Link href="/(auth)/sign-up" asChild>
                <Button mode="text" compact>Sign Up</Button>
              </Link>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});