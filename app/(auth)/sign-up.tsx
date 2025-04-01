// app/(auth)/sign-up.tsx
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Card, TextInput, Button, Text, HelperText } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '@/app/theme/theme'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return

    setIsLoading(true)
    setError('')

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return
    
    setIsLoading(true)
    setError('')

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError('Verification incomplete. Please try again.')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Title 
              title="Verify Your Email" 
              titleVariant="headlineMedium" 
              titleStyle={{ textAlign: 'center' }}
              subtitle={`We've sent a verification code to ${emailAddress}`}
              subtitleStyle={{ textAlign: 'center' }}
            />
            <Card.Content style={{ padding: 16 }}>
              <TextInput
                label="Verification Code"
                value={code}
                onChangeText={setCode}
                mode="outlined"
                style={styles.input}
                keyboardType="number-pad"
                left={<TextInput.Icon icon="shield-check" />}
                error={!!error}
                autoFocus
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
                onPress={onVerifyPress}
              >
                Verify Email
              </Button>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title 
            title="Create Account" 
            titleVariant="headlineMedium" 
            titleStyle={{ textAlign: 'center' }}
            subtitle="Join our messaging platform"
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
              onPress={onSignUpPress}
            >
              Sign Up
            </Button>
            
            <View style={styles.footer}>
              <Text variant="bodyMedium">Already have an account?</Text>
              <Link href="/(auth)/sign-in" asChild>
                <Button mode="text" compact>Sign In</Button>
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