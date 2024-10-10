import { create } from 'zustand';

export interface ITopic{
    topicName : string;
    topicType : string;
    message?: string | null;
    type?: 'subscriber' | 'publisher';
}

interface TopicStore{
    defaultTopicData : ITopic[] | null;
    setDefaultTopicData : (defaultTopicData : ITopic[] | null) => void;
}

const useTopicStore = create<TopicStore>((set) => ({
    defaultTopicData : null,
    setDefaultTopicData : (defaultTopicData) => set({ defaultTopicData }),
}));

export default useTopicStore;
