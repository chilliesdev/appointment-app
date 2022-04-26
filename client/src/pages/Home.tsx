import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import { Link } from "react-router-dom";
import { Button, Heading } from "../components";
import { useGetAppointment } from "../hooks";
import { useQuery } from "react-query";
import { useRef } from "react";

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function UpcommingAppointments() {
  const ref = useRef(null);
  const getAppointment = useGetAppointment();

  const { data, isLoading } = useQuery(
    "all-appointments",
    async () => {
      const appointments = await getAppointment;

      const formatedAppointements = appointments.map(
        ({ start, end, title, id, allDay }) => {
          // const formatDate = (date: string) =>
          //   new Date(date).toISOString().replace(/T.*$/, "") +
          //   new Date(date).toLocaleTimeString();

          const formatDate = (date: string) => new Date(date);

          return {
            id: id?.toString(),
            start: formatDate(start),
            end: formatDate(end),
            title,
            // display: "background",
            // backgroungColor: "green",
            // allDay,
          };
        }
      );
      return formatedAppointements;
    },
    {
      refetchInterval: 1000 * 60 * 10,
    }
  );

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    if (selectInfo.view.type === "timeGridDay") {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: `${Math.floor(Math.random() * 500)}`,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    } else {
      const current = ref.current as unknown as FullCalendar;

      current.getApi().changeView("timeGridDay", selectInfo.start);
    }
  }

  return (
    <>
      {data && (
        <FullCalendar
          ref={ref}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interationPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          // initialView="dayGridMonth"
          initialView="listWeek"
          editable
          selectable
          dayMaxEvents
          // selectMirror
          initialEvents={data}
          eventColor="green"
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Heading className="mt-3">Welcome to Appointment App!</Heading>
      <Link to="/create">
        <Button transparent>Create an Appointment</Button>
      </Link>

      <UpcommingAppointments />
    </div>
  );
}
