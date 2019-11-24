import { Dimensions, StyleSheet, Platform } from "react-native";
import Scaling from "../../helper/Scaling";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    paddingTop:
      Platform.OS == "ios"
        ? screenHeight >= 812
          ? Scaling.moderateScale(45)
          : Scaling.moderateScale(10)
        : Scaling.moderateScale(30),
    backgroundColor: "#74b9ff"
  },
  searchStyle: {
    backgroundColor: "#74b9ff",
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  inputSearch: {
    backgroundColor: "#0984e3"
  },
  containerLoader: {
    height: screenHeight * 0.8,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  cardStyle: {
    borderColor: "transparent",
    width: screenWidth / 2 - Scaling.moderateScale(10),
    height: Scaling.moderateScale(230),
    marginHorizontal: Scaling.moderateScale(5)
  },
  textTitle: {
    fontSize: Scaling.moderateScale(14),
    fontWeight: "bold",
    marginVertical: Scaling.moderateScale(2)
  },
  textContent: {
    fontSize: Scaling.moderateScale(12),
    marginVertical: Scaling.moderateScale(2)
  },
  containerDesc: {
    marginBottom: Scaling.moderateScale(10)
  }
});
