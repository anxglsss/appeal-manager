import { Request, Response } from 'express';
import * as AppealService from '../services/appealsService';

export const create = async (req: Request, res: Response) => {
  const { subject, message } = req.body;
  try {
    const appeal = await AppealService.createAppeal(subject, message);
    res.status(201).json(appeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const takeInProgress = async (req: Request, res: Response) => {
  try {
    const appeal = await AppealService.takeAppealInProgress(req.params.id);
    res.json(appeal);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const complete = async (req: Request, res: Response) => {
  const { resolutionText } = req.body;
  try {
    const appeal = await AppealService.completeAppeal(req.params.id, resolutionText);
    res.json(appeal);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const cancel = async (req: Request, res: Response) => {
  const { reason } = req.body;
  try {
    const appeal = await AppealService.cancelAppeal(req.params.id, reason);
    res.json(appeal);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const list = async (req: Request, res: Response) => {
  const from = req.query.from ? new Date(String(req.query.from)) : undefined;
  const to = req.query.to ? new Date(String(req.query.to)) : undefined;
  try {
    const appeals = await AppealService.listAppeals(from, to);
    res.json(appeals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelAllInProgress = async (_: Request, res: Response) => {
  try {
    const appeals = await AppealService.cancelAllInProgress();
    res.json(appeals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};