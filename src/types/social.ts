export type SocialPlatform = "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE" | "LINKEDIN";

export interface Social {
  id: string;
  url: string;
  platform: SocialPlatform;
}
