import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Menu, Space, Card, Input } from 'antd';
import './index.css';

export default function Home() {
    const [userData, setuserData] = useState([])
    const { Search } = Input
    const getUserData = () => {
        const dataReceive = axios.get(`http://localhost:3000/api/customers`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log(err);
            })
        return dataReceive;
    }

    useEffect(() => {
        (async () => {
            const response = await getUserData();
            setuserData(response);
        })();
    }, [])
    return (
        <div className='home-container'>
            <div className='app_showInfo'>
                <div className='header'>
                    <Menu mode="horizontal" defaultSelectedKeys={['customers']}>

                        <h1>Customer Manager</h1>
                        <Menu.Item key="customers">
                            Customers
                        </Menu.Item>
                        <Menu.Item key="settings">
                            Settings
                        </Menu.Item>
                        <Menu.Item key="login">
                            Login
                        </Menu.Item>
                    </Menu>
                </div>
                <Space direction="vertical">
                    <Search placeholder="Filter" enterButton />
                </Space>
                {userData.map(item => (
                    <div className="site-card-border-less-wrapper"
                        key={item.id}>
                        <Card
                            title={`${item.firstName} ${item.lastName}`}
                            bordered={false}
                            style={{
                                width: 300,
                            }}
                        >
                            <p>

                                {item.city}
                            </p>
                            <p>
                                {item.state.name}

                            </p>
                        </Card>
                    </div>

                ))}
            </div>
        </div>


    )
}
