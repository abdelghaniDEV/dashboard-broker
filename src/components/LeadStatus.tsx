import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { getCookie } from "./ListLeads";

const statusColors: Record<string, string> = {
  new: "bg-[#F7E5CC] text-[#F2800D] border-[#F2800D]",
  interested: "bg-[#E6EAFB] text-[#204FC9] border-[#204FC9]",
  shipped: "bg-[#F0FBFE] text-[#13BBE1] border-[#13BBE1]",
  fullInformation: "bg-[#F0FBF4] text-[#13B458] border-[#13B458]",
  noInformation: "bg-[#FCF0EF] text-[#EA6B6D] border-[#EA6B6D]",
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const LeadStatus = ({
  status,
  leadID,
  setRefresh,
}: {
  status: string;
  leadID: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const statusOptions = ["new", "interested", "fullInformation", "noInformation"];

  const handelChangeStatus = async (statusTarget: string) => {
    try {
      const token = getCookie("token-001")
      const response = await axios.put(
        `${apiUrl}/leads/${leadID}/status`,
        { status: statusTarget }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("change status success", response);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("change status error", err);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full outline-none">
          <div
            className={`flex capitalize items-center justify-center gap-1 border-[1px] ${statusColors[status]} w-[100px] h-8 rounded-[6px]`}
          >
            <span className=" text-[13px] font-[600]">{status}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((status) => {
            return (
              <DropdownMenuItem
                key={status}
                onClick={() => handelChangeStatus(status)}
              >
                <div
                  className={`flex cursor-pointer capitalize w-full items-center justify-center gap-1 border-[1px] ${statusColors[status]}  py-[6px] px-[2px] rounded-[6px]`}
                >
                  <span className=" text-[13px] font-[600]">{status}</span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
