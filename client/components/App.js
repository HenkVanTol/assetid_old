import React from 'react';
import HeaderMenu from './Header';
import SideMenu from './SideMenu';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Card } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
import imageName from './saflag.gif';

const App = (props) => {
    return (
        <div>
            <Layout>
                <Header className="header">
                    <div className="logo">
                        {/* <img className="logo" src={imageName} /> */}
                    </div>
                    <HeaderMenu />
                </Header>
                <Layout>
                    {/* <Sider width={200} style={{ background: '#fff' }}> */}
                    <SideMenu />
                    {/* </Sider> */}
                    <Layout style={{ padding: '0 24px' }}>
                        <Content style={{ background: '#fff', padding: '24px', margin: 0, minHeight: 500 }}>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    ©2018 Henk van Tol
                </Footer>
            </Layout>
        </div>
    );
}

export default App;