import Item from "./item";
import { ILog } from "@/api/interfaces/ILog";

type Props = {
  logs : ILog[];
}
const Section = ({logs}:Props) => {
    
    return  <div className="space-y-6 h-[360px] overflow-auto">
    {logs.map((log, index) => (
      <Item log={log} key={index}/>
    ))}
  </div>
}

export default Section;