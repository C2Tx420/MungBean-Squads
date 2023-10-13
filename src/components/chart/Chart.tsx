import { Box, Tabs } from '@radix-ui/themes';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const data = [
    {
      uv: 0,
    },
    {
      uv: 1,
    },
    {
      uv: 0.4,
    },
    {
      uv: 0.5,
    },
    {
      uv: 1.2,
    }
  ];

export default function Chart() {
    return (
        <Tabs.Root defaultValue="main">
            <Tabs.List>
                <Tabs.Trigger value="main">Main Vault</Tabs.Trigger>
                <Tabs.Trigger value="marketing">Marketing</Tabs.Trigger>
                {/* <Tabs.Trigger value="settings">Settings</Tabs.Trigger> */}
            </Tabs.List>

            <Box px="4" pt="3" pb="2" height={"100%"}>
              <Tabs.Content value="main">
              <ResponsiveContainer width='100%' height={200}>
              <AreaChart
                data={data}
                margin={{ top: 20 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00a3ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00a3ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis domain={["auto", "auto"]} orientation="left" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="dashboard__chart-tooltip">
                          <span>{payload[0].value} SOL</span>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#00a3ff"
                  fillOpacity={1}
                  strokeWidth={3}
                  fill="url(#colorUv)"
                  animateNewValues
                />
              </AreaChart>
            </ResponsiveContainer>
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