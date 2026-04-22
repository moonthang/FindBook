import { StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

const styles = StyleSheet.create({
    titelSection: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    searchcontainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light.borderColor,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    booksGrid: {
        gap: 24,
        paddingBottom: 40,
        paddingHorizontal: 4,
        alignItems: 'center',
        width: '100%',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIconContainer: {
        width: 200,
        height: 200,
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    emptyGlow: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(238, 108, 43, 0.05)',
    },
    emptyIcon: {
        fontSize: 80,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        maxWidth: 280,
        marginBottom: 24,
        lineHeight: 20,
    },
    btnEmpty: {
        height: 52,
        paddingHorizontal: 32,
        borderRadius: 12,
        backgroundColor: Colors.light.colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.colorPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    btnTxtEmpty: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default styles;