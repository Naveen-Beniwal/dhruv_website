import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://charmed-yak-16386.upstash.io",
  token: "AUACAAIjcDFjZTM1ODg4NmRmODU0NmZjOTQ3ZDhiNWE1NDM2M2QzYXAxMA",
});

// create a ratelimiter that allows 100 requests per minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;