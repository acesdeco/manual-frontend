import React from 'react';
import type { MetaFunction } from "@remix-run/node";
import useLocalStorage from '~/data/head';
import { useLoaderData, useNavigate } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
      { title: "Dashboard | CPE Labs" },
      { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
    ];
  };

export const loader = () => {
    const hasher = process.env.STATE_HASHER;
    return {hasher}
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { hasher } = useLoaderData<{ hasher: string }>();
    console.log(hasher);
    const { storedValue } = useLocalStorage('user');
    console.log(storedValue);
    React.useEffect(() => {
        if (storedValue === null) {
            navigate('/auth/login');
        }
    }, [storedValue, navigate]);
    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
};

export default Dashboard;