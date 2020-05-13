import React ,{useState} from 'react';
import { StyleSheet, Text, View,Button, TextInput,ScrollView,FlatList,TouchableOpacity } from 'react-native';

import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.input}>
      <SearchBar
        placeholder="Search for stores..."
        onChangeText={this.updateSearch}
        value={search}
        
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
input:{
  paddingHorizontal:5,
  paddingVertical:6
}

})