import * as ROSLIB from 'roslib';

export const getAllServices = ({
    ros,
} : {
    ros: ROSLIB.Ros,
}) => {
    let servicesList: string[] = [];

    ros.getServices((services: string[]) => {
        servicesList = services;
    });

    console.log(servicesList);
    return servicesList;
}
