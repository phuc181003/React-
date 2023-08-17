import React, { Component } from 'react'
import { Divider, Segment } from 'semantic-ui-react'
import HeaderPane from './headerPane'
import UserPane from './userPane'
import WorkDatePane from './workDatePane'

class SidePane extends Component {
    render() {
        return (
            <Segment className='ui orange segment'>
                <HeaderPane discoloration={this.props.discoloration}></HeaderPane>
                <Divider></Divider>

                <UserPane onSignout={this.props.onSignout}></UserPane>
                <Divider></Divider>
                <WorkDatePane></WorkDatePane>
            </Segment>
        )
    }
}

export default SidePane