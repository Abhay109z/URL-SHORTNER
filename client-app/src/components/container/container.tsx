import * as React from "react";
import type { UrlData } from "../../interface/UrlData";
import axios from "axios";
import FormContainer from "../FormContainer.tsx/FormContainer";

interface IContainerProps {
  children?: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = ({ children }) => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const fetchTableData =async () => {
    const response = await axios.get(`${SERVER_URL}/shorturl`);
    console.log("The response from server is:",response);
    setData(response.data);
    console.log("data:",data);
  };
  React.useEffect(() => {
    fetchTableData();
  }, []);
  return (
  <div className="container p-2 mx-auto">{children}</div>;
  );

};

export default Container;