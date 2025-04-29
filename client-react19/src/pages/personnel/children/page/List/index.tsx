import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "./components/ui/bread-crumb";
import Work from "./components/Work";

const triggers = [
  {
    label: "Hoạt động",
    value: "work",
  },
  
];
const ListPersonnel = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const onClear = () => {
    Object.values(params.keys()).forEach((key) => params.delete(key));
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <div>
      <BreadCrumb />
      <h3 className="my-4 text-lg font-semibold">Nhân sự</h3>
      <Tabs defaultValue={triggers[0].value} className="w-full bg-none">
        <TabsList classDefault={false} className="flex gap-8">
          {triggers.map((item, index) => (
            <TabsTrigger
              onClick={onClear}
              key={index}
              classDefault={false}
              className={cn(
                "relative cursor-pointer font-semibold transition",
                "data-[state=active]:cursor-default",
                "data-[state=active]:text-[#53B69A]",
                "data-[state=active]:after:content-['']",
                "data-[state=active]:after:absolute data-[state=active]:after:left-1/2",
                "data-[state=active]:after:top-full data-[state=active]:after:-translate-x-1/2",
                "data-[state=active]:after:mt-1 data-[state=active]:after:h-1 data-[state=active]:after:w-16",
                "data-[state=active]:after:bg-[#53B69A]"
              )}
              value={item.value}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="work">
          <Work/>
        </TabsContent>
       
      </Tabs>
    </div>
  );
};

export default ListPersonnel;
