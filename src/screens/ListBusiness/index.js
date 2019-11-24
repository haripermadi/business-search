import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from "react-native";
import { SearchBar, Card } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Scaling from "../../helper/Scaling";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ListBusiness extends Component {
  static navigationOptions = {
    header: null
    // headerBackTitle: null
  };
  state = {
    search: "",
    listData: []
  };

  componentDidMount() {
    // this.getDataBusiness();
    this.props.fetchBusinessList(this.state.search);
  }

  getDataBusiness = async () => {
    let APIKEY =
      "Bearer I14teEMWWpHIXE1Nd2I5FsTZ8mxh7N-ph6VI7OYvaL5G0ZqQ7MSusiLi0R1IRE0m35YhUDJ_CnLQPINO0aQSR3RupI-6FlF1BjuIAtsxzUxx5ahqs3oHpCTPNMPXXXYx";
    let url = "https://api.yelp.com/v3/businesses/search";
    try {
      let response = await axios({
        method: "get",
        url,
        headers: {
          Authorization: APIKEY
        },
        params: {
          location: "new york",
          term: this.state.search
        }
      });
      console.log("res-----", response);
      this.setState({
        listData: [...response.data.businesses]
      });
    } catch (err) {
      console.log("err catch----", err);
    }
  };
  handleSearch = text => {
    this.setState(
      {
        search: text
      },
      () => {
        this.props.fetchBusinessList(this.state.search);
      }
    );
  };

  renderList = item => {
    // console.log("item----", item);
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          this.props.navigation.navigate("detail", {
            id: item.id,
            name: item.name
          })
        }
      >
        <Card
          image={{
            uri: item.image_url
          }}
          PlaceholderContent={
            <ActivityIndicator size="small" color="#00ff00" />
          }
          containerStyle={styles.cardStyle}
          imageStyle={styles.cardImageStyle}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textTitle}>{item.name}</Text>
            <Text style={styles.textContent}>{item.review_count} Reviews</Text>
            <Text style={styles.textContent}>{item.rating} Starts</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
    console.log("state---", this.props);
    return (
      <>
        <View style={styles.container}>
          <SearchBar
            placeholder="Search"
            placeholderTextColor="#fff"
            onChangeText={this.handleSearch}
            value={this.state.search}
            containerStyle={styles.searchStyle}
            inputContainerStyle={styles.inputSearch}
            inputStyle={{ color: "#fff" }}
          />
        </View>
        <View>
          {this.props.listData.length > 0 ? (
            <FlatList
              data={this.props.listData}
              renderItem={({ item }) => this.renderList(item)}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          ) : (
            <View style={styles.containerLoader}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:
      Platform.OS == "ios"
        ? screenHeight >= 812
          ? Scaling.moderateScale(45)
          : Scaling.moderateScale(5)
        : Scaling.moderateScale(5),
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
  }
});

const mapStateToProps = state => {
  const { business } = state;
  return {
    listData: business.listData,
    detail: business.detail,
    entries: business.entries,
    test: business.test
  };
};

export default connect(mapStateToProps, actions)(ListBusiness);
