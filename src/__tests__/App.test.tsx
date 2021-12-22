import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import Login from '../components/login/Login';




describe('Tests for App', () => {

  const adminUsername = 'Sandra'
  const adminPassword = 'admin123'
  const userUsername = 'Ruby'
  const userPassword = 'password123'

  function loginUser(wrapper: any, role = 'admin') {
    const inputs = wrapper.find('input[data-test="input-field-login"]')

    if (role === 'admin') {
      inputs.at(0).simulate('change', { target: { value: adminUsername } })
      inputs.at(1).simulate('change', { target: { value: adminPassword } })
    } else {
      inputs.at(0).simulate('change', { target: { value: userUsername } })
      inputs.at(1).simulate('change', { target: { value: userPassword } })

    }

    wrapper.find('[data-test="login-btn"]').simulate('click')
  }

  function logoutUser(wrapper: any) {
    wrapper.find('nav').find('button[data-test="logout-btn"]').simulate('click')
  }

  test('renders App', () => {
    render(<Router><App /></Router>);
  })

  test('should render at least one logo for App', () => {
    const wrapper = mount(<Router><App /></Router>);
    expect(wrapper.find('[data-test="app-logo"]').length).toBeGreaterThan(0)
  })

  test('should not render a nav element when not logged in.', () => {
    const wrapper = mount(<Router><App /></Router>);
    expect(wrapper.find('nav').length).toBe(0)
  })

  test('should render a nav element when user is logged in.', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)
    expect(wrapper.find('nav').length).toBe(1)
    logoutUser(wrapper)
  })

  test('The nav element should render the text start', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)
    const nav = wrapper.find('nav')

    expect(nav.text().includes('Start' || 'start')).toBe(true)
    logoutUser(wrapper)
  })

  test('The nav element\'s first link should be start', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)

    const nav = wrapper.find('nav')

    expect(nav.find('a').first().text()).toBe('Start' || 'start')
    logoutUser(wrapper)
  })

  test('The nav element should only render add event link if user is admin, user is admin Should render Link', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)

    const nav = wrapper.find('nav')
    expect(nav.text().includes('Add new event')).toBe(true)
    logoutUser(wrapper)
  })

  test('The nav element should only render add event link if user is admin, user is not admin Should not render Link', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper, 'user')

    const nav = wrapper.find('nav')
    expect(nav.text().includes('Add new event')).toBe(false)
    logoutUser(wrapper)
  })

  test('The nav element\'s should render a logout button with the text "Logout [username]"', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)

    const nav = wrapper.find('nav')
    const expectedText = 'Logout ' + adminUsername

    expect(nav.find('button[data-test="logout-btn"]').length).toBe(1)
    expect(nav.find('button[data-test="logout-btn"]').text()).toBe(expectedText)
    logoutUser(wrapper)
  })

  test('Click on logout button will render login component"', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)
    const btn = wrapper.find('nav').find('button[data-test="logout-btn"]')

    expect(wrapper.find(Login).length).toBe(0)
    btn.simulate('click')
    expect(wrapper.find(Login).length).toBe(1)
  })

  test('Click on logout button will call localStorage removeItem "', () => {
    const wrapper = mount(<Router><App /></Router>);
    loginUser(wrapper)

    jest.spyOn(window.localStorage.__proto__, 'removeItem')

    const btn = wrapper.find('nav').find('button[data-test="logout-btn"]')
    btn.simulate('click')

    expect(localStorage.removeItem).toHaveBeenCalled()
  })

  test('Logging in should call localstorage getItem and setItem to set and get activeUser"', () => {
    const wrapper = mount(<Router><App /></Router>);

    jest.spyOn(window.localStorage.__proto__, 'getItem')
    jest.spyOn(window.localStorage.__proto__, 'setItem')

    loginUser(wrapper)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem('activeUser')).not.toBe(null)

    logoutUser(wrapper)
  })
})
