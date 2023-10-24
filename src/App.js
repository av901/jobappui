import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, message } from 'antd';
import AllJobs from './AllJobs.js' 
import axios from "./Api.js";

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = [
	{
		key : 1,
		label: "Jobs"
	}
];

const items2: MenuProps['items'] = [
	{	key : "jobs",
		label: "Jobs",
		icon: React.createElement(LaptopOutlined),
		children: [
			{
				key : "allJobs",
				label: "All Jobs",
			}
		]
	}
]


export class App extends React.Component {
	
	constructor(props, state) {
		super(props, state);
		this.state = {
		  loading: false,
		  selectedKey: "allJobs",
		  errorInfo : "",
		  user: null,
		};
	}
	
	onSelectItem = ({item, key, keyPath, selectedKeys, domEvent}) => {
		this.setState({...this.state, selectedKey: key});
	}
	
	getDataFromProps() {
		axios.get("/users/1").then(
			(data) => {
				console.log(data);
				this.setState({...this.state, user: data.data[0]});
			},
			(error) => {
				this.setState({...this.state, errorInfo: error});
			}
		);
	}
	
	componentWillMount() {
		this.getDataFromProps();
	}
	
	applyJob = (job) => {
		axios.post("/apply", {user_id: this.state.user.id, job_ids: [job.id]}).then(
			(data) => {
				if(data.data.success){
					message.success("Job applied successfully");
					this.setState({...this.state, user : {applied_jobs: [...this.state.user.applied_jobs, job]}});
				}
			},
			(error) => {
				this.setState({...this.state, errorInfo: error});
			}
		);
	}
	

	render() {
	  return (
		<Layout>
		  <Header style={{ display: 'flex', alignItems: 'center' }}>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
		  </Header>
		  <Layout>
			<Sider width={200} style={{ background: "white" }}>
			  <Menu
				mode="inline"
				defaultSelectedKeys={['jobs']}
				defaultOpenKeys={['jobs']}
				style={{ height: '100%', borderRight: 0 }}
				items={items2}
				onSelect={this.onSelectItem}
			  />
			</Sider>
			<Layout style={{ padding: '0 24px 24px' }}>
			  <Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
			  </Breadcrumb>
			  <Content
				style={{
				  padding: 24,
				  margin: 0,
				  minHeight: 280,
				  background: "white",
				}}
			  >
				<AllJobs appliedJobs={this.state.user != null? this.state.user.applied_jobs: []} applyJob={this.applyJob}/>
			  </Content>
			</Layout>
		  </Layout>
		</Layout>
	  );
  }
}

export default App;