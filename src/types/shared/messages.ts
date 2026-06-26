export interface MessageAttachment {
  id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: string;
}

export interface Message {
  id: string;
  content: string | null;
  created_at: string;
  edited_at: string | null;
  sender_id: string;
  sender_name: string;
  sender_avatar: string | null;
  is_mine: boolean;
  seen_by_all: boolean;
  attachments: MessageAttachment[];
}

export interface CourseInfo {
  course_id: string;
  course_code: string;
  course_name: string;
  faculty_name?: string;
  faculty_avatar?: string | null;
  member_count: number;
}

export interface CourseMessagesData {
  course: CourseInfo;
  messages: Message[];
}

export interface LastMessage {
  content: string;
  created_at: string;
  sender_name: string;
}

export interface CourseThread {
  course_id: string;
  course_code: string;
  course_name: string;
  unread_count: number;
  last_message: LastMessage | null;
}

export interface SendMessagePayload {
  course_id: string;
  sender_id: string;
  content?: string | null;
}

export interface MessageReadStatus {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  read_at: string | null;
  seen: boolean;
}