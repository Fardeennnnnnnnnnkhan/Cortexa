import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getUserGlobalTag() {
    return getGlobalTag("users")
}
export function getUserIdTag(id: string) {
    return getIdTag("users", id)
}
export function revalidateUserCache(id: string) {
    //yt->
    // revalidateTag(getUserGlobalTag())
    // revalidateTag(getUserIdTag(id)) 
    // my fix ->
    revalidateTag(getUserGlobalTag(), "default");
    revalidateTag(getUserIdTag(id), "default");
}