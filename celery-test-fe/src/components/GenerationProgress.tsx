import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CircularProgress from "./ui/progress";

export default function GenerationProgress() {
  const { progress, message, loading, assets, error } = useSelector(
    (state: RootState) => state.generation
  );

  return (
    <div className="p-4">
      {loading && (
        <div className="flex flex-col gap-2">
          <CircularProgress
            size={70}
            progress={isNaN(parseInt(progress)) ? 0 : parseInt(progress)}
          />
          <p>{message.length === 0 ? "Starting..." : message}</p>
        </div>
      )}
      {error && <p className="text-red-500">❌ {error}</p>}
      {assets && (
        <>
          <p className="text-green-600">✅ Assets Ready:</p>
          <ul className="list-disc pl-6">{assets}</ul>
        </>
      )}
    </div>
  );
}
