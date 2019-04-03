import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Signin from "./components/auth/auth-pages/Signin";
import Signup from "./components/auth/auth-pages//Signup";
import Districts from "./components/Districts";
import Forgot from "./components/auth/auth-pages//Forgot";
import Dashboard from "./components/screens/Dashboard";
import LandingScreen from "./components/screens/LandingScreen";
import SelectRooms from "./components/screens/SelectRooms";
import ClusterMap from "./components/screens/ClusterMap";
import SearchFilter from "./components/screens/SearchFilter";
import DetailsLanding from "./components/screens/DetailsLanding";
import ProfileLanding from "./components/auth/auth-from/ProfileLanding";
import AppStartUp from './AppStartUp';
import ResetPassword from "./components/auth/auth-pages//ResetPassword";
import HouseBookedListLanding from "./components/screens/HouseBookedLanding";
export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="dashboard" component={Dashboard} title="Dashboard" />
          <Scene
            key="selectRooms"
            component={SelectRooms}
            title="SelectRooms"
          />
          
          <Scene
            key="landingScreen"
            component={LandingScreen}
            title="LandingScreen"
          />
          
          <Scene key="clusterMap" component={ClusterMap} title="clusterMap" />
          <Scene
            key="searchFilter"
            component={SearchFilter}
            title="searchFilter"
          />
          <Scene
            key="signin"
            component={Signin}
            title="Signin"
          />
          <Scene
            key="districts"
            component={Districts}
            title="Districts"
          />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="forgot" component={Forgot} title="Forgot Password" />
          <Scene
            key="detailsLanding"
            component={DetailsLanding}
            title="Housedetails"
          />
          <Scene
            key="profile"
            component={ProfileLanding}
            title="Profile"
          />
           <Scene
            key="startup"
            component={AppStartUp}
            title="AppRoutes"
          />
          <Scene
            key="resetpswd"
            component={ResetPassword}
            title="resetpswd"
          />
          <Scene
            key="showBookedHouse"
            component={HouseBookedListLanding}
            title="showBookedHouse"
          />
        </Stack>
      </Router>
    );
  }
}
