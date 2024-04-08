export class Post {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdBy = post.createdBy;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}
