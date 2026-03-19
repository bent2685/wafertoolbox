export interface Project {
  id: string;
  name: string;
  path: string;
  lastActive: string; // ISO 8601 date string
  sessionCount: number;
}

export interface ProjectListOptions {
  sortBy?: "name" | "lastActive" | "sessionCount";
  sortOrder?: "asc" | "desc";
  limit?: number;
  search?: string;
}

export interface Session {
  id: string;
  title: string;
  filePath: string;
  lastActive: string; // ISO 8601 date string
  messageCount: number;
}
