import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import Nota from "./src/componentes/Nota";
import NotaEditor from "./src/componentes/NotaEditor";
import Filtro from "./src/componentes/Filtro";
import { useEffect, useState } from "react";
import { buscaNotas, criaTabela, deletaTabela } from "./src/services/Notas";
import { Picker } from "@react-native-picker/picker";
export default function App() {
    const [notas, setNotas] = useState([]);
    const [notaSelecionada, setNotaSelecionada] = useState({});
    const [filtro, setFiltro] = useState("Todos");
    async function mostraNotas() {
        const todasNotas = await buscaNotas(filtro);
        setNotas(todasNotas);
        // console.log(todasNotas);
    }

    useEffect(() => {
        // deletaTabela();
        criaTabela();
        mostraNotas();
    }, [filtro]);

    // console.log(notas);
    return (
        <SafeAreaView style={estilos.container}>
            <View style={estilos.picker}>
                <Picker
                    selectedValue={filtro}
                    onValueChange={setFiltro}>
                    <Picker.Item label="Todos" value="Todos" />
                    <Picker.Item label="Pessoal" value="Pessoal" />
                    <Picker.Item label="Trabalho" value="Trabalho" />
                    <Picker.Item label="Outros" value="Outros" />
                </Picker>
            </View>
            {/* <Filtro setFiltro={ setFiltro} /> */}
            <FlatList
                data={notas}
                renderItem={(item) => (
                    <Nota {...item} setNotaSelecionada={setNotaSelecionada} />
                )}
                keyExtractor={(item) => item.id}
            />
            <NotaEditor
                mostraNotas={mostraNotas}
                notaSelecionada={notaSelecionada}
                setNotaSelecionada={setNotaSelecionada}
            />
            <StatusBar />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    picker: {
        borderWidth: 1,
        margin: 16,
        borderRadius: 5,
    },
});
