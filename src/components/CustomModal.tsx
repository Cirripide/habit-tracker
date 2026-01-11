import {Modal, Pressable, View, StyleSheet} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {COLORS} from "../constants/colors";
import {ComponentProps, PropsWithChildren} from "react";

type ModalProps = {
    onPressClose: () => void;
} & ComponentProps<typeof Modal>;


export const CustomModal = ({onPressClose, children, ...modalProps}: PropsWithChildren<ModalProps>) => {

    return (
        <Modal {...modalProps}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable style={styles.closeButton} onPress={onPressClose}>
                        <FontAwesome6 name="window-close" size={35} color={COLORS.secondary}/>
                    </Pressable>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    }
})

export default CustomModal;
