import React from 'react';

export const DropdownPage = () => (
  <Dropdown>
    <DropdownToggle>
      <span className="flex bg-indigo-900 text-white rounded px-6 py-2 font-medium">
        Options
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem>Enoch Ndika</DropdownItem>
      <DropdownItem>Josue Kazenga</DropdownItem>
      <DropdownItem>Business</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

/* Logic*/

function useToggle() {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);

  const toggle = React.useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  // close dropdown when you click outside
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, ref]);

  // close dropdown when you click on "ESC" key
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  return {
    show,
    toggle,
    ref,
  };
}



function Dropdown({ children }) {
  const { show, toggle } = useToggle();
  /* First child contains the dropdown toggle */
  const dropdownToggle = children[0];

  /* Second child contains the dropdown menu */
  const dropdownMenu = children[1];

  return (
    <>
      <button
        className="focus:outline-none"
        onClick={toggle}
        type="button"
        id="options-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {dropdownToggle}
      </button>
      {show && <>{dropdownMenu}</>}
    </>
  );
}

function DropdownToggle({ children }) {
  return <>{children}</>;
}

function DropdownMenu({ children }) {
  return (
    <div className="relative">
      <div
        style={{ transform: 'translate3d(0px, 3px, 0px)' }}
        className={style.menu}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
}

/* You can wrap the a tag with Link and pass href prop to Link if you are using either Create-React-App, Next.js or Gatsby */
function DropdownItem({ children }) {
  return (
    <a tabIndex={0} className={style.item} role="menuitem">
      {children}
    </a>
  );
}
