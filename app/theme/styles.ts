import { StyleSheet, Dimensions } from 'react-native'
import { theme } from './theme'

const { width } = Dimensions.get('window')
const imageWidth = width - 32 

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  
  // 聊天页面样式
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  chatListContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  chatListItem: {
    paddingVertical: 8,
  },
  avatarContainer: {
    position: 'relative',
  },
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
  timeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  unreadBadge: {
    backgroundColor: theme.colors.accent,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: theme.colors.accent,
  },
  
  // 登录/注册页样式
  signedOutContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  welcomeCard: {
    padding: 8,
  },
  logo: {
    height: 180,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    marginTop: 16,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  appTitle: {
    marginTop: 16,
  },
  appDescription: {
    marginBottom: 24,
  },
  authButton: {
    width: '100%',
  },
  signInButton: {
    marginBottom: 12,
    width: '100%',
  },
  signUpButton: {
    width: '100%',
  },
  
  // 联系人页面样式
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    borderRadius: 20,
    elevation: 1,
  },
  contactListContent: {
    paddingHorizontal: 16,
  },
  contactItem: {
    paddingVertical: 8,
  },
  
  // 朋友圈页面样式
  momentsListContent: {
    padding: 16,
  },
  momentCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTextContainer: {
    marginLeft: 12,
  },
  momentContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    fontSize: 16,
  },
  momentImage: {
    width: imageWidth,
    height: imageWidth * 0.75,
    alignSelf: 'center',
  },
  momentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  
  // 设置页面样式
  settingsScrollContent: {
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileAvatar: {
    marginBottom: 16,
  },
  profileEditButton: {
    marginTop: 16,
  },
  settingsSection: {
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 8,
  },
  chatHeader: {
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  chatHeaderTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWithStatus: {
    position: 'relative',
    marginRight: 12,
  },
  statusIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    right: 0,
    bottom: 0,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 2,
  },
  myMessageBubble: {
    backgroundColor: theme.colors.primary,
  },
  theirMessageBubble: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  theirMessageText: {
    color: theme.colors.text,
  },
  messageTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginHorizontal: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: theme.colors.surface,
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 4,
    backgroundColor: theme.colors.primary,
  },
})

export default appStyles;