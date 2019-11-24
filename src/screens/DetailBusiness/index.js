import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import { Rating, Icon } from "react-native-elements";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

const screenWidth = Dimensions.get("window").width;

class DetailBusiness extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name"),
      headerBackTitle: "hola",
      headerStyle: {
        backgroundColor: "#74b9ff"
      }
    };
  };

  state = {
    detail: {},
    entries: []
  };
  componentDidMount() {
    // console.log("id---", this.props.navigation.getParam("id"));
    // this.getDetailData();
    let id = this.props.navigation.getParam("id");
    this.props.fetchBusinessDetail(id);
  }

  // getDetailData = async () => {
  //   let id = this.props.navigation.getParam("id");
  //   // let id = "H4jJ7XB3CetIr1pg56CczQ";
  //   let APIKEY =
  //     "Bearer I14teEMWWpHIXE1Nd2I5FsTZ8mxh7N-ph6VI7OYvaL5G0ZqQ7MSusiLi0R1IRE0m35YhUDJ_CnLQPINO0aQSR3RupI-6FlF1BjuIAtsxzUxx5ahqs3oHpCTPNMPXXXYx";
  //   let url = `https://api.yelp.com/v3/businesses/${id}`;
  //   try {
  //     let response = await axios({
  //       method: "get",
  //       url,
  //       headers: {
  //         Authorization: APIKEY
  //       }
  //     });
  //     console.log("res- detail----", response);
  //     this.setState({
  //       detail: response.data,
  //       entries: response.data.photos
  //     });
  //   } catch (err) {
  //     console.log("err catch--detail--", err);
  //   }
  // };
  _renderItem({ item, index }, parallaxProps) {
    console.log("image----", item);
    return (
      <View style={styles.slide}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  }
  render() {
    console.log("detail props---", this.props);
    var detail = this.props.detail;
    if (Object.keys(detail).length > 0) {
      console.log("detail > 0-----------------");
      let reminderSign = detail.price ? 4 - detail.price.length : 4;
      return (
        <View style={{ flex: 1 }}>
          <View>
            {this.props.entries.length > 0 ? (
              <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.props.entries}
                renderItem={this._renderItem}
                hasParallaxImages={true}
              />
            ) : (
              <View style={styles.containerLoad}>
                <ActivityIndicator />
              </View>
            )}
          </View>
          <View style={styles.containerDetailData}>
            <View style={styles.containerReview}>
              <Text style={styles.textContent}>{detail.review_count}</Text>
              <Text style={styles.textContent}>Reviews</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.rating}>
                {/* <Text style={styles.textContent}>{detail.rating}</Text> */}
                <Rating imageSize={20} readonly startingValue={detail.rating} />
              </View>
              <View style={styles.price}>
                <Text style={styles.textPrice}>
                  {detail.price}
                  <Text style={{ color: "grey" }}>
                    {"$".repeat(reminderSign)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.containerLoad}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textContent: {
    textAlign: "center"
  },
  textPrice: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
    fontWeight: "bold"
  },
  slide: {
    width: screenWidth - 60,
    height: screenWidth / 2 + 20
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 10
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain"
  },
  containerLoad: {
    height: screenWidth / 2 + 20,
    justifyContent: "center"
  },
  containerDetailData: {
    borderColor: "#b2bec3",
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5
  },
  containerReview: {
    borderBottomWidth: 1,
    borderColor: "#b2bec3",
    padding: 10
  },
  rating: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#b2bec3",
    padding: 5
  },
  price: {
    flex: 1,
    padding: 5
  }
});

const mapStateToProps = state => {
  const { business } = state;
  return {
    detail: business.detail,
    entries: business.entries,
    test: business.test
  };
};

export default connect(mapStateToProps, actions)(DetailBusiness);
