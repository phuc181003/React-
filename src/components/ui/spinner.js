import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Spinner = () => {
    return (
        <Dimmer active>
            <Loader size='massive' content='loading...'></Loader>
        </Dimmer>
    )
}

export default Spinner