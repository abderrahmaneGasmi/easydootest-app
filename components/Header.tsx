import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/context/Authcontext";

const Header = () => {
  const { signOut } = useSession();

  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.header}>
      <View></View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
          }}
        />

        <Text style={styles.logotext}>EasydooTest</Text>
      </View>
      <View
        style={{
          position: "relative",
        }}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons
            name="settings-outline"
            size={30}
            color={colors.primary}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.overlay}>
              <View
                style={{
                  // height: normalize(60),
                  width: normalize(60),
                  // justifyContent: "flex-end",
                  // alignSelf: "flex-end",
                  backgroundColor: colors.white,
                  shadowColor: colors.black,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  position: "absolute",
                  top: normalize(38),
                  right: normalize(0),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    signOut();
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      borderBottomColor: colors.lightgray,
                      padding: normalize(10),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: typography.large,
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: normalize(15),
    paddingBottom: normalize(15),
    paddingHorizontal: normalize(5),
    backgroundColor: colors.white,
    // padding: 20,
    position: "relative",
  },
  logotext: {
    fontSize: typography.large,
    color: colors.primary,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
