import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/react";
import { CreateInputForm, SetFormProps } from "./types";
import { useRef } from "react";
import Button from "./Button";

interface CalendarFormProps {
  setCreateInfo: React.Dispatch<
    React.SetStateAction<CreateInputForm | undefined>
  >;
  setForm: React.Dispatch<React.SetStateAction<SetFormProps["T"]>>;
  createInfo: CreateInputForm | undefined;
}

export default function CalendarForm({
  setCreateInfo,
  createInfo,
  setForm,
}: CalendarFormProps) {
  const ref = useRef(null);

  function handleDateSelect(selectInfo: DateSelectArg) {
    if (selectInfo.view.type === "timeGridDay") {
      const newAppointmentInfo = {
        // id: createEventId(),
        // title: selectInfo.
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      setCreateInfo({
        ...createInfo,
        ...newAppointmentInfo,
      });

      setForm("complete");

      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection
      calendarApi.addEvent(newAppointmentInfo);
    } else {
      const current = ref.current as unknown as FullCalendar;

      current.getApi().changeView("timeGridDay", selectInfo.start);
    }
  }

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events: EventApi[]) {
    // this.setState({
    //   currentEvents: events,
    // });

    console.log(events);
  }

  return (
    <div className="flex flex-col items-center">
      <Button transparent onClick={() => setForm("basicDetails")}>
        Go Back
      </Button>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, timeGridPlugin, interationPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable
        selectable
        // selectMirror
        dayMaxEvents
        // weekends={false}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
      />
    </div>
  );
}

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

function createEventId() {
  return String(eventGuid++);
}
