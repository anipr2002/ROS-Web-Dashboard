import TopicCard from "./TopicCard";
import { Skeleton } from "@/components/ui/skeleton";
import useTopicStore from "@/store/topicStore";

export default function TopicPage({
  topicsData,
}: {
  topicsData: { topics: string[]; types: string[] } | null;
}) {
  const { selectedTopicType, viewType } = useTopicStore();

  console.log(selectedTopicType);
  console.log(viewType);
  // Filter topics based on the selected type
  const filteredTopics = topicsData
    ? topicsData.topics.filter((_, index) =>
        selectedTopicType ? topicsData.types[index] === selectedTopicType : true
      )
    : [];

  return (
    <>
      <div className="gap-1 flex w-full">
        {topicsData ? (
          <div className="flex flex-wrap gap-10 w-full justify-center">
            {/* If filteredTopics is not empty, map over it, otherwise show all */}
            {filteredTopics.length > 0
              ? filteredTopics.map((topic) => (
                  <TopicCard
                    key={topic}
                    topicName={topic}
                    topicType={
                      topicsData.types[topicsData.topics.indexOf(topic)]
                    }
                  />
                ))
              : topicsData.topics.map((topic, index) => (
                  <TopicCard
                    key={topic}
                    topicName={topic}
                    topicType={topicsData.types[index]}
                  />
                ))}
          </div>
        ) : (
          <div className="flex gap-7 w-full flex-wrap">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-[400px] h-[300px] shadow-md rounded-lg p-4 "
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
