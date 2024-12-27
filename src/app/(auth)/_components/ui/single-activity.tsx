export default function SingleActivity() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col mb-6 gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="text-gray-400 text-xs p-2  bg-gray-100 rounded-lg w-[30%]">
            8th March, 2024{" "}
          </h3>
          <h3 className="text-gray-400 text-xs p-2 bg-gray-100 rounded-lg w-fit">
            1 day ago
          </h3>
        </div>
        <h1 className="text-gray-500 ">Updated Product</h1>
        <h4 className="text-gray-500 text-xs">
          Quisque a consequat ante sit amet…
        </h4>
      </div>
    </div>
  );
}
