import React, { Component } from 'react'
import { createAppContainer, createDrawerNavagitor} from 'react-navigation';

import RegisterMonitoringTime from './RegisterMonitoringTime.component';
import ScheduledMonitoring from './ScheduledMonitoring.component';
import OfferedMonitores from './OfferedMonitores.component';
import GetOut from './GetOut.component';

import useUserInfo from '.useUserInfo';

const { user, isStudent, isMonitor, isProfessor } = useUserInfo();

const myDrawer = createDrawerNavagitor (
    {
        RegisterMonitoringTime: RegisterMonitoringTime,
        ScheduledMonitoring: ScheduledMonitoring,
        OfferedMonitores: OfferedMonitores,
        GetOut: GetOut
    }
)

export default createAppContainer(myDrawer);