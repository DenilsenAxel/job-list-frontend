import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { IJobResponse } from "../interfaces";
import { getJobDetail } from "../api/job";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  padding: 0.5em;
  border-bottom: 1px solid #333;
`;

const JobWrapper = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const DescriptionWrapper = styled.div`
  padding: 1em;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
`;

const CompanyProfileWrapper = styled.div`
  padding: 1em;
  margin-bottom: 0.75em;
  border: 5px solid #ddd;
  border-radius: 4px;
`;

const HowToApplyWrapper = styled.div`
  padding: 1em;
  border: 5px solid #e6eb98;
  background-color: #edf16c;
  border-radius: 4px;
`;

export const JobDetailPage = () => {
  const { token } = React.useContext(AuthContext)!;
  const { id } = useParams();

  const [job, setJob] = useState<IJobResponse>();

  const handleGetJobDetail = async () => {
    const res = (await getJobDetail(id!, token!)) as IJobResponse;
    setJob(res);
  };

  useEffect(() => {
    handleGetJobDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Link
        style={{ textDecoration: "none", marginTop: "1em", marginLeft: ".5em", color: "#0fa2de", fontWeight: "bold" }}
        to="/"
      >
        Back
      </Link>
      {job && (
        <>
          <HeaderWrapper>
            <h4>
              {job.type}/{job.location}
            </h4>
            <h2>{job.title}</h2>
          </HeaderWrapper>
          <JobWrapper>
            <DescriptionWrapper>{parse(job.description.replace("\n", ""))}</DescriptionWrapper>
            <SideWrapper>
              <CompanyProfileWrapper>
                <strong>{job.company}</strong>
                <img src={job.company_logo} alt={`${job.company} Logo`} />
                <a href={job.company_url}>{job.company_url}</a>
              </CompanyProfileWrapper>
              <HowToApplyWrapper>
                <strong>How to Apply</strong>
                {parse(job.how_to_apply.replace("\n", ""))}
              </HowToApplyWrapper>
            </SideWrapper>
          </JobWrapper>
        </>
      )}
    </>
  );
};
