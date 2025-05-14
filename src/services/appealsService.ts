import { AppDataSource } from '../db/dataSource';
import { Appeal } from '../models/Appeal';
import { AppealStatus } from '../utils/statuses';
import { Between } from 'typeorm';

const appealRepo = AppDataSource.getRepository(Appeal);

export const createAppeal = async (subject: string, message: string) => {
  const appeal = appealRepo.create({ subject, message });
  return await appealRepo.save(appeal);
};

export const takeAppealInProgress = async (id: string) => {
  const appeal = await appealRepo.findOneBy({ id });
  if (!appeal) throw new Error('Appeal not found');
  appeal.status = AppealStatus.IN_PROGRESS;
  return await appealRepo.save(appeal);
};

export const completeAppeal = async (id: string, resolutionText: string) => {
  const appeal = await appealRepo.findOneBy({ id });
  if (!appeal) throw new Error('Appeal not found');
  appeal.status = AppealStatus.COMPLETED;
  appeal.resolutionText = resolutionText;
  return await appealRepo.save(appeal);
};

export const cancelAppeal = async (id: string, reason: string) => {
  const appeal = await appealRepo.findOneBy({ id });
  if (!appeal) throw new Error('Appeal not found');
  appeal.status = AppealStatus.CANCELED;
  appeal.cancelReason = reason;
  return await appealRepo.save(appeal);
};

export const listAppeals = async (from?: Date, to?: Date) => {
  if (from && to) {
    return await appealRepo.find({
      where: {
        createdAt: Between(from, to),
      },
    });
  }
  return await appealRepo.find();
};

export const cancelAllInProgress = async () => {
  const appeals = await appealRepo.findBy({ status: AppealStatus.IN_PROGRESS });
  for (const appeal of appeals) {
    appeal.status = AppealStatus.CANCELED;
    appeal.cancelReason = 'Bulk cancel by admin';
  }
  return await appealRepo.save(appeals);
};