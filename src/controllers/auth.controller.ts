import { Request, Response } from 'express';
import { signup, signin, googleAuthHandler } from '../services/auth.service';
import { Profile } from 'passport-google-oauth20';

export const signupController = async (req: Request, res: Response) => {
  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const signinController = async (req: Request, res: Response) => {
  try {
    const { token, user } = await signin(req.body.email, req.body.password);
    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const googleCallbackController = async (req: Request, res: Response) => {
    try {
      const profile = req.user as Profile;
      const { token, user } = await googleAuthHandler(profile);
      res.status(200).json({ token, user });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      res.status(500).json({ message });
    }
  };