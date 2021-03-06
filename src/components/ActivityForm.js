import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const ActivityForm = ({ activities, setActivities, studentId }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      start: data.startDate + " " + data.startTime,
      end: data.endDate + " " + data.endTime,
      points: data.points,
    };

    setActivities([...activities, formattedData]);
    console.log("Activities after submitting", activities);
    await axios.post(`/api/students/${studentId}/activities`, formattedData);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={register} placeholder="Title" />
      <input
        name="startDate"
        type="date"
        ref={register}
        placeholder="Start Date"
      />
      <input
        name="startTime"
        type="time"
        ref={register}
        placeholder="Start Time"
      />
      <input name="endDate" type="date" ref={register} placeholder="End Date" />
      <input name="endTime" type="time" ref={register} placeholder="End Time" />

      <input name="points" type="number" ref={register} placeholder="Points" />

      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;
