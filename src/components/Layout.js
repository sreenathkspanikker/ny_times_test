import React from 'react'
import { Container } from 'react-bootstrap';
import {Header} from './';

export const Layout = ({className, children, isHeader}) => {
  return (
    <div className={`app-layout ${className}`}>
        {(isHeader || isHeader === undefined) && <Header />  }
        <Container>
            {children}
        </Container>
    </div>
  )
}
