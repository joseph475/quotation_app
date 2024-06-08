// Tooltip.jsx
import { h } from 'preact';

const Tooltip = ({ content, children, position }) => {
  const tooltipClasses = `opacity-0 invisible ${
    position === 'left' ? 'left-0' : 'right-0'
  } group-hover:opacity-100 group-hover:visible absolute bg-black text-white text-sm px-2 py-1 rounded-md whitespace-nowrap transition duration-300`;

  return (
    <div class="relative group">
      {children}
      <div class={tooltipClasses}>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
