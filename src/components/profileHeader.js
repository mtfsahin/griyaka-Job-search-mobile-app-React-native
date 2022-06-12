import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'
import axios from 'axios';


class ProfileHeader extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            error: null,
        };
    }
    componentDidMount() {
        this.fetchUsers(this.state.page);
    }
    fetchMoreUsers = () => {
        this.setState({ isLoading: false }),
            this.setState(
                () => {
                    this.fetchUsers();
                },
            );
    };

    fetchUsers = () => {
        axios
            .get('http://griyaka.com/wp-json/wp/v2/candidate/7100')
            .then(response => {
                this.setState({
                    users: this.state.users.concat(response.data),
                });
            })
            .catch(error => {
                this.setState({ error: error });
            })
            
    };


    render() {
        return (
            <View style={styles.profileContainer}>
                {
                    this.state.users.map(user => (
                        <View style = {{alignItems : 'center' , justifyContent : 'center'}}>
                            <Image style={styles.userPp}
                                source={{ uri: user.metas._candidate_logo }}
                            ></Image>
                            <Text style = {styles.nameText}>
                                {user.title.rendered}
                            </Text>
                            <Text style = {styles.telText}>
                                {user.metas._candidate_phone}
                            </Text>
                        </View>
                    ))
                }
            </View>
        


        )
    }

}
const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 30,
        padding:5,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    userPp: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 42.5,
        borderWidth:3,
        height: 85,
        marginBottom: 0,
        width: 85,
        marginTop:-40
    },
    nameText: {
        color: '#25262B',
        fontSize: 24,
        textAlign: 'center',
        fontFamily:'Poppins-Bold',
        
    },
    telText: {
        color: '#353637',
        fontSize: 18,
        textAlign: 'center',
        fontFamily:'Poppins-Regular',
        marginTop:-10
    },
})
export default ProfileHeader