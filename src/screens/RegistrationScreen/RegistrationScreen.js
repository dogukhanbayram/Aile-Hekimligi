import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const rastgeleIndex = Math.floor(Math.random() * 6);

    const rastgeleHekim = () => {
        const hekimler = ["Mustafa EKİCİ", "Furkan YILDIZ", "Sıla ALTIN", "Neşet KESKİN", "Aysu TOPAL", "Hilal KISA"];
        return hekimler[rastgeleIndex];
        
    }

    const rastgeleResim = () => {
        const resimler = [ "https://yt3.ggpht.com/ytc/AKedOLSKtGMWDQ43_1SKX53sKoIFBotUtJqi4wL-GUTkWA=s900-c-k-c0x00ffffff-no-rj", 
                            "https://www.istanbulmedicalcenter.com/wp-content/uploads/2021/02/evde-doktor-hizmetleri.jpg", 
                            "https://myteledoc.app/wp-content/uploads/2020/09/happy-young-female-doctor-smiling-and-looking-at-c-WDEKYYG.jpg", 
                            "https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png", 
                            "https://ddcorlando.com/wp-content/uploads/2020/01/beautiful-young-female-doctor-looking-camera-office_1301-7781.jpg", 
                            "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"];
        return resimler[rastgeleIndex];
        
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor.")
            return
        }
    
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    aileHekimi: rastgeleHekim(),
                    aileHekimiImg: rastgeleResim(),
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Ad-Soyad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifre'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifre tekrarı'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Hesap Oluştur</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Hesabınız var mı? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Giriş yapın</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
