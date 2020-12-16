import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getUsers } from '../API';

const UserSelect = (props: any) => {

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState('1');

    const userList: Array<Object> = [];

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = (): void => {
    getUsers()
    .then(({ data: { users } }: User | any) => setUsers(users))
    .catch((err: Error) => console.log(err))
    }

    const createProfs = () => {
        users.forEach(user => {
            let userObj = {
                value: user.id,
                label: user.firstName + ' ' + user.lastName
            };
            userList.push(userObj)
        })
    }

    const handleUser = (e: any) => {
        setUser(e.value)
    }

    createProfs()

    return(
        
        <Select options={userList} value={userList.find(userObj => userObj === user)} className='user-select' onChange={handleUser}
        id={user}/>   
    )
}

export default UserSelect