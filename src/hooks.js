import { db } from "$lib/database";

export function handle({ request, resolve }) {
  request.locals.aaa = db;
  return resolve(request);
}
