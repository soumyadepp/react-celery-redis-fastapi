"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { startGeneration } from "../redux/generationSlice";
import { RootState } from "../redux/store";

const schema = z.object({
  style: z.string().min(2),
  floors: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function GenerationForm() {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { loading } = useSelector((state: RootState) => state.generation);

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    dispatch(startGeneration({ userId: "user123", params: data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md">
      <input
        {...register("style")}
        placeholder="Style (e.g., modern)"
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        {...register("floors")}
        placeholder="Floors"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-slate-800 text-white rounded-md disabled:bg-slate-400"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
