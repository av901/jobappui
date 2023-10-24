import React from 'react';
import axios from "./Api.js";
import { Card, Col, Collapse, Pagination, Popover, Row, Popconfirm,Button, Space, Tag} from "antd";
import { EllipsisOutlined } from '@ant-design/icons';


export class AllJobs extends React.Component {
	
	constructor(props, state) {
		super(props, state);
		this.state = {
		  loading: false,
		  jobs: [],
		  appliedJobs: props.appliedJobs,
		  errorInfo : ""
		};
	}
	
	getDataFromProps() {
		axios.get("/jobs/all").then(
			(data) => {
				console.log(data);
				this.setState({...this.state, jobs: data.data});
			},
			(error) => {
				this.setState({...this.state, errorInfo: error});
			}
		);
	}
	
	componentDidMount() {
		this.getDataFromProps();
	}

	componentDidUpdate(prevProps, prevState) {
	
	}
	
	jobInfoContent = (job) => {
      return (
        <div style={{width: "200px"}}>
          {job.description}
        </div>
      );
    }
	
	handleOk = (e, job) => {
		this.props.applyJob(job);
    }
	
	getDisabled = (job) => {
		let disabled = false;
		if(this.props.appliedJobs) {
			let foundJob = this.props.appliedJobs.filter(j => j.id == job.id);
			if(foundJob.length > 0)
				disabled = true;
		}
		return disabled;
	}
	
	render() {
	  return <>
        <h4>All Jobs</h4>
		{this.state.jobs && this.state.jobs.map((job, key) => {
                  return (
                    <Card
                      type="inner"
                      size="small"
                      style={{ width: "32%", display: "inline-block", marginRight: "1%", marginBottom: "25px"}}
                      key={key}
                      hoverable={true}
					  title={job.title}
                      extra={[
					    <Popconfirm
							title="Apply for the Job"
							description="Are you sure ?"
							okText="Yes"
							cancelText="No"
							onConfirm={(e) => this.handleOk(e, job)}
						  >
						  {this.getDisabled(job) ? <Button type="primary" disabled={true}>Applied</Button> : <Button type="primary">Apply</Button>}
					   </Popconfirm>, 
                        <Popover
                          content={this.jobInfoContent(job)}
                          title={job.title}
                        >
						<Button>{React.createElement(EllipsisOutlined)}</Button>
                      </Popover>
                      ]}
                    >
                      <Space size={[0, 'small']} wrap>
						<Tag bordered={false} color="processing">
							{job.min_qualification}
						</Tag>
						<Tag bordered={false} color="processing">
							{job.min_year_exp + "-" + job.max_year_exp + " year"}
						</Tag>
						<Tag bordered={false} color="processing">
							{job.min_salary + "-" + job.max_salary + " INR"}
						</Tag>
						<Tag bordered={false} color="processing">
							{"Join within " + job.join_within_days + " days"}
						</Tag>
						{job.required_skills && job.required_skills.map(skill => 
							<Tag bordered={false} color="processing">
								{skill.skillName}
							</Tag>
						)}
					  </Space>
                    </Card>
                  );
                })}
		</>
  }
}

export default AllJobs;