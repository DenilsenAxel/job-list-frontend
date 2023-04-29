import React, { useState, useEffect } from "react";
import { Input, Checkbox, List, Button, Col, Row } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { IJobResponse } from "../interfaces";
import { getAllJobs, getJobs } from "../api/job";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { DateTime } from "luxon";

export const JobListPage = () => {
  const { token } = React.useContext(AuthContext)!;

  const [jobs, setJobs] = useState<IJobResponse[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(20);
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isFulltime, setIsFulltime] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocation(e.target.value);
  };

  const handleFulltimeChange = (e: CheckboxChangeEvent) => {
    setIsFulltime(e.target.checked);
  };

  const handleGetJobList = async () => {
    const allJobs = (await getAllJobs(description, location, isFulltime, token!)) as IJobResponse[];
    const paginatedJobs = (await getJobs(description, location, isFulltime, page, token!)) as IJobResponse[];
    setJobs(paginatedJobs);
    setTotalJobs(allJobs.length);
  };

  useEffect(() => {
    handleGetJobList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Row style={{ margin: "1em" }} gutter={16}>
        <Col className="gutter-row" span={6}>
          <Input
            size="large"
            addonBefore="Description"
            placeholder="Filter by title, benefits, companies, expertise"
            allowClear
            onChange={handleDescriptionChange}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Input
            size="large"
            addonBefore="Location"
            placeholder="Filter by city, state, zip code or country"
            allowClear
            onChange={handleLocationChange}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Checkbox onChange={handleFulltimeChange}>Full Time Only</Checkbox>
        </Col>
        <Col className="gutter-row" span={6}>
          <Button type="primary" onClick={handleGetJobList} size="large">
            Search
          </Button>
        </Col>
      </Row>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            setPage(page);
          },
          pageSize: jobs.length,
          total: totalJobs,
        }}
        dataSource={jobs}
        renderItem={(item) =>
          item && (
            <List.Item key={item.title} extra={DateTime.fromMillis(Date.parse(item.created_at)).toRelativeCalendar()}>
              <List.Item.Meta
                title={<Link to={`/job/${item.id}`}>{item.title}</Link>}
                description={`${item.company} - ${item.location} - ${item.type}`}
              />
            </List.Item>
          )
        }
      />
    </>
  );
};
