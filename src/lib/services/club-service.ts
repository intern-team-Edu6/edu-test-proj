import { Club } from "../models/Club";
import connectDB from "../mongodb";
import { NewClubType } from "../utils/types";

export const createNewClub = async (newClubData: NewClubType) => {
  await connectDB();
  const newClub = new Club({ ...newClubData });
  await newClub.save();
  return newClub;
};
