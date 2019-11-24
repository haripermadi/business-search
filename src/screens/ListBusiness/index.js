import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { SearchBar, Card } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../actions";

import styles from "./styles";

class ListBusiness extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    search: "",
    listData: []
  };

  componentDidMount() {
    this.props.fetchBusinessList(this.state.search);
  }

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
          <View style={styles.containerDesc}>
            <Text style={styles.textTitle}>{item.name}</Text>
            <Text style={styles.textContent}>{item.review_count} Reviews</Text>
            <Text style={styles.textContent}>{item.rating} Starts</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
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
