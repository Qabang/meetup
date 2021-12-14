import React from 'react'
import {Users} from '../models/Users'

const user:Users = {username:'',role:'', events:[]}

export default React.createContext(user)
