import { Link } from "react-router-dom";
import { Button, Heading } from "../components";

function UpcommingAppointments() {}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Heading className="mt-3">Welcome to Appointment App!</Heading>
      <Link to="/create">
        <Button transparent>Create an Appointment</Button>
      </Link>
    </div>
  );
}
