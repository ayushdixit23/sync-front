import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Tabbar from "../Components/Tabbar";

export default function SideLayout({ children }) {
  return (
    <div className="flex sm:flex-row flex-col h-screen w-screen bg-green-300">
      <div className="h-screen pn:max-md:hidden ">
        <Sidebar />
      </div>
      <div className="bg-white w-full sm:hidden h-[10%]">
        <Header />
      </div>
      <div className="h-screen pn:max-md:w-full bg-bgg bg-[#e6e6e6] w-full  sm:p-1">
        <div className=" h-full w-full">{children}</div>
      </div>
      <div className="fixed bottom-0 bg-white w-full sm:hidden">
        <Tabbar />
      </div>
    </div>
  );
}
