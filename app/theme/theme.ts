import { MD3LightTheme } from 'react-native-paper';

// 定义应用主题
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5C6BC0',
    secondary: '#7986CB',
    accent: '#3D5AFE',
    background: '#F5F7FB',
    surface: '#FFFFFF',
    text: '#333333',
    error: '#EF5350',
    onSurface: '#333333',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0,0,0,0.5)',
    notification: '#FF4081',
    // 自定义颜色
    textSecondary: '#757575',
    online: '#4CAF50',
    card: '#FFFFFF',
    border: '#E0E0E0',
  },
  roundness: 12,
};

// 简单的全局样式
export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // 这些可能仍然需要以兼容现有代码
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
};

export const colors = theme.colors;

export default theme;