import { Stack } from 'expo-router/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from '@/app/theme/theme'

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </PaperProvider>
  )
}