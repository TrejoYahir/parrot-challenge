import Login from "./Login"
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react"
import { userEvent, Wrapper } from "../../shared/testing-utils"

describe('Login', () => {
  it('Should render username input', () => {
    render(Wrapper(<Login />))
    const usernameInput = screen.getByRole('textbox', { name: /Usuario:/i})
    expect(usernameInput).toBeInTheDocument()
  })

  it('Should update user input value', async () => {
    render(Wrapper(<Login />))
    const usernameInput = screen.getByRole('textbox', { name: /Usuario:/i})
    await userEvent.type(usernameInput, 'test')
    expect(usernameInput).toHaveValue('test')
  })

  it('Should render password input', () => {
    render(Wrapper(<Login />))
    const passwordInput = screen.getByLabelText(/Contraseña:/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('Should update password input value', async () => {
    render(Wrapper(<Login />))
    const passwordInput = screen.getByLabelText(/Contraseña:/i)
    await userEvent.type(passwordInput, 'test')
    expect(passwordInput).toHaveValue('test')
  })

  it('Should handle correct form data', async () => {
    render(Wrapper(<Login />))

    const passwordInput = screen.getByLabelText(/Contraseña:/i)
    const usernameInput = screen.getByRole('textbox', { name: /Usuario:/i})

    await userEvent.type(usernameInput, 'test')
    await userEvent.type(passwordInput, 'test')

    expect(passwordInput).toHaveValue('test')
    expect(usernameInput).toHaveValue('test')

    expect(screen.queryByRole('paragraph')).toBeFalsy()
  })

})