import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/event";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {


  const dispatch = useDispatch();
  //TODO: read from redux store, not hardcoded all events
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const {uid} = useSelector((state) => state.auth);


  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    
    dispatch(eventStartLoading())
    
  }, [dispatch]);
  

  

  const onDoubleClick = (e) => {
    //console.log("abrir modal");
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    //console.log("onSelectSlot");
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
   

   
    const style = {
      backgroundColor:(uid === event.user._id) ? "#367CF7" :"#463660" ,
      borderRadius: "1px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
