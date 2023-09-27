import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get<any[]>(`${this.baseUrl}/videos`);
  }

  // Get video details by videoId
  getVideoDetails(videoId: string): Observable<any> {
    const url = `${this.baseUrl}/videos/${videoId}`;
    return this.http.get(url);
  }

  // Get reactions for a video by videoId
  getReactions(videoId: string): Observable<any[]> {
    const url = `${this.baseUrl}/videos/${videoId}/reactions`;
    return this.http.get<any[]>(url);
  }

// Update video title by videoId
updateVideoTitle(videoId: string, title: string): Observable<any> {
  const url = `${this.baseUrl}/videos/${videoId}`;
  const body = { title: title };
  return this.http.patch(url, body);
}

// Add a new reaction to a video by videoId
addReaction(videoId: string, reaction: any): Observable<any> {
  const url = `${this.baseUrl}/videos/${videoId}/reactions`;
  return this.http.post(url, reaction);
}
}
