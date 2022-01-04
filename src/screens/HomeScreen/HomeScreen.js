import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import DateTimePicker from 'react-native-modal-datetime-picker';

function refreshPage() {
    window.location.reload(false);
}

function makeTwoDigits (time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
  }

const sil = (isim) =>{
    firebase.firestore().collection("randevular").where("text", "==", isim).get()
    .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
    });
}

const logOut = () =>{
    firebase
      .auth()
      .signOut()
  }

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('randevular')
    const userID = props.extraData.id
    const userName = props.extraData.fullName
    const medic = props.extraData.aileHekimi
    const medicPhoto = {uri: props.extraData.aileHekimiImg}

    const [isDateTimePickerVisible, setVis] = useState(false)


    _showDateTimePicker = () => setVis( true );

    _hideDateTimePicker = () => setVis(false);

    _handleDatePicked = (pickeddate) => {
        day   = pickeddate.getDate();
        day  = makeTwoDigits(day);
        month = Number(pickeddate.getMonth()) + 1;
        month  = makeTwoDigits(month);
        year  = pickeddate.getFullYear();
        hour  = pickeddate.getHours();
        hour  = makeTwoDigits(hour);
        minute  = pickeddate.getMinutes();
        minute  = makeTwoDigits(minute);
        exdate = day + '-' + month + '-' + year+ ' ' + hour + ':' + minute
        setEntityText(day + '-' + month + '-' + year + ' ' + hour + ':' + minute) 
        _hideDateTimePicker();
    };

    onFocus = () => {
        _handleDatePicked();
    }

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('text', 'asc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.text}
                </Text>
                <TouchableOpacity style={styles.sil} onPress={()=>sil(item.text)}>
                <Text style={styles.silText}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const onChanged = (text)=> {
        setEntityText(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 20}}>Merhaba {userName}!</Text>
            </View>
            <View style={{marginTop:20}}>
            <Image style={styles.logo}  source={medicPhoto}/>
            <Text style={{ fontSize: 20}}>Aile Hekiminiz: {medic}</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Randevu almak istediğiniz tarih'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => onChanged(text)}
                    onFocus={ () => _showDateTimePicker() }
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    maxLength={16}
                />
                <DateTimePicker
                      isVisible={isDateTimePickerVisible}
                      onConfirm={_handleDatePicked}
                      onCancel={_hideDateTimePicker}
                      mode={'datetime'}
                      datePickerModeAndroid={'spinner'}

                    />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Randevu Al</Text>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.logout} onPress={()=>{logOut();refreshPage()}}>
                <Text style={styles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Randevularınız</Text>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}
