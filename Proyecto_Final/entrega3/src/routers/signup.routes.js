import express from 'express';
import passport from "passport";
import { renderSignUp, renderFailSignUp } from '../controllers/session.controller.js';
import { savePicturesLocal } from '../controllers/session.controller.js';

const SIGNUP_ROUTER = express.Router();

SIGNUP_ROUTER
    .get("/", renderSignUp)
    .post("/", savePicturesLocal, passport.authenticate('signup', { failureRedirect: "/signup/error", successRedirect: "/" }))
    .get("/error", renderFailSignUp);

export { SIGNUP_ROUTER }