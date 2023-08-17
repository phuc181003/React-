
import { Divider, Grid } from 'semantic-ui-react';
import './App.css';
import React, { Component } from 'react'
import SidePane from './sidePane/sidePane';
import firebase from '..//firebase'
import { connect } from 'react-redux';
import { clearUser, setUser } from '../redux/users/userActions';
import TopHeaderPane from './topPane/topHeaderPane';
import ContentPane from './contentPane/contentPane';
import EmtycontentMessage from './contentPane/EmtycontentMessage';


class App extends Component {
  state = {
    isDarkTheme: false, // Trạng thái chủ đề: true (dark), false (light)
  };

  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.clearUser();
    })
  }
  discoloration = () => {
    console.log("hello");
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  }
  render() {
    const { isDarkTheme } = this.state;

    const { workDate, workDateData, refreshWorkDateDataId } = this.props;

    return (
      <Grid stretched style={{ height: "100vh" }} className={isDarkTheme ? "grey" : "light"} stackable>
        <Grid.Column width={4}  >
          <SidePane onSignout={this.handleSignOut} discoloration={this.discoloration} className={isDarkTheme ? "grey" : "light"}></SidePane>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Column width={16}>
              <Grid.Row>
                <TopHeaderPane>

                </TopHeaderPane>
              </Grid.Row>
              <Divider></Divider>
              <Grid.Row>
                {this.props.workDateData ?
                  <ContentPane key={`${workDateData.id}${refreshWorkDateDataId}`}
                    workDateId={workDateData.id} workDate={workDate}
                  ></ContentPane> :
                  <EmtycontentMessage workDate={workDate}></EmtycontentMessage>
                }
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}



const mapStateToProps = ({ users: { loading }, workDates: { workDate, workDateData, refreshWorkDateDataId } }) => ({
  loading: loading,
  workDate: workDate,
  workDateData,
  refreshWorkDateDataId
})
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
