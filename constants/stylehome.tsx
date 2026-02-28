import { StyleSheet } from "react-native";
import { Colors } from "./theme";

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    container: {
        paddingBottom: 40,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 45,
        paddingBottom: 20,
    },
    containerLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    imgLogo: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    txtLogo: {
        fontSize: 22,
        fontWeight: '900',
        color: Colors.light.text,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 30,
    },
    carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselItem: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.light.colorPrimary,
        overflow: 'hidden',
        flex: 1,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    badge: {
        backgroundColor: Colors.light.backgroundBadge,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    badgeTxt: {
        color: Colors.light.colorPrimary,
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    titlePrin: {
        fontSize: 38,
        fontWeight: '800',
        color: Colors.light.text,
        textAlign: 'center',
        lineHeight: 44,
    },
    titlePrinWord: {
        color: Colors.light.colorPrimary,
    },
    descriptionPrin: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 24,
    },
    btnStart: {
        width: '100%',
        marginTop: 25,
        gap: 12,
    },
    btnPrin: {
        backgroundColor: Colors.light.colorPrimary,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        width: '100%',
    },
    btnPrinTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionHow: {
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    sectionBadge: {
        color: Colors.light.colorPrimary,
        fontSize: 12,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
    },
    sectionHowTitle: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 30,
        color: Colors.light.text,
    },
    cardHow: {
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: Colors.light.backgroundSecondary,
        borderColor: Colors.light.borderColor,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
    },
    containerIconsHow: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: Colors.light.text,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    numberHow: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 8,
    },
    descriptionHow: {
        textAlign: 'center',
        color: Colors.light.textSecondary,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    containerRegister: {
        backgroundColor: Colors.light.text,
        margin: 20,
        borderRadius: 28,
        padding: 30,
        alignItems: 'center',
    },
    containerRegisterTitle: {
        color: Colors.light.background,
        fontSize: 26,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12,
    },
    containerRegisterDescription: {
        color: Colors.light.background,
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 15,
        lineHeight: 22,
    }
});

export default styles;