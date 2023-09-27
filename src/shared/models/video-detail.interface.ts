export interface VideoDetail {
  id: string;
  title: string;
  description: string;
  createdDate: string; // iso date string
  author: User;
  url: string;
  previewUrl: string;
}

export interface User {
  id: String;
  name: String;
  pictureUrl: String;
}
