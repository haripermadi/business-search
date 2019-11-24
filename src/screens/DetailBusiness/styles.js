import { Dimensions, StyleSheet, Platform } from "react-native";
import Scaling from "../../helper/Scaling";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    marginTop: Scaling.moderateScale(20)
  },
  textContent: {
    textAlign: "center",
    fontSize: Scaling.moderateScale(14)
  },
  textTitle: {
    fontSize: Scaling.moderateScale(20),
    textAlign: "center"
  },
  textTitleMap: {
    fontSize: Scaling.moderateScale(16),
    marginBottom: Scaling.moderateScale(10)
  },
  textPrice: {
    textAlign: "center",
    color: "green",
    fontSize: Scaling.moderateScale(16),
    fontWeight: "bold"
  },
  slide: {
    width: screenWidth - Scaling.moderateScale(60),
    height: screenWidth / 2 + Scaling.moderateScale(20)
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: Scaling.moderateScale(10)
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain"
  },
  containerLoad: {
    height: screenWidth / 2 + Scaling.moderateScale(20),
    justifyContent: "center"
  },
  containerDetailData: {
    borderColor: "#b2bec3",
    borderWidth: Scaling.moderateScale(1),
    marginTop: Scaling.moderateScale(20),
    marginHorizontal: Scaling.moderateScale(20),
    borderRadius: Scaling.moderateScale(5)
  },
  containerReview: {
    borderBottomWidth: Scaling.moderateScale(1),
    borderColor: "#b2bec3",
    padding: Scaling.moderateScale(10)
  },
  rating: {
    flex: 1,
    borderRightWidth: Scaling.moderateScale(1),
    borderColor: "#b2bec3",
    padding: Scaling.moderateScale(5)
  },
  price: {
    flex: 1,
    padding: Scaling.moderateScale(5)
  },
  containerMap: {
    height: screenWidth / 2 + Scaling.moderateScale(50),
    width: screenWidth,
    marginVertical: Scaling.moderateScale(30),
    paddingHorizontal: Scaling.moderateScale(10),
    justifyContent: "center"
  },
  mapStyle: {
    flex: 1,
    marginBottom: Scaling.moderateScale(5)
  }
});
