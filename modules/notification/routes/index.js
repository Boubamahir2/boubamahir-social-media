import { Router } from "express";
import authMiddleware from "../../../middleware/authentication.js";
import notificationController from "../controllers/index.js";

const notificationRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

notificationRouter
  .route("/get-notifications")
  .get(isAuthenticatedUser, notificationController.getNotifications);

notificationRouter
  .route("/mark-read-notification")
  .get(isAuthenticatedUser, notificationController.markReadNotification);

notificationRouter
  .route("/delete-notification")
  .get(isAuthenticatedUser, notificationController.deleteNotification);

export default notificationRouter;
