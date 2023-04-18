import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Layout from "../../component/Layout";
import Menu from '../../component/SettingsMenu'
import Feedback from '../../component/SettingsFeedback'

export default function SettingsFeedbackPage() {
    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    bgcolor: 'background.paper',
                    '& svg': {
                        m: 1.5,
                    },
                    '& hr': {
                        mx: 0.5,
                    },
                }}>
                <Menu
                    sx={{
                        bgcolor: 'background.paper',
                        border: 6,
                    }}
                />
                <Divider orientation='vertical' flexItem variant='middle' color='black' />
                <Box className='side'>
                    <Feedback/>
                </Box>
            </Box>
        </Layout>
    )
}