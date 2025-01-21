import type { Request, Response } from "express";
import Event from "../models/Event";
import type { RequestWithUser } from "../middlewares/jwt-validator";
import mongoose from "mongoose";
import User from "../models/User";

export const getEvents = async (req: RequestWithUser, res: Response) => {
  const user = await User.findById(req.auth?.uid);
  const events = await Event.find({ user }).populate("user", "name");

  res.status(200).json({
    ok: true,
    events,
  });
};

export const createEvent = async (req: RequestWithUser, res: Response) => {
  const event = new Event(req.body);

  try {
    event.user = new mongoose.Types.ObjectId(req.auth?.uid);

    const eventSave = await event.save();

    res.json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const updateEvent = async (req: RequestWithUser, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event?.user.toString() !== req.auth?.uid) {
      res.status(401).json({
        ok: false,
        msg: "You do not have the privilege to edit this event",
      });
      return;
    }

    const newEvent = {
      ...req.body,
      user: req.auth?.uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }

  res.status(200).json({
    ok: true,
    msg: "updateEvent",
  });
};

export const deleteEvent = async (req: RequestWithUser, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    if (event?.user.toString() !== req.auth?.uid) {
      res.status(401).json({
        ok: false,
        msg: "You do not have the privilege to delete this event",
      });
      return;
    }

    const eventDeleted = await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      eventDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }

  res.status(200).json({
    ok: true,
    msg: "deleteEvent",
  });
};
