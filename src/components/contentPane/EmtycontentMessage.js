import React from 'react'
import { Message } from 'semantic-ui-react'

const EmtycontentMessage = (props) => {
    return (
        <Message success>
            <Message.Header>No Works In The Day {props.workDate} 😜</Message.Header>
        </Message>
    )
}

export default EmtycontentMessage