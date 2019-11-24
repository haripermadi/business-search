import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Rating } from "react-native-elements";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import * as actions from "../../actions";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

class DetailBusiness extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name"),
      headerBackTitle: "hola",
      headerStyle: {
        backgroundColor: "#74b9ff"
      },
      headerTintColor: "#fff"
    };
  };

  state = {
    detail: {},
    entries: [],
    region: {
      longitude: -73.9306,
      latitude: 40.7352,
      longitudeDelta: 0.09,
      latitudeDelta: 0.3
    }
  };
  componentDidMount() {
    let id = this.props.navigation.getParam("id");
    // let id = "H4jJ7XB3CetIr1pg56CczQ";
    this.props.fetchBusinessDetail(id);
  }

  _renderItem({ item, index }, parallaxProps) {
    // console.log("image----", item);
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
    var detail = this.props.detail;
    if (Object.keys(detail).length > 0) {
      let reminderSign = detail.price ? 4 - detail.price.length : 4;
      return (
        <ScrollView style={styles.containerMain}>
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
              <Text style={styles.textTitle}>{detail.review_count}</Text>
              <Text style={styles.textContent}>Reviews</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.rating}>
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
          <View style={styles.containerMap}>
            <Text style={styles.textTitleMap}>Our Location</Text>
            <MapView
              style={styles.mapStyle}
              cacheEnabled={Platform.OS === "android" ? true : false}
              initialRegion={this.state.region}
            >
              <Marker
                coordinate={{
                  latitude: detail.coordinates.latitude,
                  longitude: detail.coordinates.longitude
                }}
                pinColor="red"
              />
            </MapView>
            <Text>Address: {detail.location.display_address.join(",")}</Text>
          </View>
        </ScrollView>
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

const mapStateToProps = state => {
  const { business } = state;
  return {
    detail: business.detail,
    entries: business.entries,
    test: business.test
  };
};

export default connect(mapStateToProps, actions)(DetailBusiness);
