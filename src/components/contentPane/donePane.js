import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import { refreshWorkDateDataId } from '../../redux/workDates/workDateAction';
import firebase from '..//../firebase'

class DonePane extends Component {
    state = {
        workRef: firebase.database().ref('works')

    }
    handleDeleteWork(work) {
        const { workRef } = this.state;
        const { workDateId } = this.props;

        workRef.child(workDateId)
            .child(work.id)
            .remove()
            .then(() => {
                this.props.refreshWorkDateDataId(Math.random())
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { doneWorks, } = this.props;
        return (
            <Segment className='ui orange segment' stacked>
                <Header>
                    <Icon name='calendar check outline' color='orange'></Icon>
                    <Header.Content>DONE</Header.Content>
                </Header>
                <Divider></Divider>
                {doneWorks && doneWorks.length > 0 && doneWorks.map(item =>
                (<Segment key={item.id} className='ui teal segment' attached clearing>
                    {item.name}
                    <Button icon='trash alternate' inverted color='red'
                        onClick={() => this.handleDeleteWork(item)}
                        floated='right' size='tiny'></Button>
                </Segment>))}

            </Segment>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    refreshWorkDateDataId: (id) => dispatch(refreshWorkDateDataId(id))
})
export default connect(null, mapDispatchToProps)(DonePane)