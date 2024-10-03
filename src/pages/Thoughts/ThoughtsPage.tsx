import React from "react";
import { ThoughtsEntry } from "../../components/Thoughts/ThoughtsEntry";
import { ThoughtsList } from "../../components/Thoughts/ThoughtsList";


const ThoughtsPage: React.FC = () => {
  return (
    <div className="p-d-flex p-flex-column">
      <ThoughtsEntry />
      <ThoughtsList />
    </div>
  );
};

export default ThoughtsPage;
