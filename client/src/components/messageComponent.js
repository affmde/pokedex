import { Alert } from "react-bootstrap"

export const MessageComponent = ({message}) =>{

    if(!message)return null

    
    return(
        <Alert variant={message.type === 'error' ? 'danger' : 'success'}>
            {message.message}
        </Alert>
    )
}