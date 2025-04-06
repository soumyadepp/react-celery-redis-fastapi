import GenerationForm from "./components/GenerationForm";
import GenerationProgress from "./components/GenerationProgress";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">
        🧠 Test React + FastAPI with Celery & Redis
      </h1>
      <GenerationForm />
      <GenerationProgress />
    </div>
  );
}
