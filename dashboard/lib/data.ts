import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type Lead = {
  leadName: string | null;
  phone: string | null;
  email: string | null;
  dateCaptured: string | null;
  utmCampaign: string | null;
  utmSource: string | null;
  utmContent: string | null;
  utmMedium: string | null;
  leadScore: number | null;
  leadGrade: string | null;
  age: number | null;
  dayToDay: string | null;
  profession: string | null;
  monthlyIncome: string | null;
  spentOnCourses: string | null;
  moneyOnlineStatus: string | null;
  wantsMost: string | null;
  frustration: string | null;
  followingLength: string | null;
  triedBefore: string | null;
  whatWouldMakeItWorth: string | null;
  oneOnOneQuestion: string | null;
  capitalAvailable: string | null;
  inCRM: string | null;
  leadStatus: string | null;
  opportunityStage: string | null;
  pipeline: string | null;
  bookedCall: string | null;
  closed: string | null;
  cashCollected: number | null;
  paymentType: string | null;
  programType: string | null;
  closeDateCreated: string | null;
  preWebinarLead: string | null;
};

export const getLeads = cache((): Lead[] => {
  const file = path.join(process.cwd(), "data", "leads.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as Lead[];
});
