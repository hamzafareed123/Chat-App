import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtect = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit reached. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied",
        });
      } else {
        return res.status(403).json({
          message: "Access denied by security policies",
        });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious bot activity detected",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet protection error:", error);
    return res.status(500).json({
      message: "Security check failed",
    });
  }
};
