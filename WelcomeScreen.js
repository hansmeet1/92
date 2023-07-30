import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground
} from "react-native";

import SantaAnimation from "../components/SantaClaus.js";
import db from "../config";
import firebase from "firebase";

import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      interests:'',
      userType:'Animal_Lover',
      contact: "",
      confirmPassword: "",
      isModalVisible: "false",
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailId, password).then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            IsPetRequestActive: false,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogin = (emailId, password) => {
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(() => {
        this.props.navigation.navigate("DonatePets");
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
              <View style={{flex:0.95}}>
                  <Text style={styles.label}>First Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"First Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Last Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Last Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Contact </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                  />

                  <Text style={styles.label}> Address </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Email </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    onChangeText={(text) => {
                      this.setState({
                        emailId: text,
                      });
                    }}
                  />

                  <Text style={styles.label}> Password </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                  />

                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Confrim Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                  />
              </View>

            <View style={{flex:0.2,alignItems:'center'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text
               style={styles.cancelButtonText}
               onPress={() => {
                 this.setState({ isModalVisible: false });
               }}
              >
              Cancel
              </Text>
            </View>
        </ScrollView>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={styles.santaView}>
          <Image
          source={require('../assets/pets.png')}
          style={styles.santaImage}
           />
         </View>
        <View style={{ flex: 0.45 }}>

          <View style={styles.TextInput}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            placeholderTextColor = {C5}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={[styles.loginBox,{marginTop:RFValue(15)}]}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor = {C5}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          </View>
          <View style={{flex:0.5,  alignItems:"center",}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);  
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>

          </View>
        </View>

        <View
          style={{ flex: 0.3}}
        >
      
        </View>
      </View>
    );
  }
}

var C1 = '#004643'; //background
var C2 = "#44BBA4"; //labels and loginbox
var C3 = "#E7BB41"; //button
var C4 = '#393E41'; //modal bg
var C5 = '#E7E5DF'; //cancel button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C1,
  },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderBottomWidth: 1.5,
    borderBottomColor: C2,
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
    marginTop:-20,
    color:C5
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: C3,
    shadowColor: "#000",
    marginBottom:RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText: {
    color: C1,
    fontWeight: "200",
    fontSize: RFValue(20),
  },
  label:{
    fontSize:RFValue(13),
    color:C2,
    fontWeight:'bold',
    paddingLeft:RFValue(10),
    marginLeft:RFValue(20)
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth:1,
    borderRadius:2,
    borderColor:C1,
    paddingBottom:RFValue(10),
    marginLeft:RFValue(20),
    marginBottom:RFValue(14),
    color:C5
  },
  cancelButtonText:{
    fontSize : RFValue(20),
    fontWeight:'bold',
    color: C5,
    marginTop:RFValue(10)
  },
  scrollview:{
    flex: 1,
    backgroundColor: C4
  },
  signupView:{
    flex:0.05,
    justifyContent:'center',
    alignItems:'center'
},
signupText:{
  fontSize:RFValue(20),
  fontWeight:"bold",
  color:C2
},
santaView:{
  height:'25%',
  width:'100%',
  justifyContent:"center",
  alignItems:"center",
  marginTop:'10%',
  marginBottom:'5%'
},
santaImage:{
  width:"100%",
  height:"100%",
  resizeMode:"cover"
},
TextInput:{
  flex:0.5,
  alignItems:"center",
  justifyContent:"center"
},

});