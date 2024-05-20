import ShowTime from "@/modules/device/show-time";
import CreateUser from "@/modules/user/create-user";
import ListUsers from "@/modules/user/list-users";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <section className="flex flex-col items-start justify-start gap-6 py-6">
      <CreateUser />
      <ShowTime />
      <ListUsers />
      <ToastContainer />
    </section>
  );
}
