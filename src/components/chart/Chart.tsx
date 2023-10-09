import { Box, Tabs } from '@radix-ui/themes';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Chart() {
    return (
        <Tabs.Root defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="account">
                    <p>Make changes to your account.</p>
                </Tabs.Content>

                <Tabs.Content value="documents">
                    <p>Access and update your documents.</p>
                </Tabs.Content>

                <Tabs.Content value="settings">
                    <p>Edit your profile or update contact information.</p>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    )
}