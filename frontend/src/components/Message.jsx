import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
    return (
        <Alert variant={variant}>
                {children}
        </Alert>
    )
}
// Вывод предупреждения об ошибке
export default Message
