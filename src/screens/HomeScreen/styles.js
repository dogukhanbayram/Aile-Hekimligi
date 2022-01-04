import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 20,
        marginBottom: 20,
        flex: 0.6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        marginTop: 50,
        flex: 0.2,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    input: {
        height: 48,
        width:260,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    logout: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#b23b3b',
        width: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        flex:4,
        width:300,
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        flex:1,
        flexDirection:'row',
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    logo: {
        marginTop: 20,
        height: 200,
        width: 200,
        alignSelf: "center",
        borderRadius: 100,
    },
    sil: {
        height:27,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        width: 27,
        alignItems: "center",
        justifyContent: 'center'
    },
    silText: {
        color: 'red',
        fontSize: 20
    },
    entityText: {
        flex:0.9,
        flexDirection:'row',
        fontSize: 20,
        color: '#333333'
    }
})
