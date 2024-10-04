import * as ROSLIB from 'roslib';

export const getTopic = ({
    topicName,
    topicType,
    ros,
    throtle_rate
} : {
    topicName: string,
    topicType: string,
    ros: ROSLIB.Ros,
    throtle_rate?: number
}) => {
    const topic = new ROSLIB.Topic({
        ros,
        name: topicName,
        messageType: topicType,
        throttle_rate: throtle_rate
    });
    return topic;
}

export const getTopicsFromType = ({
    topicType,
    ros,
}:{
    topicType: string,
    ros: ROSLIB.Ros
}) => {
    let topics : string[]= [];

    ros.getTopicsForType(topicType, (topicsArray: string[]) => {
        topics.push(...topicsArray);
    });

    return topics;
}
