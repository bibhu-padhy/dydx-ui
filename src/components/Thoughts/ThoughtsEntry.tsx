import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectMarketsArray } from "../../store/selectors/marketsSelector";
import { Thought } from "../../types/thoughtType";
import { addThought } from "../../store/features/thoughtsSlice";
import { InputText } from "primereact/inputtext";

export const ThoughtsEntry: React.FC<{ thought?: Thought }> = ({ thought }) => {
  const markets = useAppSelector(selectMarketsArray);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Thought>({
    defaultValues: thought || {
      topic: "",
      createdAt: new Date().toISOString(),
      type: "pre-trade",
      content: "",
      assets: [],
      tags: [],
      sentiment: "neutral",
      importance: 1,
      status: "active",
    },
  });
  const dispatch = useAppDispatch();

  const [filteredMarkets, setFilteredMarkets] = useState<string[]>([]);

  const searchMarkets = (event: { query: string }) => {
    const filtered = markets.filter((market) =>
      market.toLowerCase().includes(event.query.toLowerCase())
    );
    setFilteredMarkets(filtered);
  };

  const onSubmit = (data: Thought) => {
    // Save the updated thoughts back to localStorage
    dispatch(addThought(data));
    // on success, reset the form
    reset();
  };

  return (
    <Card title={thought ? "Edit Thought" : "Create Thought"}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {/* topic */}
        <div className="p-field">
          <label htmlFor="topic">Topic</label>
          <Controller
            name="topic"
            control={control}
            rules={{ required: "Topic is required" }}
            render={({ field }: { field: any }) => (
              <InputText id={field.name} {...field} />
            )}
          />
          {errors.topic && (
            <small className="p-error">{errors.topic.message}</small>
          )}
        </div>

        {/* content */}
        <div className="p-field">
          <label htmlFor="content">Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }: { field: any }) => (
              <InputTextarea id={field.name} {...field} rows={5} />
            )}
          />
          {errors.content && (
            <small className="p-error">{errors.content.message}</small>
          )}
        </div>

        <div className="grid">
          {/* type */}
          <div className="col-6">
            <div className="p-field">
              <label htmlFor="type">Type</label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }: { field: any }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={[
                      { label: "Pre-trade", value: "pre-trade" },
                      { label: "Active-trade", value: "active-trade" },
                      { label: "Post-trade", value: "post-trade" },
                      { label: "Market Insight", value: "market-insight" },
                    ]}
                    placeholder="Select Type"
                  />
                )}
              />
              {errors.type && (
                <small className="p-error">{errors.type.message}</small>
              )}
            </div>
          </div>

          {/* assets */}
          <div className="col-6">
            <div className="p-field">
              <label htmlFor="assets">Assets</label>
              <Controller
                name="assets"
                control={control}
                render={({ field }: { field: any }) => (
                  <AutoComplete
                    id={field.name}
                    value={field.value}
                    suggestions={filteredMarkets}
                    completeMethod={searchMarkets}
                    multiple
                    onChange={(e) => field.onChange(e.value)}
                    placeholder="Select Assets"
                  />
                )}
              />
            </div>
          </div>

          {/* tags */}
          {/* <div className="col">
            <div className="p-field">
              <label htmlFor="tags">Tags</label>
              <Controller
                name="tags"
                control={control}
                render={({ field }: { field: any }) => (
                  <MultiSelect
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={["BTC", "ETH", "AAPL", "GOOGL"]} // Add more assets as needed
                    placeholder="Select Tags"
                  />
                )}
              />
            </div>
          </div> */}
        </div>

        <div className="grid">
          {/* sentiment */}
          <div className="col">
            <div className="p-field">
              <label htmlFor="sentiment">Sentiment</label>
              <Controller
                name="sentiment"
                control={control}
                render={({ field }: { field: any }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={["bullish", "bearish", "neutral"]}
                    placeholder="Select Sentiment"
                  />
                )}
              />
            </div>
          </div>

          {/* importance */}
          {/* <div className="col">
            <div className="p-field">
              <label htmlFor="importance">Importance</label>
              <Controller
                name="importance"
                control={control}
                render={({ field }: { field: any }) => (
                  <InputNumber
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    min={1}
                    max={5}
                    step={1}
                  />
                )}
              />
            </div>
          </div> */}

          {/* status */}
          <div className="col">
            <div className="p-field">
              <label htmlFor="status">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }: { field: any }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={["active", "archived", "deleted"]}
                    placeholder="Select Status"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" label="Submit" className="p-mt-2" />
      </form>
    </Card>
  );
};
