import React from 'react'
import { Container, Figure } from 'react-bootstrap'
import Logo from '../assets/images/logo-main.png'

export const Header = () => {
  return (
    <header>
      <Container>
        <Figure>
          <Figure.Image src={Logo} fluid />
        </Figure>
      </Container>
    </header>
  )
}
