import { Link, Outlet } from "react-router-dom";
import CustomLink from "../components/basic-components/CustomLink";

const ContactClients = () => {
  return (
    <div className="flex flex-col p-8">
      {/* <div className="flex space-x-4 ml-12"> */}
      {/* <h1 className="px-3 py-2 rounded-sm text-sm font-medium hover:bg-gray-500 hover:text-white">Send Message</h1> */}
      {/* <CustomLink to="course" exact={true} isSubLink={true}> */}
      {/* Send Course */}
      {/* </CustomLink> */}
      {/* <CustomLink to="creds" exact={true} isSubLink={true}>
          Send Credentials
        </CustomLink> */}
      {/* <h1 className="px-3 py-2 rounded-sm text-sm font-medium hover:bg-gray-500 hover:text-white">Send Passwords</h1> */}
      {/* </div> */}
      {/* <div className="p-4 w-3/4 mx-auto rounded-md ring-1 mt-4 shadow-lg shadow-gray-300"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
};

export default ContactClients;
