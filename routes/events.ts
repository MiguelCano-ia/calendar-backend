/*
  Event Routes
  /api/events
*/

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/events";
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fields-validator";
import { Router } from "express";
import validJWT from "../middlewares/jwt-validator";
import isDate from "../helpers/isDate";

const router = Router();

// All routes musth pass through the validation
router.use(validJWT);

// All events must pass through the authentication middleware

// Get events
router.get("", getEvents);

// router.use(validJWT); All expect getEvents pass through the middleware

// Create event
router.post(
  "",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

export default router;
