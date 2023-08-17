import React, { Component, Fragment } from 'react'
import { Grid, } from 'semantic-ui-react'
import ToDoPane from './toDoPane'
import DonePane from './donePane'
import firebase from '..//../firebase'
import Spinner from '..//ui/spinner'
import EmtycontentMessage from './EmtycontentMessage'

class ContentPane extends Component {
    state = {
        worksRef: firebase.database().ref('works'),
        workDateId: this.props.workDateId,
        toDoWorks: [],
        loading: true,
        doneWorks: [],
        hasWork: true
    }
    componentDidMount() {
        const { workDateId } = this.state;
        if (workDateId) this.addListeners(workDateId)
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    addListeners = (workDateId) => {
        let toDoWorks = [];
        let doneWorks = [];
        const { worksRef } = this.state;
        worksRef.child(workDateId).on('child_added', (snap) => {
            console.log(snap.val());

            this.retrieveWorks(snap.val(), snap.key, toDoWorks, doneWorks)
        })

        worksRef.child(workDateId).once('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ hasWork: false, loading: false })
            } else {
                this.setState({ hasWork: true })
            }
        })
    }
    retrieveWorks = (work, key, toDoWorks, doneWorks) => {
        if (work.status === 'TODO') {
            toDoWorks.push({ id: key, ...work })
        } else {
            doneWorks.push({ id: key, ...work })
        }
        this.setState({
            toDoWorks,
            doneWorks,
            loading: false
        })
    }
    removeListeners = () => {
        this.state.worksRef.off();
    }


    render() {
        const { loading, workDateId, toDoWorks, doneWorks, hasWork } = this.state
        return (
            <Fragment>
                {loading && (<Spinner></Spinner>)}
                {hasWork &&
                    (<Grid>
                        <Grid.Column width={8}>
                            <ToDoPane key={`t${toDoWorks.length}`} toDoWorks={toDoWorks} workDateId={workDateId}></ToDoPane>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <DonePane key={`t${doneWorks.length}`} doneWorks={doneWorks} workDateId={workDateId}></DonePane>
                        </Grid.Column>
                    </Grid>)}
                {!hasWork &&
                    (
                        <EmtycontentMessage workDate={this.props.workDate}></EmtycontentMessage>
                    )}
            </Fragment>

        )
    }
}
export default ContentPane