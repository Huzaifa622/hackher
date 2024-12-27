import SingleActivity from "./single-activity";

export default function Activity() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg max-h-[400px] overflow-y-auto example">
      <header className="text-xl font-light pb-4">Activity</header>
      <SingleActivity />
      <SingleActivity />
      <SingleActivity />
      <SingleActivity />
    </div>
  );
}
