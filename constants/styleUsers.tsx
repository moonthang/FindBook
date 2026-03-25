import { StyleSheet } from 'react-native';
import { Colors } from './theme';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  profileContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarContent: {
    width: 128,
    height: 128,
    borderRadius: 24,
    backgroundColor: Colors.light.backgroundBadge,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'white',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileDate: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.textSecondary,
  },
  dataSection: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.colorPrimary,
    marginBottom: 8,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: Colors.light.colorPrimary,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.light.backgroundBadge,
    fontSize: 16,
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  btnContainer: {
    marginTop: 16,
    gap: 16,
  },
  btnEdit: {
    height: 55,
    backgroundColor: Colors.light.colorPrimary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEditTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  btnDelete: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDeleteTxt: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  bookSavedCard: {
    backgroundColor: Colors.dark.background,
    borderRadius: 24,
    padding: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  circleTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.light.colorPrimary,
    opacity: 0.2,
  },
  circleBottom: {
    position: 'absolute',
    bottom: -64,
    left: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.light.colorPrimary,
    opacity: 0.1,
  },
  bookSavedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  booksTxtSection: {
    flex: 1,
  },
  booksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  booksLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: Colors.light.colorPrimary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  booksTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  booksSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.icon,
  },
  bookStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  bookItem: {
    width: 48,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookItem1: {
    backgroundColor: Colors.light.backgroundBadge,
    transform: [{ rotate: '-12deg' }],
    marginRight: -16,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bookItem2: {
    backgroundColor: 'white',
    transform: [{ rotate: '3deg' }],
    marginRight: -16,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  bookItem3: {
    backgroundColor: Colors.light.colorPrimary,
    transform: [{ rotate: '12deg' }],
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bookCover: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
});

export default styles;