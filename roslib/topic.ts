import * as ROSLIB from 'roslib';
import { ITopic } from "@/store/topicStore";

    type topicType = {
            topics : string[],
            types : string[]
    }

export const getTopicsFromRos = (ros: ROSLIB.Ros) => {

   return new Promise<ITopic[]>((resolve) => {
        ros.getTopics((result) => {
            const topics = result;
            resolve(getTopicsFromType(topics));
        });
    });
}

export const getTopic = (topicName: string, topicType: string, ros: ROSLIB.Ros) => {
    const topic = new ROSLIB.Topic({
        ros ,
        name: topicName,
        messageType: topicType,
        throttle_rate: 1500,
    });
    return topic;
}
// now convert the topicType to ITopic
const getTopicsFromType = (
    topicType: topicType
) => {

    const topics : ITopic[] = [];

    const topicNames = topicType.topics;
    const topicTypes = topicType.types;

    topicNames.forEach((topicName, index) => {
        topics.push({
            topicName,
            topicType: topicTypes[index],
            type: 'subscriber'
        })
    })

     return topics;
}

export const publishTopic = (
    ros: ROSLIB.Ros,
    topicName: string,
    topicType: string,
    message : string,
) => {
    const topic = getTopic(topicName, topicType, ros);
    const newMessage = new ROSLIB.Message(JSON.parse(message));
    topic.publish(newMessage);
}
