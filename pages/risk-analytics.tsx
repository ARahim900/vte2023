import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import RiskAnalytics from '../src/components/RiskAnalytics';

const RiskAnalyticsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Risk Analytics - VTE 2023</title>
        <meta name="description" content="VTE risk factor analysis across health centers" />
        <meta name="keywords" content="VTE, risk factors, healthcare, analytics, health centers" />
      </Head>
      <RiskAnalytics />
    </>
  );
};

export default RiskAnalyticsPage;