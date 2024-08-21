import React, { useState } from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';

let timer:any = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App(){

    const [value, setValue] = useState('00:00:00');
    const [btnName, setBtnName] = useState('Start');
    const [last, setLast] = useState('');

    function start(){
        if (timer !== null) {
            setValue('00:00:00')
            setLast(value);
            clearInterval(timer);
            setBtnName('Start');
            resetVariables()
        } else {
            timer = setInterval(()=>{
                ss++;

                if (ss == 60) {
                    ss = 0;
                    mm++;
                } 

                if (mm == 60) {
                    mm = 0;
                    hh++;
                }

                let formatted = `${hh < 10? hh.toString().padStart(2,'0'):hh.toString()}:${mm < 10? mm.toString().padStart(2,'0'):mm.toString()}:${ss < 10? ss.toString().padStart(2,'0') : ss.toString()}`
                setValue(formatted);
            }, 1000);
            setBtnName('Stop');

        }
    }
    function resetVariables() {
        ss = 0;
        mm = 0;
        hh = 0;
        timer = null;
    }
    function clear(){
        clearInterval(timer);
        setValue('00:00:00');
        setBtnName('Start');
        setLast(value);
        resetVariables()
    }

    return(
        <View style={styles.container}>
            <Image
              source={require('@/assets/crono.png')}
            />
            <Text style={styles.timer}>{value}</Text>

            <View style={styles.containerButton}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText} onPress={start}>{btnName}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={clear}>
                    <Text style={styles.buttonText}>Clear</Text>
                </Pressable>
            </View>
            <View style={styles.lastTimeContent}>
                <Text style={styles.lastTime}>{last?`Último tempo: ${last}`:''}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.lastTime}>©Alexsander Sautier</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff002e'
    },
    timer: {
        marginTop: -160,
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: 130,
        height: 40
    },
    button:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        margin: 17,
        width: 150,
        borderRadius: 25
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#ff002e'
    },
    lastTimeContent: {
        marginTop: 40,
    },
    lastTime: {
        fontSize: 25,
        color: '#fff',
        fontStyle: 'italic'
    },
    footer: {
        marginTop: 40
    }
});