import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

export interface User {
    id: number;
    login: string,
    url: string
}

export interface Data {
    firstName: string;
    lastName: string;
}


const ScreenOne: FC = () => {


    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState<User[]>();

    useEffect(()=>{

        fetch('https://api.github.com/users')
            .then(response => response.json())
            .then(results => setUsers(results))

        console.log('refreshed')
        setRefresh(false)

    }, [refresh])

    const handleRefresh = () => setRefresh(true);

    const data: Data[] = [
        {
          firstName: 'Chase',
          lastName: 'Crawford'
        },
        {
          firstName: 'Chase',
          lastName: 'Crawford'
        },
        {
          firstName: 'Chase',
          lastName: 'Crawford'
        }
      ]    



    return (
        <div style={{background: "yello"}}>
            <Button onClick={handleRefresh}>
                Refresh
            </Button>
            <table>
                <tbody>
                    {users?.map((user, index)=>{
                        return (
                            <tr key={index}>
                                <td >{user.id}</td>
                                <td>{user.login}</td>
                                <td>{user.url}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ScreenOne;