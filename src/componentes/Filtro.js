import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Filtro({ filtro, setFiltro}) {
    console.log(filtro);
    
    return (
        <View style={ estilos.container}>
            <Picker
                selectedValue={filtro}
                onValueChange={setFiltro}>
                <Picker.Item label="Todos" value="Todos"/>
                <Picker.Item label="Pessoal" value="Pessoal"/>
                <Picker.Item label="Trabalho" value="Trabalho"/>
                <Picker.Item label="Outros" value="Outros"/>
            </Picker>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 16,
        borderRadius: 5,
    }
});
