import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  body:{
    backgroundColor:'#424242',
    padding:30,
    // borderTopLeftRadius:150,
    // flex:1,
    // padding:20
    height:'100%',
    // flex:1
},
  titleText: {
    fontSize: 18,
    fontFamily:'nunito-bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});