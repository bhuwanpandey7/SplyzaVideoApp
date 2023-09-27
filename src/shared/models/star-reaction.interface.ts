import { VideoReactionType } from '../enums/video-reactionType.enum';

export interface StarVideoReaction {
  videoId: string;
  timeframe: number;
  type: VideoReactionType;
}
