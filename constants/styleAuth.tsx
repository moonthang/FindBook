import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.light.backgroundSecondary,
    },
    container: {
        paddingBottom: 40,
    },
    btnBack: {
        paddingHorizontal: 24,
        paddingTop: 50,
    },
    content: {
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    containerLogo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    imgLogo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    txtLogo: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.light.text,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        textAlign: 'center',
        marginBottom: 15,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.light.borderColor,
        borderRadius: 20,
        padding: 20,
        shadowColor: Colors.light.text,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderColor: Colors.light.borderColor,
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: Colors.light.background,
        fontSize: 16,
        marginBottom: 20,
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtForgot: {
        color: Colors.light.colorPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.borderColor,
        borderRadius: 12,
        backgroundColor: Colors.light.background,
        paddingRight: 15,
        marginBottom: 25,
    },
    btnLogin: {
        backgroundColor: Colors.light.colorPrimary,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLoginTxt: {
        color: Colors.light.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light.borderColor,
    },
    txtDivider: {
        marginHorizontal: 10,
        color: Colors.light.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    btnSocial: {
        flex: 1,
        height: 55,
        borderWidth: 1,
        borderColor: Colors.light.borderColor,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    txtSocial: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    contentSecundary: {
        paddingTop: 20,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});