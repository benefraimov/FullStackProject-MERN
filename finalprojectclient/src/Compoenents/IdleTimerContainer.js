import React, { useRef, useState } from 'react'
import IdleTimer from 'react-idle-timer'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


Modal.setAppElement('#root')

function IdleTimerContainer(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()

    const idleTimerRef = useRef(null)

    const onIdle = () => {
        console.log('User is idle')
        setModalIsOpen(true)
        setTimeout(() => {
            setModalIsOpen(false)
            dispatch({ type: "LOGOUT" })
            history.push('/')
        }, 3000)
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen}>
                <h2>You've been idle for a while!</h2>
                <p>You will be logged out soon</p>
            </Modal>
            <IdleTimer ref={idleTimerRef} timeout={props.timer} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer