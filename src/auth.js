import appConfig from './config'

import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";
export default {
    signup: function (username, email, password) {
        var _this = this
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        var attributeList = [];
        var dataEmail = {
            Name: 'email',
            Value: email
        }
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);
        return new Promise((resolve, reject) => {
            userPool.signUp(username, password, attributeList, null,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        console.log('username is ' + result.user.
                            getUsername());
                        resolve(result)
                    }
                })
        })
    },
    confirm: function (username, confirmation_number) {
        var _this = this
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(confirmation_number,
                true, function (err, result) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        console.log('call result: ' + result);
                        _this.onChange(true)
                        resolve(result)
                    }
                });
        })
    },
    authenticate: function (username, password) {
        var _this = this
        var authenticationData = {
            Username: username,
            Password: password,
        };
        var authenticationDetails = new AuthenticationDetails
            (authenticationData);
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('access token + ' + result.
                        getAccessToken().getJwtToken());
                    console.log('idToken + ' + result.idToken.
                        jwtToken);
                    console.log('Successfully logged in !');
                    _this.onChange(true);
                    resolve(result);
                },
                onFailure: function (err) {
                    console.log(err);
                    _this.onChange(false);
                    reject(err);
                },
                newPasswordRequired: function (userAttributes,
                    requiredAttributes) {
                    var attributesData = {
                        name: username
                    };
                    cognitoUser.completeNewPasswordChallenge
                        ("Password1", attributesData, this)
                }
            })
        })
    },
    loggedIn: function () {
        var _this = this
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log(err);
                    return false;
                }
                console.log('session validity: ' + session.isValid());
                cognitoUser.getUserAttributes(function (err,
                    attributes) {
                    if (err) {
                        console.log(err);
                        return false;
                    } else {
                        for (let i = 0; i < attributes.length; i++) {
                            //// console.log(attributes[i].getName()); /////
                            if (attributes[i].getName() == "email") {
                                console.log('login user is ' +
                                    attributes[i].getValue());
                            }
                        }
                    }
                });
            });
            return true;
        } else {
            return false;
        }
    },
    logout: function () {
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        userPool.getCurrentUser().signOut()
        this.onChange(false)
        console.log("Successfully logged out.")
    },
    get_id_token: function () {
        var poolData = {
            UserPoolId: appConfig.UserPoolId,
            ClientId: appConfig.UserPoolClientId
        };
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser()
        var id_token = ""
        cognitoUser.getSession(function (err, result) {
            id_token = result.getIdToken().getJwtToken()
        })
        return id_token
    },
    onChange: function () {console.log("---- onChange ----") },
}