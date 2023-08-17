import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import { refreshWorkDateDataId } from '../../redux/workDates/workDateAction'
import firebase from '..//../firebase'

class ToDoPane extends Component {
    state = {
        workRef: firebase.database().ref('works')
    }
    handleDeleteWork = (work) => {
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
    handleUpdateStatus = (work) => {
        const { workRef } = this.state;
        const { workDateId, refreshWorkDateDataId } = this.props

        workRef
            .child(workDateId)
            .child(work.id)
            .update({
                name: work.name,
                status: 'DONE',
                timestamp: firebase.database.ServerValue.TIMESTAMP
            })
            .then((updateWord) => {
                console.log(updateWord);
                refreshWorkDateDataId(Math.random());
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const { toDoWorks } = this.props;
        console.log(toDoWorks);
        return (
            <Segment className='ui pink segment' stacked>
                <Header>
                    <Icon name='bell' color='yellow'></Icon>
                    <Header.Content>TO-DO</Header.Content>
                </Header>
                <Divider></Divider>
                {toDoWorks && toDoWorks.length > 0 && toDoWorks.map(item =>
                (<Segment key={item.id} className='ui brown segment' attached clearing>
                    {item.name}
                    <Button icon='trash alternate' inverted
                        color='red' floated='right' size='tiny'
                        onClick={() => this.handleDeleteWork(item)}>
                    </Button>
                    <Button icon='checkmark' inverted color='green'
                        floated='right' size='tiny'
                        onClick={() => this.handleUpdateStatus(item)}>
                    </Button>
                </Segment>))}

            </Segment>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    refreshWorkDateDataId: (id) => dispatch(refreshWorkDateDataId(id))
})
export default connect(null, mapDispatchToProps)(ToDoPane)