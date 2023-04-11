import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, exact, isSubLink, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: exact });

  let dynamicclassName = isSubLink
    ? match
      ? "px-3 py-2 rounded-md text-sm font-bold bg-gray-100 text-indigo-600 hover:text-indigo-700 hover:ring-2"
      : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 hover:text-indigo-500 hover:ring-2"
    : match
    ? "px-3 py-2 uppercase text-indigo-600 text-lg font-semibold bg-gradient-to-t from-lime-300 to-lime-400 bg-no-repeat [background-position:0_88%] [background-size:100%_0.2em]  motion-safe:transition-all motion-safe:duration-200 hover:[background-size:100%_100%]  hover:text-indigo-800 "
    : "px-3 py-2 uppercase text-indigo-600 text-lg font-semibold hover:bg-gradient-to-t from-lime-300 to-lime-400 bg-no-repeat [background-position:0_88%] [background-size:0%_0.2em] motion-safe:transition-all motion-safe:duration-200 hover:[background-size:30%_0.2em]";

  return (
    <Link className={dynamicclassName} to={to} {...props} >
      {children}
    </Link>
  );
};

export default CustomLink;
