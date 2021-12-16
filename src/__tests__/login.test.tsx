import { render, screen } from '@testing-library/react'
import { shallow } from 'enzyme'

import Login from '../components/login/Login'

const mockHandleLogin = jest.fn()

const userTestData =
    {
      username: 'Sandra',
      password: 'admin123',
      role: 'admin',
      events: [],
    }

describe('test for login at startpage "/"', () => {
  test('Render login component', () => {
    render(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
  })

  test('Component renders text Username', () => {
    render(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const stringValue = screen.getByText(/Username/i)
    expect(stringValue).toBeInTheDocument()
  })

  test('Component renders text Password', () => {
    render(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const stringValue = screen.getByText(/Password/i)
    expect(stringValue).toBeInTheDocument()
  })

  test('Component renders 2 input fields', () => {
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>);
    expect(wrapper.find('input[data-test="input-field-login"]').length).toBe(2)
  })

  test('Component renders a element with data-test attribute login-btn', () => {
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>);
    expect(wrapper.find('[data-test="login-btn"]').length).toBe(1)
  })

  test('The element with data-test="login-btn" should be of type submit', () => {
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>);
    expect(wrapper.find('[data-test="login-btn"]').props()).toHaveProperty('type', 'submit')
  })

  test('Submit login with no username and password, should create/display error string', () => {
    const expectedText = 'Fel användarnamn eller lösenord'
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const button = wrapper.find('[data-test="login-btn"]')
    expect(button.length).toBe(1)
    button.simulate('click')
    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Submit login with wrong username and password, should create/display error string', () => {
    const expectedText = 'Fel användarnamn eller lösenord'
    const wrongUsername = 'username'
    const wrongPassword = 'supersafepassword'
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const inputs = wrapper.find('input[data-test="input-field-login"]')

    inputs.at(0).simulate('change', { target: { value: wrongUsername } })
    inputs.at(1).simulate('change', { target: { value: wrongPassword } })

     wrapper.find('[data-test="login-btn"]').simulate('click')
    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Submit login with correct username and wrong password, should create/display error string', () => {
    const expectedText = 'Fel användarnamn eller lösenord'
    const correctUsername = 'Sandra'
    const wrongPassword = 'supersafepassword'
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const inputs = wrapper.find('input[data-test="input-field-login"]')

    inputs.at(0).simulate('change', { target: { value: correctUsername } })
    inputs.at(1).simulate('change', { target: { value: wrongPassword } })
    
    wrapper.find('[data-test="login-btn"]').simulate('click')
    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Submit login with wrong username and correct password, should create/display error string', () => {
    const expectedText = 'Fel användarnamn eller lösenord'

    const wrongUsername = 'username'
    const correctPassword = 'password123'
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>)

    const inputs = wrapper.find('input[data-test="input-field-login"]')

    inputs.at(0).simulate('change', { target: { value: wrongUsername } })
    inputs.at(1).simulate('change', { target: { value: correctPassword } })
    
    wrapper.find('[data-test="login-btn"]').simulate('click')
    expect(wrapper.text().includes(expectedText)).toBe(true)
  })

  test('Submit login with correct username and password.', () => {
    const correctUsername = 'Sandra'
    const correctPassword = 'admin123'
    
    const wrapper = shallow(<Login loggedIn={mockHandleLogin} users={userTestData}/>)
    const inputs = wrapper.find('input[data-test="input-field-login"]')

    inputs.at(0).simulate('change', { target: { value: correctUsername } })
    inputs.at(1).simulate('change', { target: { value: correctPassword } })
    wrapper.find('[data-test="login-btn"]').simulate('click')

    expect(wrapper.find('[data-test="error-msg-container"]').length).toBe(0)
  })
})
