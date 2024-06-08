import { h } from 'preact';

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-stone-100">
    <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-12 h-12"></div>
  </div>
);

export default Loader;
