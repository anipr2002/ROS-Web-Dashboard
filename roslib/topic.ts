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
        throttle_rate: throtle_rate,
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
    const topics : string[]= [];

    ros.getTopicsForType(topicType, (topicsArray: string[]) => {
        topics.push(...topicsArray);
    });

    return topics;
}

export const publishTopic = ({
    ros,
    topicName,
    topicType,
    message,
    throtle_rate = 10,
} : {
    ros: ROSLIB.Ros,
    topicName: string,
    topicType: string,
    message: string,
    throtle_rate?: number }) => {
    const topic = getTopic({
        ros,
        topicName,
        topicType,
        throtle_rate
    });

    const newMessage = new ROSLIB.Message(JSON.parse(message));

    topic.publish(newMessage);
}

export const createNewTopic = ({
    ros,
    topicName,
    topicType,
} : {
    ros: ROSLIB.Ros,
    topicName: string,
    topicType: string,
}) => {
    const topic = new ROSLIB.Topic({
        ros,
        name: topicName,
        messageType: topicType,
    });

    topic.advertise();

    return topic;
}
