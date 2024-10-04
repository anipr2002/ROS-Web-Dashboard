import { create } from 'zustand';

interface TopicStore{
    defaultTopicData : {topics : string[], types : string[]} | null;
    setDefaultTopicData : (defaultTopicData : {topics : string[], types : string[]} | null) => void;

    selectedTopicType : string | null;
    setSelectedTopicType : (topicType : string | null) => void;

    viewType : 'All' | 'TopicType';
    setViewType : (viewType : 'All' | 'TopicType') => void;
}

const useTopicStore = create<TopicStore>((set) => ({
    defaultTopicData : null,
    setDefaultTopicData : (defaultTopicData) => set({ defaultTopicData }),

    selectedTopicType : null,
    setSelectedTopicType : (topicType) => set({ selectedTopicType : topicType, viewType : 'TopicType' }),

    viewType : 'All',
    setViewType : (viewType) => set({ viewType }),
}));

export default useTopicStore;
