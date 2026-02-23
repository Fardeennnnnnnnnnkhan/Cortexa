import { getGlobalTag, getIdTag, getJobInfoTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";
import { getJobInfoIdTag } from "../jobinfos/dbCache";

export function getInterviewGlobalTag() {
  return getGlobalTag("interviews");
}

export function getInterviewJobInfo(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId);
}

export function getInterviewIdTag(id: string) {
  return getIdTag("interviews", id);
}

export function revalidateInterviewCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getInterviewGlobalTag(), "default");
  revalidateTag(getInterviewJobInfo(jobInfoId), "default");
  revalidateTag(getInterviewIdTag(id), "default");
}
