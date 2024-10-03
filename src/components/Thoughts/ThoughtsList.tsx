import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Thought } from "../../types/thoughtType";
import { selectThoughts } from "../../store/selectors/thoughtsSelector";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteThought,
  fetchThoughts,
} from "../../store/features/thoughtsSlice";
import { Button } from "primereact/button";

export const ThoughtsList: React.FC = () => {
  const thoughts = useAppSelector(selectThoughts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchThoughts());
  }, [dispatch]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "success";
      case "negative":
        return "danger";
      case "neutral":
        return "info";
      default:
        return "secondary";
    }
  };

  const renderThoughtCard = (thought: Thought) => {
    const header = (
      <div className="flex justify-content-between align-items-center">
        <Tag value={thought.type} />
        <Button
          icon="pi pi-trash"
          onClick={() => dispatch(deleteThought(thought.id || ""))}
        />
      </div>
    );

    const footer = (
      <Tag
        value={thought.sentiment}
        severity={
          getSentimentColor(thought.sentiment) as
            | "success"
            | "danger"
            | "info"
            | "warning"
            | null
            | undefined
        }
      />
    );

    return (
      <Card key={thought.id} header={header} footer={footer} className="mb-3">
        <p className="m-0">{thought.content}</p>
        {thought.assets && thought.assets.length > 0 && (
          <div className="mt-3">
            <strong>Assets:</strong>
            <ul className="list-none p-0 m-0">
              {thought.assets.map((asset, index) => (
                <li key={index}>
                  <a target="_blank">{asset}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="thoughts-list">
      <h1>Thoughts</h1>
      {Object.keys(thoughts).length > 0 ? (
        Object.values(thoughts).map((thought) => renderThoughtCard(thought))
      ) : (
        <p>No thoughts recorded yet.</p>
      )}
    </div>
  );
};
